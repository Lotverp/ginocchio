
export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ProjectState {
  files: ProjectFile[];
  activeFileId: string | null;
}
