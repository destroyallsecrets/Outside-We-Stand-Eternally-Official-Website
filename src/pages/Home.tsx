import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SwissGrid } from '../components/SwissGrid';
import { ProjectList } from '../components/ProjectList';
import { ArrowDown } from 'lucide-react';
import { siteConfig } from '../config/site';
import { SEO } from '../components/SEO';
import { ComponentGallery } from '../components/ComponentGallery';
import { setActiveProject } from '../hooks/useActiveProject';

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveProject(null);
  }, []);

  return (
    <div className="relative w-full">
      <SEO />

      {/* Main Content Overlay */}
      <div ref={containerRef} className="w-full">

        {/* Hero Section */}
        <section className="min-h-screen relative">
          <SwissGrid />

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-50">
            <span className="text-[10px] tracking-[0.3em] uppercase">Initialize Descent</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </section>

        {/* Narrative / Philosophy Bridge */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-light leading-relaxed tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600">
              "{siteConfig.description}"
            </h2>
          </div>
          {/* Decorative glowing orb behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
        </section>

        <ComponentGallery />

        {/* Projects Section */}
        <ProjectList />

        {/* Archive Callout */}
        <section className="py-24 px-6 text-center border-t border-white/5">
          <p className="text-xs uppercase tracking-[0.5em] text-slate-600 mb-8 font-bold">Historical Records</p>
          <a href="/archive" className="text-2xl font-light hover:text-accent transition-colors group">
            Explore the Archive <span className="inline-block translate-x-0 group-hover:translate-x-2 transition-transform">â†’</span>
          </a>
        </section>

        {/* Footer */}
        <footer className="relative py-24 px-6 border-t border-white/5 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end">
            <div>
              <h2 className="text-8xl font-bold tracking-tighter text-white/10 mb-8">
                FUTURE
              </h2>
              <div className="flex gap-8 text-xs uppercase tracking-widest text-slate-500">

                <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Twitter</a>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Github</a>
              </div>
            </div>
            <div className="mt-12 md:mt-0 text-right">
              <p className="text-sm text-slate-600 font-mono">
                Â© {new Date().getFullYear()} {siteConfig.name.toUpperCase()}<br />
                ZURICH / TOKYO / METAVERSE
              </p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Home;