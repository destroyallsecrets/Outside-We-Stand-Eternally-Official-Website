import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { GeminiAssistant } from './components/GeminiAssistant';
import { InfiniteProcedural2D } from './components/Background2D';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Philosophy } from './pages/Philosophy';
import { Archive } from './pages/Archive';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative w-full bg-[#020617] text-white selection:bg-red-500 selection:text-black">
      
      {/* Infinite Procedural Background */}
      <InfiniteProcedural2D />
      
      {/* Navigation */}
      <NavBar />

      {/* Main Content */}
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