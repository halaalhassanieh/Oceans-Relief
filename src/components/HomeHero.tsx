import { useState } from 'react';
import { motion } from 'framer-motion';
import { getColors, useTheme } from "../components/ThemeToggle";
import { TagLines } from '../constants';
import { DARK_COLORS, LIGHT_COLORS } from "../Configuration";
import { useNavigate } from 'react-router-dom';


const HomeHero = () => {
    const { theme } = useTheme();
  const colors = getColors(theme);
  const navigate = useNavigate();
   const [currentTagline] = useState(
    () => TagLines[Math.floor(Math.random() * TagLines.length)]
  );
  return (
     <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 px-4"
            style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}
          >
            Welcome to
            <span className="block mt-2 sm:mt-4" style={{ color: colors.gold }}>
              Oceans Relief
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto px-4 italic"
            style={{ color: colors.mutedText }}
          >
            {currentTagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <button
              onClick={() => navigate('/relief')}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:scale-105 transition shadow-2xl w-full sm:w-auto"
              style={{
                backgroundColor: colors.gold,
                color: theme === 'dark' ? DARK_COLORS.lightText : LIGHT_COLORS.lightBg
              }}
            >
              Find Relief 🌊
            </button>

            <button
              onClick={() => navigate('/about')}
              className="px-6 sm:px-8 py-3 sm:py-4 backdrop-blur rounded-full font-semibold text-base sm:text-lg hover:opacity-80 transition border w-full sm:w-auto"
              style={{
                backgroundColor: theme === 'dark'
                  ? 'rgba(64, 71, 81, 0.3)'
                  : 'rgba(255, 255, 255, 0.5)',
                color: theme === 'dark' ? colors.lightText : colors.darkText,
                borderColor: colors.borderColor
              }}
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
  )
}

export default HomeHero
