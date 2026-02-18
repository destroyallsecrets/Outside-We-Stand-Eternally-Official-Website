import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none mix-blend-difference">
      <NavLink 
        to="/" 
        className="font-bold tracking-tighter text-xl pointer-events-auto cursor-pointer text-white hover:text-red-500 transition-colors"
      >
        OWSE
      </NavLink>
      
      <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest pointer-events-auto text-white">
        <NavLink 
          to="/work" 
          className={({ isActive }) => 
            `hover:underline decoration-red-500 underline-offset-4 ${isActive ? 'text-red-500 underline' : ''}`
          }
        >
          ARTIFACTS
        </NavLink>
        <NavLink 
          to="/philosophy" 
          className={({ isActive }) => 
            `hover:underline decoration-red-500 underline-offset-4 ${isActive ? 'text-red-500 underline' : ''}`
          }
        >
          TENETS
        </NavLink>
      </div>
      
      {/* Mobile Menu Icon Placeholder (Conceptual) */}
      <div className="md:hidden pointer-events-auto text-white">
        <div className="w-6 h-0.5 bg-current mb-1"></div>
        <div className="w-6 h-0.5 bg-current mb-1"></div>
        <div className="w-4 h-0.5 bg-current ml-auto"></div>
      </div>
    </div>
  );
};