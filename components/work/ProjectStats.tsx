import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Star, GitBranch, Clock, Activity, Zap, AlertCircle } from 'lucide-react';

interface ProjectStatsProps {
  stars?: number;
  views?: number;
  forks?: number;
  lastUpdated?: string;
  dependencies?: Record<string, string>;
}

interface StatItem {
  icon: React.FC<{ size?: number }>;
  value: string | number;
  label: string;
  color: string;
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({
  stars = 0,
  views = 0,
  forks = 0,
  lastUpdated,
  dependencies = {}
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };
  
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };
  
  const stats: StatItem[] = [
    { icon: Star, value: formatNumber(stars), label: 'Stars', color: 'text-yellow-400' },
    { icon: Eye, value: formatNumber(views), label: 'Views', color: 'text-cyan-400' },
    { icon: GitBranch, value: formatNumber(forks), label: 'Forks', color: 'text-green-400' }
  ];
  
  const depCount = Object.keys(dependencies).length;
  const majorDeps = Object.entries(dependencies)
    .filter(([_, version]) => version.startsWith('^') || version.startsWith('~'))
    .length;
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center p-3 bg-white/5 rounded"
            >
              <Icon size={16} className={stat.color} />
              <div className="text-lg font-light text-white mt-1">{stat.value}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>
      
      {lastUpdated && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock size={12} />
          <span>Updated {formatDate(lastUpdated)}</span>
        </div>
      )}
      
      {depCount > 0 && (
        <div className="flex items-center gap-2 text-xs">
          <div className={`flex items-center gap-1 ${majorDeps > 0 ? 'text-yellow-400' : 'text-slate-500'}`}>
            <Zap size={12} />
            <span>{depCount} dependencies</span>
          </div>
          {majorDeps > 0 && (
            <div className="flex items-center gap-1 text-orange-400">
              <AlertCircle size={12} />
              <span>{majorDeps} outdated</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectStats;