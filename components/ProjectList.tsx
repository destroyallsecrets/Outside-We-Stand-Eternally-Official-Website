import React from 'react';
import { PROJECTS } from '../constants';
import { motion } from 'framer-motion';

export const ProjectList: React.FC = () => {
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
      <div className="mb-24 border-b border-white/10 pb-8">
        <h2 className="text-4xl md:text-6xl font-thin tracking-tight text-white">
          RECOVERED DATA
          <span className="block text-sm md:text-base font-normal tracking-widest text-red-500 mt-4 uppercase">
            Artifacts from the deep web
          </span>
        </h2>
      </div>

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
            {/* Project Number / Meta */}
            <div className="w-full md:w-1/4 flex flex-col justify-between border-t border-white/20 pt-4">
               <span className="text-6xl md:text-8xl font-bold text-white/5 font-mono">{project.id}</span>
               <div className="mt-8">
                 <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Timeframe</p>
                 <p className="text-lg text-white font-mono">{project.year}</p>
               </div>
            </div>

            {/* Project Content */}
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
    </div>
  );
};