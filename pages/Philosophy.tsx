import React from 'react';
import { PHILOSOPHY_AXIOMS, BRAND_PILLARS } from '../constants';
import { motion } from 'framer-motion';
import { Sparkles, Eye, Infinity, Compass, VolumeX, CheckCircle, TrendingUp, Users } from 'lucide-react';

export const Philosophy: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-32 px-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="mb-32 text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.4em] text-red-500 mb-6"
        >
          Manifesto v4.0
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

      {/* Brand Pillars */}
      <div className="mb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <Sparkles className="w-8 h-8 mx-auto mb-4 text-red-400" />
          <h2 className="text-3xl font-bold mb-2">The OWSE Standard</h2>
          <p className="text-slate-400">Not just a marketplace. A new paradigm.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {BRAND_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-red-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                {pillar.id === 'verification' && <CheckCircle className="w-5 h-5 text-red-400" />}
                {pillar.id === 'transparency' && <Eye className="w-5 h-5 text-red-400" />}
                {pillar.id === 'innovation' && <TrendingUp className="w-5 h-5 text-red-400" />}
                {pillar.id === 'community' && <Users className="w-5 h-5 text-red-400" />}
                <h3 className="text-lg font-bold">{pillar.title}</h3>
              </div>
              <p className="text-xs text-red-400 mb-2">{pillar.tagline}</p>
              <p className="text-sm text-slate-300 mb-3">{pillar.description}</p>
              <p className="text-xs text-slate-500 italic">"{pillar.businessAngle}"</p>
            </motion.div>
          ))}
        </div>
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
            <div className="absolute -left-3 top-0 w-6 h-6 bg-[#020617] border border-white/20 flex items-center justify-center rounded-full text-[10px] font-mono text-red-500">
              {axiom.roman}
            </div>

            <div className="md:w-1/3">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-slate-400 sticky top-32">
                {axiom.title}
              </h2>
              <span className="text-xs text-red-400">{axiom.tagline}</span>
            </div>
            
            <div className="md:w-2/3">
              <p className="text-3xl md:text-5xl font-light leading-tight text-white mix-blend-overlay mb-4">
                {axiom.content}
              </p>
              <p className="text-sm text-red-400 font-medium border-t border-white/10 pt-3">
                {axiom.businessValue}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Signature */}
      <div className="mt-48 text-center opacity-50">
        <div className="w-1 h-24 bg-gradient-to-b from-transparent via-red-500 to-transparent mx-auto mb-8" />
        <p className="font-mono text-xs">END OF FILE</p>
      </div>

    </div>
  );
};