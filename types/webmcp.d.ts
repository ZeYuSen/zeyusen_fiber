// Minimal typings for the experimental WebMCP browser API
// (https://webmachinelearning.github.io/webmcp/). Present only in browsers
// participating in the Chrome origin trial; all use sites feature-detect.

interface WebMCPToolDescriptor {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<WebMCPToolResult> | WebMCPToolResult;
}

interface WebMCPToolResult {
  content: Array<{ type: "text"; text: string }>;
}

interface WebMCPModelContext {
  provideContext(context: { tools: WebMCPToolDescriptor[] }): void;
}

interface Navigator {
  modelContext?: WebMCPModelContext;
}
