import { TFile, normalizePath } from "obsidian";
import { fileExists } from "../utils/fs/file-exists";
import { getFile } from "../utils/fs/get-file";
import { ensureDirectoryExists } from "../utils/fs/ensure-directory-exists";
import { ToolExecutionError } from 'src/types/tool-execution-error';
import { ObsidianTool } from "../obsidian-tools";
import { ToolExecutionContext } from 'src/types/tool-execution-context';
import { t } from 'src/i18n';
import { extractFilenameWithoutExtension } from "src/utils/text/string-sanitizer";

const schema = {
  name: "file_move",
  description: "Moves a file from one location to another. Creates destination directories if they don't exist.",
  input_schema: {
    type: "object",
    properties: {
      source_path: {
        type: "string",
        description: "The current path of the file to move (including file extension)",
      },
      destination_path: {
        type: "string", 
        description: "The new path for the file (including file extension). Parent directories will be created if they don't exist.",
      },
      create_directories: {
        type: "boolean",
        description: "Whether to create parent directories if they don't exist (defaults to true)",
        default: true
      }
    },
    required: ["source_path", "destination_path"]
  }
};

type FileMoveToolInput = {
  source_path: string;
  destination_path: string;
  create_directories?: boolean;
}

export const fileMoveTool: ObsidianTool<FileMoveToolInput> = {
  specification: schema,
  icon: "move",
  sideEffects: true, // Modifies files by moving them
  get initialLabel() {
    return t('tools.fileMove.labels.initial');
  },
  execute: async (context: ToolExecutionContext<FileMoveToolInput>): Promise<void> => {
    const { plugin, params } = context;
    const { source_path, destination_path, create_directories = true } = params;
    
    context.setLabel(t('tools.fileMove.labels.inProgress', { source: extractFilenameWithoutExtension(source_path), destination: extractFilenameWithoutExtension(destination_path) }));

    try {
      // Normalize paths
      const normalizedSourcePath = normalizePath(source_path);
      const normalizedDestinationPath = normalizePath(destination_path);
      
      // Check if source file exists
      const sourceExists = await fileExists(normalizedSourcePath, plugin.app);
      if (!sourceExists) {
        context.setLabel(t('tools.fileMove.labels.failed', { source: source_path }));
        throw new ToolExecutionError(`Source file not found: ${source_path}`);
      }
      
      // Get the source file
      const sourceFile = getFile(normalizedSourcePath, plugin.app);
      if (!sourceFile) {
        context.setLabel(t('tools.fileMove.labels.failed', { source: source_path }));
        throw new ToolExecutionError(`Could not access source file: ${source_path}`);
      }
      
      // Check if destination already exists
      const destinationExists = await fileExists(normalizedDestinationPath, plugin.app);
      if (destinationExists) {
        context.setLabel(t('tools.fileMove.labels.failed', { source: source_path }));
        throw new ToolExecutionError(`Destination file already exists: ${destination_path}`);
      }
      
      // Create destination directory if needed
      if (create_directories) {
        const destinationDir = normalizedDestinationPath.substring(0, normalizedDestinationPath.lastIndexOf('/'));
        if (destinationDir) {
          context.progress(t('tools.fileMove.progress.creatingDirectories', { dir: destinationDir }));
          await ensureDirectoryExists(destinationDir, plugin.app);
        }
      }
      
      // Perform the move operation
      context.progress(t('tools.fileMove.progress.moving', { source: extractFilenameWithoutExtension(source_path), destination: extractFilenameWithoutExtension(destination_path) }));
      await plugin.app.vault.rename(sourceFile, normalizedDestinationPath);
      
      // Add navigation target to the moved file
      context.addNavigationTarget({
        filePath: normalizedDestinationPath
      });
      
      context.setLabel(t('tools.fileMove.labels.success', { source: extractFilenameWithoutExtension(source_path), destination: extractFilenameWithoutExtension(destination_path) }));
      context.progress(t('tools.fileMove.progress.completed', { 
        source: extractFilenameWithoutExtension(source_path), 
        destination: extractFilenameWithoutExtension(destination_path) 
      }));
      
    } catch (error) {
      context.setLabel(t('tools.fileMove.labels.failed', { source: source_path }));
      throw error;
    }
  }
}; 