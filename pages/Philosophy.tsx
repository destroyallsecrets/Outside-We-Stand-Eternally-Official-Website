import React from 'react';
import { PHILOSOPHY_AXIOMS } from '../constants';
import { motion } from 'framer-motion';

export const Philosophy: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-32 px-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="mb-32 text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.4em] text-cyan-500 mb-6"
        >
          Manifesto v3.0
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-thin tracking-tighter"
        >
          CORE DOCTRINE
        </motion.h1>
      </div>

      {/* Axioms */}
      <div className="space-y-48">
        {PHILOSOPHY_AXIOMS.map((axiom, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-12 border-l border-white/20 pl-8 md:pl-16 relative"
          >
            {/* Roman Numeral */}
            <div className="absolute -left-3 top-0 w-6 h-6 bg-[#020617] border border-white/20 flex items-center justify-center rounded-full text-[10px] font-mono text-cyan-500">
              {axiom.roman}
            </div>

            <div className="md:w-1/3">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-slate-400 sticky top-32">
                {axiom.title}
              </h2>
            </div>
            
            <div className="md:w-2/3">
              <p className="text-3xl md:text-5xl font-light leading-tight text-white mix-blend-overlay">
                {axiom.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Signature */}
      <div className="mt-48 text-center opacity-50">
        <div className="w-1 h-24 bg-gradient-to-b from-transparent via-cyan-500 to-transparent mx-auto mb-8" />
        <p className="font-mono text-xs">END OF FILE</p>
      </div>

    </div>
  );
};