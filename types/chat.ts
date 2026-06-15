export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatRequest {
  sessionId?: string;
  locale?: string;
  messages: Pick<ChatMessage, "role" | "content">[];
}

export interface ChatResponse {
  message: string;
  error?: string;
}
