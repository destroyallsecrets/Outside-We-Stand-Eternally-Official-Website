import React from 'react';
import { SwissGrid } from '../components/SwissGrid';
import { ProjectList } from '../components/ProjectList';
import { ArrowDown, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { EXTERNAL_LINKS } from '../constants';

export const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen relative">
        <SwissGrid />
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-50">
          <span className="text-[10px] tracking-[0.3em] uppercase">Enter The Void</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </section>

      {/* Narrative / Philosophy Bridge */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-2xl md:text-4xl font-light leading-relaxed tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-800"
          >
            "We do not hide in the shadows. We are the shadows."
          </motion.h2>
        </div>
        {/* Decorative glowing orb behind text - Changed to Red/Dark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* External Projects Section */}
      <section className="py-24 px-6 relative z-10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-thin tracking-tight text-white mb-4">
              FEATURED PROJECT
            </h2>
            <p className="text-red-400 text-sm uppercase tracking-widest">From the deep</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto border border-white/20 bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {EXTERNAL_LINKS.inkglass.name}
            </h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              {EXTERNAL_LINKS.inkglass.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={EXTERNAL_LINKS.inkglass.vercel}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-red-500 hover:bg-red-600 text-black font-bold uppercase tracking-widest transition-colors rounded-lg"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
              <a
                href={EXTERNAL_LINKS.inkglass.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 border border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-bold uppercase tracking-widest transition-colors rounded-lg"
              >
                <Github className="w-5 h-5" />
                Source Code
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectList />

      {/* Footer */}
      <footer className="relative py-24 px-6 border-t border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-8xl font-bold tracking-tighter text-white/10 mb-8">
              ETERNAL
            </h2>
            <div className="flex gap-8 text-xs uppercase tracking-widest text-slate-500">
              <a href="#" className="hover:text-red-500 transition-colors">Manifesto</a>
              <a href="#" className="hover:text-red-500 transition-colors">Signal</a>
              <a href="#" className="hover:text-red-500 transition-colors">Void</a>
            </div>
          </div>
          <div className="mt-12 md:mt-0 text-right">
             <p className="text-sm text-slate-600 font-mono">
               © 2024 OUTSIDE WE STAND ETERNALLY<br/>
               NOWHERE / EVERYWHERE
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
};