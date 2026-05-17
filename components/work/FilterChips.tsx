import React from 'react';
import { motion } from 'framer-motion';
import { X, Filter } from 'lucide-react';

export interface FilterChip {
  id: string;
  label: string;
  count?: number;
}

interface FilterChipsProps {
  chips: FilterChip[];
  selected: string[];
  onToggle: (id: string) => void;
  onClear?: () => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ 
  chips, 
  selected, 
  onToggle,
  onClear 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1 text-xs text-slate-500">
        <Filter size={12} />
        <span>FILTER</span>
      </div>
      
      {chips.map((chip) => {
        const isSelected = selected.includes(chip.id);
        return (
          <motion.button
            key={chip.id}
            onClick={() => onToggle(chip.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              inline-flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors
              ${isSelected 
                ? 'bg-red-500/80 text-white' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10'}
            `}
          >
            <span>{chip.label}</span>
            {chip.count !== undefined && (
              <span className={`text-[10px] ${isSelected ? 'text-white/70' : 'text-slate-600'}`}>
                ({chip.count})
              </span>
            )}
          </motion.button>
        );
      })}
      
      {selected.length > 0 && onClear && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={onClear}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-white transition-colors"
        >
          <X size={12} />
          <span>Clear</span>
        </motion.button>
      )}
    </div>
  );
};

export default FilterChips;