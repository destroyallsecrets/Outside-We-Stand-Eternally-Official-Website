import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { 
  SearchBar, 
  FilterChips, 
  FilterChip,
  StatusIndicator,
  TechBadges, 
  QuickActions,
  ProjectStats,
  useKeyboardNav,
  KeyboardNavIndicator
} from '../components/work';

type StatusFilter = 'all' | 'live' | 'deprecated' | 'archived' | 'building';

export const Work: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showKeyboardHint, setShowKeyboardHint] = useState(true);

  const activeProject = PROJECTS.find(p => p.id === hoveredProject) || PROJECTS[0];
  const currentIndex = PROJECTS.findIndex(p => p.id === (hoveredProject || PROJECTS[0].id));

  const years = useMemo(() => {
    const unique = [...new Set(PROJECTS.map(p => p.year))].filter(Boolean);
    return unique.map(y => ({ id: y, label: y }));
  }, []);

  const techs = useMemo(() => {
    const techSet = new Set<string>();
    PROJECTS.forEach(p => p.techStack?.forEach(t => techSet.add(t)));
    return Array.from(techSet).map(t => ({ id: t, label: t }));
  }, []);

  const statuses: FilterChip[] = [
    { id: 'live', label: 'Live', count: PROJECTS.filter(p => p.status === 'live').length },
    { id: 'building', label: 'Building', count: PROJECTS.filter(p => p.status === 'building').length },
    { id: 'deprecated', label: 'Deprecated', count: PROJECTS.filter(p => p.status === 'deprecated').length },
    { id: 'archived', label: 'Archived', count: PROJECTS.filter(p => p.status === 'archived').length }
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchesSearch = !search || 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesFilters = selectedFilters.length === 0 || 
        selectedFilters.includes(p.year) ||
        selectedFilters.includes(p.status || '') ||
        p.techStack?.some(t => selectedFilters.includes(t));
      
      return matchesSearch && matchesFilters;
    });
  }, [search, selectedFilters]);

  const handleUp = useCallback(() => {
    const idx = filteredProjects.findIndex(p => p.id === activeProject.id);
    if (idx > 0) {
      setHoveredProject(filteredProjects[idx - 1].id);
    } else {
      setHoveredProject(filteredProjects[filteredProjects.length - 1].id);
    }
  }, [activeProject.id, filteredProjects]);

  const handleDown = useCallback(() => {
    const idx = filteredProjects.findIndex(p => p.id === activeProject.id);
    if (idx < filteredProjects.length - 1) {
      setHoveredProject(filteredProjects[idx + 1].id);
    } else {
      setHoveredProject(filteredProjects[0].id);
    }
  }, [activeProject.id, filteredProjects]);

  const handleSelect = useCallback(() => {
    if (activeProject.demoUrl) {
      window.open(activeProject.demoUrl, '_blank');
    }
  }, [activeProject]);

  useKeyboardNav({
    onUp: handleUp,
    onDown: handleDown,
    onSelect: handleSelect,
    itemCount: filteredProjects.length,
    currentIndex
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowKeyboardHint(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFilter = (id: string) => {
    setSelectedFilters(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
      
      {/* Left Column: The Index */}
      <div className="w-full md:w-1/2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-thin tracking-tighter mb-4">INDEX</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-500">
            Project Registry // Global Node 01
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="space-y-3 mb-6">
          <SearchBar 
            value={search} 
            onChange={setSearch}
            placeholder="Search projects..."
          />
          
          <div className="flex flex-wrap gap-3">
            <FilterChips 
              chips={statuses}
              selected={selectedFilters}
              onToggle={toggleFilter}
              onClear={() => setSelectedFilters([])}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="text-xs text-slate-500 mb-4">
          {filteredProjects.length} of {PROJECTS.length} projects
        </div>

        <div className="space-y-1">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-500">
            <div className="col-span-2">ID</div>
            <div className="col-span-6">Project</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Year</div>
          </div>

          <AnimatePresence mode="pop">
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ x: 10, backgroundColor: 'rgba(34, 211, 238, 0.05)' }}
                onClick={() => setHoveredProject(project.id)}
                className={`
                  group grid grid-cols-12 gap-4 py-4 px-3 border-b border-white/5 cursor-pointer 
                  transition-all duration-200 items-center
                  ${hoveredProject === project.id ? 'bg-white/10' : ''}
                `}
              >
                <div className="col-span-2 text-xs font-mono text-slate-500">
                  {project.id}
                </div>
                <div className="col-span-6">
                  <span className="text-sm font-light text-slate-300 group-hover:text-white transition-colors">
                    {project.title}
                  </span>
                </div>
                <div className="col-span-2">
                  {project.status && (
                    <StatusIndicator status={project.status} />
                  )}
                </div>
                <div className="col-span-2 text-right text-xs font-mono text-slate-500">
                  {project.year}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Column: The Preview (Sticky) */}
      <div className="hidden md:block w-full md:w-1/2 relative">
        <div className="sticky top-32 h-[650px] border border-white/20 bg-slate-900/50 backdrop-blur-xl p-8 flex flex-col justify-between overflow-hidden rounded-2xl">
          
          {/* Background decoration */}
          <div 
            className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none transition-colors duration-700"
            style={{ 
              background: `radial-gradient(circle at 50% 50%, ${activeProject.color}, transparent 70%)` 
            }}
          />

          <div className="relative z-10 flex justify-between items-start mb-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            {activeProject.status && (
              <StatusIndicator status={activeProject.status} showLabel />
            )}
          </div>

          <div className="relative z-10 flex-1">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-thin tracking-tight text-white mb-2">
                {activeProject.title}
              </h2>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-500 mb-4">
                {activeProject.category}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                {activeProject.description}
              </p>

              {/* Tech Stack */}
              {activeProject.techStack && activeProject.techStack.length > 0 && (
                <div className="mt-6">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Tech Stack</p>
                  <TechBadges techStack={activeProject.techStack} maxDisplay={6} />
                </div>
              )}

              {/* Quick Actions */}
              {(activeProject.repoUrl || activeProject.demoUrl || activeProject.docsUrl) && (
                <div className="mt-6">
                  <QuickActions 
                    repoUrl={activeProject.repoUrl}
                    demoUrl={activeProject.demoUrl}
                    docsUrl={activeProject.docsUrl}
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Stats */}
          <div className="relative z-10 mt-6 pt-6 border-t border-white/10">
            <ProjectStats 
              stars={activeProject.stars}
              views={activeProject.views}
              lastUpdated={activeProject.lastUpdated}
            />
          </div>
        </div>
      </div>

      {/* Mobile preview would go here - keeping original for now */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-slate-900 border border-white/20 p-4 rounded-xl z-50">
        <p className="text-xs text-slate-500 text-center">
          Use desktop for full preview
        </p>
      </div>

      <AnimatePresence>
        {showKeyboardHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 text-xs text-slate-500 font-mono bg-black/50 px-3 py-2 rounded flex gap-3"
          >
            <span>↑↓ navigate</span>
            <span>↵ open</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Work;