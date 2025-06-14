import { createFile } from "../utils/fs/create-file";
import { fileExists } from "../utils/fs/file-exists";
import { ToolExecutionError } from 'src/types/tool-execution-error';
import { ObsidianTool } from 'src/obsidian-tools';
import { ToolExecutionContext } from 'src/types/tool-execution-context';
import { readNote, updateNote, determineInsertionPosition } from 'src/utils/tools/note-utils';
import { insertTaskAtPosition, Task, removeTaskFromDocument } from 'src/utils/tasks/task-utils';
import { validateTasks } from 'src/utils/tasks/task-validation';
import { createNavigationTargetsForTasks, createNavigationTarget, findTaskLineNumbers } from 'src/utils/tools/line-number-utils';
import { t } from 'src/i18n';
import { findTaskByDescription } from "src/utils/tools/note-utils";
import { extractFilenameWithoutExtension } from "src/utils/text/string-sanitizer";
import { isDailyNote } from "../utils/daily-notes/is-daily-note";

const schema = {
  name: "task_move",
  description: "Moves one or more to-do items within the same document or from one document to another",
  input_schema: {
    type: "object",
    properties: {
      todos: {
        type: "array",
        description: "Array of to-do items to move",
        items: {
          type: "object",
          properties: {
            todo_text: {
              type: "string",
              description: "The complete text of the to-do item to move. This should include all formatting, emojis, time markers, and any other specific formatting.",
            }
          },
          required: ["todo_text"]
        }
      },
      source_path: {
        type: "string",
        description: "The path of the source document containing the to-dos (including .md extension).",
      },
      target_path: {
				type: "string",
				description:
					"The path of the document to move the to-do items to (including .md extension). Can be the same as source_path to move within a document.",
			},
			position: {
				type: "string",
				description:
					"Where to place the moved to-do items: 'beginning' (at the start of the document, after all done items), 'end' (at the end of the document), 'before' (before a specific to-do), or 'after' (after a specific to-do)",
				enum: ["beginning", "end", "before", "after"],
			},
			reference_todo_text: {
				type: "string",
				description:
					"When position is 'before' or 'after', this is the complete text of the reference to-do item for positioning.",
			},
    },
    required: ["todos", "source_path", "target_path", "position"]
  }
};

type TodoItem = {
  todo_text: string
}

type TaskMoveToolInput = {
  todos: TodoItem[],
  source_path: string,
  target_path: string,
  position: "beginning" | "end" | "before" | "after",
  reference_todo_text?: string
}

export const taskMoveTool: ObsidianTool<TaskMoveToolInput> = {
  specification: schema,
  icon: "move",
  sideEffects: true, // Modifies files by moving tasks
  get initialLabel() {
    return t('tools.move.labels.initial');
  },
  execute: async (context: ToolExecutionContext<TaskMoveToolInput>): Promise<void> => {
    const { plugin, params } = context;
    const { todos, position, reference_todo_text } = params;
    
    if (!todos || !Array.isArray(todos) || todos.length === 0) {
      context.setLabel(t('tools.move.labels.failed', { task: '' }));
      throw new ToolExecutionError("No to-do items provided");
    }

    const count = todos.length;
    const todoText = count === 1 ? todos[0].todo_text : `${count} todos`;
    
    context.setLabel(t('tools.move.labels.inProgress', { task: todoText }));

    const filePath = params.source_path;
    const targetFilePath = params.target_path;
    
    try {
      const note = await readNote({plugin, filePath});
      
      // Validate all tasks upfront - will throw if any validation fails
      validateTasks(
        note,
        todos.map(todo => ({ todoText: todo.todo_text }))
      );
      
      // Track tasks that will be moved and their original versions
      const originalTasks: Task[] = [];
      const newTasks: Task[] = [];
      const targetFileName = extractFilenameWithoutExtension(targetFilePath);
      const sourceFileName = extractFilenameWithoutExtension(filePath);
      
      // Check if source and target are daily notes
      const isSourceDailyNote = await isDailyNote(plugin.app, filePath);
      const isTargetDailyNote = await isDailyNote(plugin.app, targetFilePath);
      
      // If we get here, all tasks were validated successfully
      let updatedNote = JSON.parse(JSON.stringify(note));
      
      // Find all the tasks to move and process them based on daily note status
      for (const todo of todos) {
        const originalTask = findTaskByDescription(updatedNote, todo.todo_text, (task) => true);
        
        if (isSourceDailyNote) {
          // Source is a daily note - mark as moved with tracking
          const sourceTrackingInfo = ` (${t('tools.move.tracking.movedTo')} [[${targetFileName}]])`;
          
          originalTask.status = 'moved';
          
          // Check if task already has move tracking - if so, accumulate
          if (originalTask.todoText.includes(`(${t('tools.move.tracking.movedTo')}`)) {
            // Task has been moved before, append new tracking
            originalTask.todoText = `${originalTask.todoText}${sourceTrackingInfo}`;
          } else {
            // First time being moved
            originalTask.todoText = `${originalTask.todoText}${sourceTrackingInfo}`;
          }
        } else {
          // Source is not a daily note - remove task completely
          updatedNote = removeTaskFromDocument(updatedNote, originalTask);
        }
        
        // Create new task for destination
        let newTaskTodoText = todo.todo_text;
        
        if (isTargetDailyNote) {
          // Target is a daily note - add source tracking
          const destinationTrackingInfo = ` (${t('tools.move.tracking.from')} [[${sourceFileName}]])`;
          newTaskTodoText = `${todo.todo_text}${destinationTrackingInfo}`;
        }
        // If target is not a daily note, just use original text without tracking
        
        const newTask: Task = {
          type: 'task',
          status: 'pending', // Always pending in destination
          todoText: newTaskTodoText,
          comment: originalTask.comment,
          lineIndex: -1 // Will be set when inserted
        };
        
        // Only track original task if it wasn't removed
        if (isSourceDailyNote) {
          originalTasks.push(originalTask);
        }
        newTasks.push(newTask);
      }
      
      // If moving to different file, load target note
      let targetNote = updatedNote;
      if (targetFilePath !== filePath) {
        // Check if target file exists, create if it doesn't
        const targetExists = await fileExists(targetFilePath, plugin.app);
        if (!targetExists) {
          await createFile(targetFilePath, "", plugin.app);
        }
        targetNote = await readNote({plugin, filePath: targetFilePath});
      }
      
      // Determine insertion position in target note
      const insertionIndex = determineInsertionPosition(
        targetNote,
        position,
        reference_todo_text,
      );
      
      // Insert all new tasks at the target position
      for (let i = 0; i < newTasks.length; i++) {
        const task = newTasks[i];
        
        // Insert at the calculated position + i to maintain order
        targetNote = insertTaskAtPosition(
          targetNote,
          task,
          insertionIndex + i,
        );
      }
      
      // Update both notes if they're different
      if (targetFilePath !== filePath) {
        await updateNote({plugin, filePath, updatedNote});
        await updateNote({plugin, filePath: targetFilePath, updatedNote: targetNote});
      } else {
        await updateNote({plugin, filePath, updatedNote: targetNote});
      }
      
      // Create navigation targets for destination tasks (always available)
      const destinationNavigationTargets = createNavigationTargetsForTasks(
        targetNote,
        newTasks,
        targetFilePath
      );
      
      // Create navigation targets for source tasks only if they exist (daily notes only)
      const sourceNavigationTargets = originalTasks.length > 0 
        ? createNavigationTargetsForTasks(updatedNote, originalTasks, filePath)
        : [];
      
      // Add all navigation targets
      [...destinationNavigationTargets, ...sourceNavigationTargets].forEach(target => 
        context.addNavigationTarget(target)
      );
      
      // Prepare success message
      const task = todos.length === 1 
        ? `"${todos[0].todo_text}"` 
        : `${todos.length} ${t('tools.tasks.plural')}`;
        
      context.setLabel(t('tools.move.labels.success', { task: todoText, destination: extractFilenameWithoutExtension(targetFilePath) }));
      context.progress(t('tools.move.progress.success', {
        task: task,
        source: extractFilenameWithoutExtension(filePath),
        target: extractFilenameWithoutExtension(targetFilePath),
        position
      }));
    } catch (error) {
      context.setLabel(t('tools.move.labels.failed', { task: todoText }));
      throw error;
    }
  }
};
