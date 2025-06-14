import { ObsidianTool } from "../obsidian-tools";
import { ToolExecutionContext } from 'src/types/tool-execution-context';
import { t } from 'src/i18n';
import { updateNote, readNote } from 'src/utils/tools/note-utils';
import { getDailyNotePath } from "../utils/daily-notes/get-daily-note-path";
import { getCurrentTime } from "../utils/time/get-current-time";
import { appendComment, Task, cleanTodoText } from 'src/utils/tasks/task-utils';
import { ToolExecutionError } from 'src/types/tool-execution-error';
import { validateTasks } from 'src/utils/tasks/task-validation';
import { moveTaskToPosition } from 'src/utils/tasks/move-task-to-position';
import { createNavigationTargetsForTasks } from 'src/utils/tools/line-number-utils';
import { findTaskByDescription } from "src/utils/tools/note-utils";
import { extractFilenameWithoutExtension } from "src/utils/text/string-sanitizer";

const schema = {
  name: "task_abandon",
  description: "Marks one or more to-do items as abandoned / skipped in a specified document or today's daily note",
  input_schema: {
    type: "object",
    properties: {
      todos: {
        type: "array",
        description: "Array of to-do items to abandon",
        items: {
          type: "object",
          properties: {
            todo_text: {
              type: "string",
              description: "The complete text of the to-do item to abandon, without the task marker (e.g. '- [ ]'). This should include all formatting, emojis, time markers, and any other specific formatting.",
            },
            comment: {
              type: "string",
              description: "The comment explaining why the task is being abandoned, will be added below the task",
            },
          },
          required: ["todo_text"]
        }
      },
      time: {
        type: "string",
        description: "Time when the tasks were abandoned in HH:MM format. If not provided, current time will be used. This time is applied to all tasks in the batch.",
      },
      file_path: {
        type: "string",
        description: "The path of the document containing the to-dos (including .md extension). If not provided, searches only in today's daily note.",
      }
    },
    required: ["todos"]
  }
};

type TaskItem = {
  todo_text: string,
  comment?: string
}

type TaskAbandonToolInput = {
  todos: TaskItem[],
  time?: string,
  file_path?: string
}

export const taskAbandonTool: ObsidianTool<TaskAbandonToolInput> = {
  specification: schema,
  icon: "x-square",
  sideEffects: true, // Modifies files by abandoning tasks
  get initialLabel() {
    return t('tools.abandon.labels.initial');
  },
  execute: async (context: ToolExecutionContext<TaskAbandonToolInput>): Promise<void> => {
    const { plugin, params } = context;
    const { todos, time } = params;
    
    if (!todos || !Array.isArray(todos) || todos.length === 0) {
      const filePath = params.file_path ? params.file_path : await getDailyNotePath(plugin.app);
      context.setLabel(t('tools.abandon.labels.failed', { 
        task: '',
        name: extractFilenameWithoutExtension(filePath)
      }));
      throw new ToolExecutionError("No to-do items provided");
    }
    
    const count = todos.length;
    const todoText = count === 1 ? todos[0].todo_text : `${count} todos`;
    const filePath = params.file_path ? params.file_path : await getDailyNotePath(plugin.app);
    
    context.setLabel(t('tools.abandon.labels.inProgress', { task: todoText }));
    
    // Format the current time if provided (common for all tasks)
    const currentTime = getCurrentTime(time);
    
    try {
      const note = await readNote({plugin, filePath});
      
      // Validate all tasks upfront - will throw if any validation fails
      validateTasks(
        note,
        todos.map(todo => ({
          todoText: todo.todo_text,
          taskPredicate: (task) => task.status !== 'abandoned'
        }))
      );
      
      // Track tasks that will be abandoned
      const abandonedTasks: string[] = [];
      const movedTasks: Task[] = []; // Store references to the moved tasks
      
      // If we get here, all tasks were validated successfully
      let updatedNote = JSON.parse(JSON.stringify(note));
      
      // Process each to-do item
      for (const todo of todos) {
        const todo_text = cleanTodoText(todo.todo_text);
        const comment = todo.comment;
        
        // Find the task to abandon
        const task = findTaskByDescription(updatedNote, todo_text, (task) => task.status === 'pending');
        
        // Update status
        task.status = 'abandoned';
        
        // Add abandonment time to the todo text if provided
        if (currentTime) {
          task.todoText = `${task.todoText}${t('tasks.format.abandonedAt', { time: currentTime })}`;
        }
        
        // Add comment if provided
        if (comment) {
          appendComment(task, comment);
        }
        
        // Move the abandoned task to the current position (unified logic with check-todo and move-todo)
        updatedNote = moveTaskToPosition(updatedNote, task);
        
        // Store the task reference for finding its new position later
        movedTasks.push(task);
        abandonedTasks.push(todo_text);
      }
      
      // Update the note with all abandoned tasks
      await updateNote({plugin, filePath, updatedNote});
      
      // Create navigation targets for the moved tasks
      const navigationTargets = createNavigationTargetsForTasks(
        updatedNote,
        movedTasks,
        filePath
      );
      
      // Add navigation targets
      navigationTargets.forEach(target => context.addNavigationTarget(target));
      
      // Prepare success message
      const tasksDescription = abandonedTasks.length === 1 
        ? `"${abandonedTasks[0]}"`
        : `${abandonedTasks.length} ${t('tools.tasks.plural')}`;
      
      context.setLabel(t('tools.abandon.labels.success', { 
        task: todoText,
        name: extractFilenameWithoutExtension(filePath)
      }));
      context.progress(t('tools.abandon.progress.success', {
        task: tasksDescription,
        filePath
      }));
    } catch (error) {
      context.setLabel(t('tools.abandon.labels.failed', { 
        task: todoText,
        name: extractFilenameWithoutExtension(filePath)
      }));
      throw error;
    }
  }
};
