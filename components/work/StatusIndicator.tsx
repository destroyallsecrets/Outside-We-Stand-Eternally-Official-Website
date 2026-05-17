import React from 'react';
import { ProjectStatus } from '../../types';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Archive, Hammer } from 'lucide-react';

interface StatusIndicatorProps {
  status: ProjectStatus;
  showLabel?: boolean;
}

const statusConfig: Record<ProjectStatus, { color: string; bg: string; icon: React.FC<any>; label: string }> = {
  live: { 
    color: 'text-green-400', 
    bg: 'bg-green-400/20',
    icon: CheckCircle,
    label: 'LIVE'
  },
  deprecated: { 
    color: 'text-yellow-400', 
    bg: 'bg-yellow-400/20',
    icon: AlertTriangle,
    label: 'DEPRECATED'
  },
  archived: { 
    color: 'text-slate-400', 
    bg: 'bg-slate-400/20',
    icon: Archive,
    label: 'ARCHIVED'
  },
  building: { 
    color: 'text-cyan-400', 
    bg: 'bg-cyan-400/20',
    icon: Hammer,
    label: 'BUILDING'
  }
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  showLabel = false 
}) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${config.color} ${config.bg}`}
    >
      <Icon size={10} />
      {showLabel && <span className="tracking-wider">{config.label}</span>}
    </motion.div>
  );
};

export default StatusIndicator;