
import  { createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import type {ThemeMode} from '../types/index'
import { DARK_COLORS,LIGHT_COLORS } from '../Configuration';


// THEME CONTEXT

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};



interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}
export const getColors = (theme: ThemeMode) => theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;



const ThemeToggle = () => {
   const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full transition-all duration-300"
      style={{ backgroundColor: theme === 'dark' ? '#404751' : '#896f3d' }}
      aria-label="Toggle theme">
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full shadow-md flex items-center justify-center"
        style={{ backgroundColor: theme === 'dark' ? '#1a293f' : '#ffffff' }}
        animate={{ x: theme === 'dark' ? 2 : 30 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}>
        <span className="text-xs">{theme === 'dark' ? '🌙' : '☀️'}</span>
      </motion.div>
    </button>
  );
};


export default ThemeToggle
