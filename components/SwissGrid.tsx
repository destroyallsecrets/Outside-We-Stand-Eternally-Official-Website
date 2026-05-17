import React from 'react';
import { motion } from 'framer-motion';

export const SwissGrid: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-8 pointer-events-none">
      <div className="w-full max-w-7xl h-full grid grid-cols-1 md:grid-cols-12 gap-4 opacity-15">
        {/* Golden Ratio Lines / Grid Logic */}
        <div className="hidden md:block col-span-1 h-screen border-r border-white/10" />
        <div className="hidden md:block col-span-3 h-screen border-r border-white/10" />
        <div className="hidden md:block col-span-4 h-screen border-r border-white/10" />
        <div className="hidden md:block col-span-3 h-screen border-r border-white/10" />
        <div className="hidden md:block col-span-1 h-screen" />
        
        {/* Horizontal Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-white/5" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex flex-col justify-between p-12 pointer-events-auto"
      >
        <div className="flex justify-between items-start">
          <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-[0.8] mix-blend-overlay text-white/60">
            OUTSIDE<br/>WE STAND<br/>ETERNALLY
          </h1>
          <div className="hidden md:block text-right">
             <p className="text-xs uppercase tracking-[0.3em] text-red-500 mb-2">Location</p>
             <p className="font-mono text-sm text-slate-400">Central Indiana</p>
             <p className="font-mono text-sm text-slate-400">United States</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
           <div className="max-w-md">
             <div className="w-12 h-1 bg-red-500 mb-6" />
             <p className="text-lg md:text-xl font-light leading-relaxed text-slate-300">
               Miles Moore<br/>
               HQ: Central Indiana<br/>
               destroyallsecretsicloud.com<br/>
               github.com/destroyallsecrets
             </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
};