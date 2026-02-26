import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { motion } from 'framer-motion';
import { GithubRepo } from '../types';
import { fetchDeployedProjects } from '../services/github';

export const ProjectList: React.FC = () => {
  const [filter, setFilter] = useState<'LATEST' | 'ALL'>('LATEST');
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const repos = await fetchDeployedProjects();
        setGithubRepos(repos);
      } catch (error) {
        console.error('Failed to load GitHub repos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, []);

  const displayRepos = filter === 'LATEST' 
    ? githubRepos.slice(0, 3) 
    : githubRepos;

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
      <div className="mb-24 border-b border-white/10 pb-8 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-6xl font-thin tracking-tight text-white">
            RECOVERED DATA
            <span className="block text-sm md:text-base font-normal tracking-widest text-red-500 mt-4 uppercase">
              Artifacts from the deep web
            </span>
          </h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('LATEST')}
            className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
              filter === 'LATEST' 
                ? 'bg-red-500 text-black' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
              filter === 'ALL' 
                ? 'bg-red-500 text-black' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-20">Loading repositories...</div>
      ) : displayRepos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayRepos.map((repo, idx) => (
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
              </div>
              
              {repo.homepage && (
                <a 
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-xs uppercase tracking-widest text-red-400 hover:text-red-300"
                >
                  Visit →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-32">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row gap-12 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/4 flex flex-col justify-between border-t border-white/20 pt-4">
                 <span className="text-6xl md:text-8xl font-bold text-white/5 font-mono">{project.id}</span>
                 <div className="mt-8">
                   <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Timeframe</p>
                   <p className="text-lg text-white font-mono">{project.year}</p>
                 </div>
              </div>

              <div className="w-full md:w-3/4 group relative p-8 md:p-12 border border-white/5 bg-slate-900/20 backdrop-blur-sm hover:bg-slate-900/40 transition-colors duration-500">
                <div 
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
                />
                
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight group-hover:text-red-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-mono text-red-400 mb-6 uppercase tracking-wider">
                  [{project.category}]
                </p>
                <p className="text-xl text-slate-300 leading-relaxed font-light">
                  {project.description}
                </p>

                <div className="mt-8 flex justify-end">
                   <button className="flex items-center gap-4 text-sm uppercase tracking-widest hover:text-red-400 transition-colors">
                     Decryption Key <span className="block w-8 h-px bg-current" />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
