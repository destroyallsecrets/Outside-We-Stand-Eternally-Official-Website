import React from 'react';
import { GithubRepo } from '../types';

interface GithubEmbedProps {
  repo: GithubRepo;
}

export const GithubEmbed: React.FC<GithubEmbedProps> = ({ repo }) => {
  return (
    <div className="border border-white/10 bg-slate-900/30 p-6 hover:bg-slate-900/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xl font-bold text-white hover:text-red-400 transition-colors"
        >
          {repo.name}
        </a>
        {repo.language && (
          <span className="text-xs font-mono text-slate-400">{repo.language}</span>
        )}
      </div>
      
      <div className="text-sm text-slate-300 mb-4">
        {repo.description || 'No description available'}
      </div>
      
      <div className="flex gap-6 text-xs font-mono text-slate-500">
        <span>★ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>
        <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
};
