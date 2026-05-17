import React from 'react';
import { Project, ProjectStatus } from '../../types';
import { ExternalLink, Github, FileText, Play, CheckCircle, AlertTriangle, Archive, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import { StatusIndicator } from './StatusIndicator';
import { TechBadges } from './TechBadges';
import { QuickActions } from './QuickActions';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onSelect: () => void;
  index: number;
}

const statusColors: Record<ProjectStatus, string> = {
  live: 'text-green-400',
  deprecated: 'text-yellow-400', 
  archived: 'text-slate-400',
  building: 'text-cyan-400'
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive, onSelect, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onSelect}
      className={`
        grid grid-cols-12 gap-4 py-4 px-3 cursor-pointer border-b border-white/5
        transition-all duration-200 hover:bg-white/5
        ${isActive ? 'bg-white/10' : ''}
      `}
    >
      <div className="col-span-2 text-xs font-mono text-slate-500 flex items-center">
        {String(project.id).padStart(2, '0')}
      </div>
      
      <div className="col-span-6">
        <div className="text-sm font-light text-white flex items-center gap-2">
          <span>{project.title}</span>
          {project.status && <StatusIndicator status={project.status} />}
        </div>
        <div className="text-xs text-slate-500 mt-0.5">{project.category}</div>
      </div>
      
      <div className="col-span-4 text-right text-xs text-slate-500 flex items-center justify-end gap-3">
        <span>{project.year}</span>
        {project.techStack && project.techStack.length > 0 && (
          <span className="text-slate-600">+{project.techStack.length}</span>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;