// JSON Schema type definitions
export interface JSONSchemaProperty {
	type: 'string' | 'number' | 'boolean' | 'object' | 'array';
	description?: string;
	enum?: (string | number)[];
	properties?: Record<string, JSONSchemaProperty>;
	items?: JSONSchemaProperty;
	required?: string[];
	default?: unknown;
}

export interface UserToolSchema {
	type: 'object';
	properties: Record<string, JSONSchemaProperty>;
	required?: string[];
}

// Text content information for navigation targets
export interface TextContent {
	// For exact matching and repositioning
	fullText?: string;           // Complete text (for short segments)
	startText?: string;          // First 3 lines (for long segments)  
	endText?: string;            // Last 3 lines (for long segments)
	// Metadata for display and validation
	preview?: string;            // Truncated preview for UI display
	characterCount?: number;     // Length validation
	lineCount?: number;          // Number of lines spanned
}

// Navigation target interface (avoiding circular dependency)
export interface NavigationTarget {
	filePath: string;
	lineRange?: { start: number; end: number };
	textContent?: TextContent;
}

export interface UserDefinedTool {
  // Tool identification
  filePath: string;
  name: string;
  description: string;
  version: string;
  
  // UI customization  
  icon: string;
  
  // Execution
  executeCode: string;
  schema: UserToolSchema; // Properly typed JSON schema
  enabled: boolean;
  sideEffects?: boolean; // Whether this tool has side effects (defaults to true for safety)
  
  // Security
  approved: boolean;
  codeHash: string;
  schemaHash: string; // Separate hash for schema
  lastModified: number;
}

export interface ToolApproval {
  toolPath: string;
  codeHash: string;
  schemaHash: string;
  approvedAt: number;
  approvedByUser: boolean;
}

export interface UserToolExecutionContext<TParams = Record<string, unknown>> {
  // Input parameters from the AI model
  params: TParams;
  
  // Plugin instance for accessing Obsidian APIs
  plugin: any; // MyPlugin type - keeping as any since it's external
  
  // Progress reporting (appears in chat as status updates)
  progress: (message: string) => void;
  
  // Navigation targets (clickable links in chat)
  addNavigationTarget: (target: NavigationTarget) => void;
  
  // Action text/label management (updates the tool's display text in chat)
  setLabel: (text: string) => void;
} 