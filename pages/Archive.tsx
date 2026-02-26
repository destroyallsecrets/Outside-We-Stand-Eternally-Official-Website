import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GithubRepo } from '../types';
import { fetchUndeployedRepos } from '../services/github';

export const Archive: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const data = await fetchUndeployedRepos();
        setRepos(data);
      } catch (error) {
        console.error('Failed to load repositories:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, []);

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24 border-b border-white/10 pb-8"
      >
        <h2 className="text-4xl md:text-6xl font-thin tracking-tight text-white">
          ARCHIVE
          <span className="block text-sm md:text-base font-normal tracking-widest text-slate-500 mt-4 uppercase">
            Undeployed repositories
          </span>
        </h2>
      </motion.div>

      {loading ? (
        <div className="text-center text-slate-400 py-20">Loading archives...</div>
      ) : repos.length === 0 ? (
        <div className="text-center text-slate-400 py-20">
          No archived repositories found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, idx) => (
            <motion.div 
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="border border-white/10 bg-slate-900/30 p-6 hover:bg-slate-900/50 transition-colors group"
            >
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
              
              <div className="text-sm text-slate-300 mb-4 line-clamp-3">
                {repo.description || 'No description available'}
              </div>
              
              <div className="flex gap-4 text-xs font-mono text-slate-500">
                <span>★ {repo.stargazers_count}</span>
                <span>⑂ {repo.forks_count}</span>
                <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;
