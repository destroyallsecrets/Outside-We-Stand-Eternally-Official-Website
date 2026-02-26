import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Experience3D } from './components/Experience3D';
import { NavBar } from './components/NavBar';
import { GeminiAssistant } from './components/GeminiAssistant';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Philosophy } from './pages/Philosophy';
import { Archive } from './pages/Archive';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // Scroll handler to drive 3D experience - Global logic
  useEffect(() => {
    const handleScroll = () => {
      // Calculate progress based on current page height
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on route change to reset or recalculate
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative w-full bg-[#020617] text-white selection:bg-cyan-500 selection:text-black">
      
      {/* The 3D Background Layer - Persistent across routes */}
      <Experience3D scrollProgress={scrollProgress} />

      {/* Navigation */}
      <NavBar />

      {/* Main Content Overlay */}
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/archive" element={<Archive />} />
          </Routes>
        </AnimatePresence>
      </div>

      {/* Floating Elements */}
      <GeminiAssistant />
      
    </div>
  );
};

export default App;