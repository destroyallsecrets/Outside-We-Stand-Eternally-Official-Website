import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, FileText, Play, Terminal, Server, Bug, Zap } from 'lucide-react';

interface QuickActionsProps {
  repoUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
}

interface ActionButton {
  label: string;
  icon: React.FC<{ size?: number }>;
  url?: string;
  primary?: boolean;
  action?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ 
  repoUrl, 
  demoUrl, 
  docsUrl 
}) => {
  const buttons: ActionButton[] = [
    {
      label: 'Demo',
      icon: Play,
      url: demoUrl,
      primary: true
    },
    {
      label: 'Repo',
      icon: Github,
      url: repoUrl
    },
    {
      label: 'Docs',
      icon: FileText,
      url: docsUrl
    },
    {
      label: 'API',
      icon: Server,
      url: repoUrl ? `${repoUrl}/api` : undefined
    },
    {
      label: 'Test',
      icon: Bug,
      action: () => window.open(`${repoUrl}/tests`, '_blank')
    }
  ].filter(btn => btn.url || btn.action);

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((btn, index) => {
        const Icon = btn.icon;
        return (
          <motion.a
            key={btn.label}
            href={btn.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded transition-colors
              ${btn.primary 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-white/10 hover:bg-white/20 text-slate-300'}
            `}
          >
            <Icon size={12} />
            <span>{btn.label}</span>
          </motion.a>
        );
      })}
    </div>
  );
};

export default QuickActions;