import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Cpu, Globe } from 'lucide-react';

export const Work: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const activeProject = PROJECTS.find(p => p.id === hoveredProject) || PROJECTS[0];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
      
      {/* Left Column: The Index */}
      <div className="w-full md:w-1/2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-thin tracking-tighter mb-4">INDEX</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-500">
            Archived Projects // Global Node 01
          </p>
        </motion.div>

        <div className="space-y-1">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-500">
            <div className="col-span-2">ID</div>
            <div className="col-span-6">Project Name</div>
            <div className="col-span-4 text-right">Year</div>
          </div>

          {PROJECTS.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ x: 10, backgroundColor: 'rgba(34, 211, 238, 0.05)' }}
              onMouseEnter={() => setHoveredProject(project.id)}
              className="group grid grid-cols-12 gap-4 py-6 border-b border-white/5 cursor-pointer transition-all duration-300 items-center"
            >
              <div className="col-span-2 font-mono text-cyan-500/50 group-hover:text-cyan-400">
                {project.id}
              </div>
              <div className="col-span-6">
                <span className="text-xl font-light group-hover:text-white transition-colors text-slate-300">
                  {project.title}
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-slate-600 group-hover:text-cyan-500/70 mt-1">
                  {project.category}
                </span>
              </div>
              <div className="col-span-4 text-right font-mono text-slate-500 group-hover:text-white">
                {project.year}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Column: The Preview (Sticky) */}
      <div className="hidden md:block w-full md:w-1/2 relative">
        <div className="sticky top-32 h-[600px] border border-white/10 bg-slate-900/30 backdrop-blur-sm p-8 flex flex-col justify-between overflow-hidden">
          
          {/* Background decoration */}
          <div 
            className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none transition-colors duration-700"
            style={{ 
              background: `radial-gradient(circle at 50% 50%, ${activeProject.color}, transparent 70%)` 
            }}
          />

          <div className="relative z-10 flex justify-between items-start">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="font-mono text-xs text-white/30">PREVIEW_MODE_ACTIVE</div>
          </div>

          <div className="relative z-10 my-auto">
             <motion.h2 
               key={activeProject.id}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ type: "spring", stiffness: 100 }}
               className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-600"
             >
               {activeProject.title}
             </motion.h2>
             <motion.p 
                key={`${activeProject.id}-desc`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-lg text-slate-300 font-light leading-relaxed max-w-md"
             >
               {activeProject.description}
             </motion.p>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 flex justify-between items-center">
            <div className="flex gap-4 text-slate-400">
               <Cpu className="w-5 h-5" />
               <Globe className="w-5 h-5" />
               <Code className="w-5 h-5" />
            </div>
            <button className="flex items-center gap-2 text-sm uppercase tracking-widest text-cyan-400 hover:text-white transition-colors">
              Launch Project <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};