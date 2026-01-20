export interface Project {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
  techStack: string[];
  metrics: string[];
  link?: string;
  architecture?: ArchitectureNode[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'edge' | 'compute' | 'data' | 'ai' | 'security';
  details: string;
  tech: string;
  stats?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}