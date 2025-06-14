import { createFile } from "../utils/fs/create-file";
import { fileExists } from "../utils/fs/file-exists";
import { ObsidianTool } from "../obsidian-tools";
import { ToolExecutionError } from 'src/types/tool-execution-error';
import { ToolExecutionContext } from 'src/types/tool-execution-context';
import { t } from 'src/i18n';
import { extractFilenameWithoutExtension } from "src/utils/text/string-sanitizer";

const schema = {
  name: "note_create",
  description: "Creates a new document in the vault at the specified path with the provided content. Will throw an error if a document already exists at the specified path unless auto_version is enabled.",
  input_schema: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "The path where the document should be created (including filename with .md extension)",
      },
      content: {
        type: "string",
        description: "The content to write to the new document",
      },
      auto_version: {
        type: "boolean",
        description: "If true, automatically create a versioned filename if the file already exists (e.g., 'note.md' becomes 'note 2.md')",
        default: false
      },
    },
    required: ["path", "content"]
  }
};

type NoteCreateToolInput = {
  path: string,
  content: string,
  auto_version?: boolean
}

async function getVersionedPath(basePath: string, app: any): Promise<string> {
  const pathParts = basePath.split('.');
  const extension = pathParts.pop() || '';
  const baseName = pathParts.join('.');
  
  let versionNumber = 2;
  let versionedPath = `${baseName} ${versionNumber}.${extension}`;
  
  while (await fileExists(versionedPath, app)) {
    versionNumber++;
    versionedPath = `${baseName} ${versionNumber}.${extension}`;
  }
  
  return versionedPath;
}

export const noteCreateTool: ObsidianTool<NoteCreateToolInput> = {
  specification: schema,
  icon: "file-plus",
  sideEffects: true, // Creates files, has side effects
	get initialLabel() {
    return t('tools.createDocument.labels.initial');
  },
  execute: async (context: ToolExecutionContext<NoteCreateToolInput>): Promise<void> => {
    const { plugin, params } = context;
    const { path, content, auto_version = false } = params;
    const documentContent = content || ''; // Default to empty string if content is undefined
    const filename = extractFilenameWithoutExtension(path);

    context.setLabel(t('tools.createDocument.labels.inProgress', { name: filename }));

    // Check if the file already exists
    const exists = await fileExists(path, plugin.app);

    let finalPath = path;
    
    if (exists) {
      if (auto_version) {
        // Generate a versioned path
        finalPath = await getVersionedPath(path, plugin.app);
        context.progress(t('tools.createDocument.progress.versionedPath', { originalName: extractFilenameWithoutExtension(path), versionedName: extractFilenameWithoutExtension(finalPath) }));
      } else {
        context.setLabel(t('tools.createDocument.labels.failed', { name: filename }));
        throw new ToolExecutionError(`File already exists at ${path}. Set auto_version to true to create a versioned file.`);
      }
    }

    // Create the file
    await createFile(finalPath, documentContent, plugin.app);

    // Add navigation target
    context.addNavigationTarget({
      filePath: finalPath
    });

    context.setLabel(t('tools.createDocument.labels.completed', { name: filename }));
    context.progress(t('tools.createDocument.progress.success', { name: extractFilenameWithoutExtension(finalPath) }));
  }
};
