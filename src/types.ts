export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface DocumentData {
  content: string;
  name: string;
  type: string;
  size: number;
}