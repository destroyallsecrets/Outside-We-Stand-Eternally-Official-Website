import { useEffect, useCallback } from 'react';

interface KeyboardNavProps {
  onUp: () => void;
  onDown: () => void;
  onSelect: () => void;
  onEscape?: () => void;
  itemCount: number;
  currentIndex: number;
}

export const useKeyboardNav = ({
  onUp,
  onDown,
  onSelect,
  onEscape,
  itemCount,
  currentIndex
}: KeyboardNavProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (document.activeElement?.tagName === 'INPUT' || 
        document.activeElement?.tagName === 'TEXTAREA') {
      return;
    }
    
    switch (e.key) {
      case 'ArrowUp':
      case 'k':
        if (e.metaKey || e.ctrlKey) break;
        e.preventDefault();
        onUp();
        break;
        
      case 'ArrowDown':
      case 'j':
        if (e.metaKey || e.ctrlKey) break;
        e.preventDefault();
        onDown();
        break;
        
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect();
        break;
        
      case 'Escape':
        e.preventDefault();
        onEscape?.();
        break;
        
      case 'g':
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          onSelect();
        }
        break;
    }
  }, [onUp, onDown, onSelect, onEscape]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

export const KeyboardNavIndicator: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 text-[10px] text-slate-600 font-mono bg-black/50 px-2 py-1 rounded">
      <span>↑↓ navigate</span>
      <span>↵ select</span>
      <span>esc clear</span>
    </div>
  );
};

export default useKeyboardNav;