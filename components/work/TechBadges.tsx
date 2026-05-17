import React from 'react';
import { motion } from 'framer-motion';

interface TechBadgesProps {
  techStack: string[];
  maxDisplay?: number;
}

const techIcons: Record<string, string> = {
  react: '⚛️',
  vue: '💚',
  angular: '🔵',
  nextjs: '▲',
  typescript: '📘',
  javascript: '📒',
  python: '🐍',
  rust: '🦀',
  go: '🐹',
  nodejs: '🟢',
  deno: '🦕',
  tailwind: '💨',
  framer: '🎭',
  threejs: '🎲',
  webgl: '🌐',
  graphql: '◼️',
  rest: '🔗',
  postgresql: '🐘',
  mongodb: '🍃',
  redis: '🔴',
  docker: '🐳',
  kubernetes: '☸️',
  aws: '☁️',
  vercel: '▲',
  netlify: '❇️',
  figma: '🎨',
  blender: '🧊',
  unity: '🎮',
  unreal: '🎯',
  gpt: '🤖',
  openai: '🧠',
  stripe: '💳',
  sendgrid: '📧',
  twilio: '📱',
  auth0: '🔐',
  jwt: '🎫',
  web3: '⛓️',
  solidity: '💎',
  ethers: '🔷',
  ipfs: '📦',
  arweave: '🌀'
};

export const TechBadges: React.FC<TechBadgesProps> = ({ 
  techStack, 
  maxDisplay = 5 
}) => {
  const display = techStack.slice(0, maxDisplay);
  const remaining = techStack.length - maxDisplay;
  
  return (
    <div className="flex flex-wrap gap-1.5">
      {display.map((tech, index) => {
        const icon = techIcons[tech.toLowerCase()] || '⚙️';
        return (
          <motion.span
            key={tech}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.03 }}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-white/5 text-slate-400 rounded hover:bg-white/10 transition-colors cursor-default"
          >
            <span>{icon}</span>
            <span className="capitalize">{tech}</span>
          </motion.span>
        );
      })}
      {remaining > 0 && (
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: display.length * 0.03 }}
          className="inline-flex items-center px-2 py-1 text-xs text-slate-500 bg-white/5 rounded"
        >
          +{remaining}
        </motion.span>
      )}
    </div>
  );
};

export default TechBadges;