export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription?: string;
  year: string;
  color: string;
  role?: string;
  link?: string;
  techStack?: string[];
  extendedTechStack?: { name: string; description: string; icon?: string }[];
  challenges?: string;
  solution?: string;
  images?: string[];
  layoutType?: 'classic' | 'immersive' | 'technical' | 'modern' | 'agentic';
  shapeType?: 'torus' | 'icosahedron' | 'octahedron' | 'sphere' | 'dodecahedron';
  githubUrl?: string;
  isArchived?: boolean;
  stats?: {
    stars: number;
    forks: number;
    issues: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}
