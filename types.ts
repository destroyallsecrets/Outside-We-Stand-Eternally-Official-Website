export type ProjectStatus = 'live' | 'deprecated' | 'archived' | 'building';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  color: string;
  status?: ProjectStatus;
  techStack?: string[];
  repoUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  lastUpdated?: string;
  stars?: number;
  views?: number;
  dependencies?: Record<string, string>;
}

export interface ProjectFilter {
  search?: string;
  tech?: string[];
  year?: string;
  status?: ProjectStatus;
}

export interface PhilosophyAxiom {
  roman: string;
  title: string;
  tagline: string;
  content: string;
  businessValue: string;
  icon: string;
}

export interface BrandPillar {
  id: string;
  title: string;
  tagline: string;
  description: string;
  businessAngle: string;
}

export interface PhilosophyAxiom {
  roman: string;
  title: string;
  tagline: string;
  content: string;
  businessValue: string;
  icon: string;
}

export interface BrandPillar {
  id: string;
  title: string;
  tagline: string;
  description: string;
  businessAngle: string;
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
