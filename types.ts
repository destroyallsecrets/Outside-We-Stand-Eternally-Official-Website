export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}
