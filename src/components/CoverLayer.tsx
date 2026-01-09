import React, { useEffect, useState } from 'react';
import { motion} from 'framer-motion';
import { getColors, useTheme } from './ThemeToggle';
import { TagLines } from '../constants';
import { DARK_COLORS, FADE_ANIMATION_CONFIG } from '../Configuration';




// ============================================================================
// COMPONENT: Cover Layer
// ============================================================================

const CoverLayer: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  // Typing animation effect
  useEffect(() => {
    const currentTagline = TagLines[currentTaglineIndex];
    
    if (isTyping) {
      // Typing phase
      if (displayedText.length < currentTagline.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentTagline.slice(0, displayedText.length + 1));
        }, 80); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        // Pause before untyping
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2500); // Pause duration
        return () => clearTimeout(timeout);
      }
    } else {
      // Untyping phase
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50); // Untyping speed (faster)
        return () => clearTimeout(timeout);
      } else {
        // Move to next tagline
        setCurrentTaglineIndex((prev) => (prev + 1) % TagLines.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentTaglineIndex]);
  
  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ 
        y: `${FADE_ANIMATION_CONFIG.yDistance}%`,
        opacity: 0,
        transition: { duration: FADE_ANIMATION_CONFIG.duration, ease: FADE_ANIMATION_CONFIG.ease }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ 
        backgroundImage: 'url(assets/ocean.jfif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
      
      <div className="absolute inset-0" style={{ 
        backgroundColor: theme === 'dark' 
          ? 'rgba(10, 20, 40, 0.75)' 
          : 'rgba(16, 33, 52, 0.65)',
        backdropFilter: 'blur(2px)'
      }} />
      
      <div className="absolute inset-0" style={{ 
        background: theme === 'dark'
          ? 'linear-gradient(135deg, rgba(26, 41, 63, 0.6) 0%, rgba(16, 33, 52, 0.8) 50%, rgba(10, 20, 40, 0.7) 100%)'
          : 'linear-gradient(135deg, rgba(26, 41, 63, 0.5) 0%, rgba(16, 33, 52, 0.6) 50%, rgba(26, 41, 63, 0.5) 100%)'
      }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-4xl">
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6"
          style={{ 
            color: colors.lightText,
            textShadow: '3px 3px 30px rgba(0,0,0,0.7), 0 0 40px rgba(26, 41, 63, 0.5)'
          }}>
          Your Journey
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-3 sm:mt-4"
            style={{ 
              color: colors.gold,
              textShadow: '2px 2px 20px rgba(0,0,0,0.8), 0 0 30px rgba(137, 111, 61, 0.4)'
            }}>
            Starts Here
          </span>
        </motion.h1>
        
        {/* Typing animation tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-2xl mx-auto px-4 italic h-16 flex items-center justify-center"
          style={{ 
            color: colors.lightText,
            textShadow: '2px 2px 15px rgba(0,0,0,0.8)'
          }}>
          {displayedText}
          <span className="inline-block w-1 h-6 ml-1 animate-pulse" 
            style={{ 
              backgroundColor: colors.gold,
              animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}>
          </span>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-xl sm:text-2xl shadow-2xl transition-all border-2"
          style={{ 
            backgroundColor: colors.gold,
            color: DARK_COLORS.lightText,
            borderColor: 'rgba(137, 111, 61, 0.5)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(137, 111, 61, 0.3)'
          }}>
          Enter Website 🌊
        </motion.button>
      </motion.div>
      
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(137, 111, 61, 0.15)' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(64, 71, 81, 0.2)' }} />
    </motion.div>
  );
};
export default CoverLayer;
