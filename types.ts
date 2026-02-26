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

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  homepage: string | null;
  archived: boolean;
  disabled: boolean;
}

export interface GithubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
}
