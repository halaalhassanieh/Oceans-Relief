import { useState } from 'react';
import { motion } from 'framer-motion';
import { getColors, useTheme } from "../components/ThemeToggle";
import { FEATURES, TagLines } from '../constants';
import { DARK_COLORS, LIGHT_COLORS, PAGE_TRANSITIONS } from "../Configuration";
import type { PageType } from "../types";


type HomeProps = {
  onNavigate: (page: PageType) => void;
};

const Home = ({ onNavigate }: HomeProps) => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const [currentTagline] = useState(
    () => TagLines[Math.floor(Math.random() * TagLines.length)]
  );

  return (
    <motion.div
      key="home"
      initial={PAGE_TRANSITIONS.initial}
      animate={PAGE_TRANSITIONS.animate}
      exit={PAGE_TRANSITIONS.exit}
      transition={PAGE_TRANSITIONS.transition}
    >
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
              onClick={() => onNavigate('relief')}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:scale-105 transition shadow-2xl w-full sm:w-auto"
              style={{
                backgroundColor: colors.gold,
                color: theme === 'dark' ? DARK_COLORS.lightText : LIGHT_COLORS.lightBg
              }}
            >
              Find Relief 🌊
            </button>

            <button
              onClick={() => onNavigate('about')}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 px-4"
          style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}
        >
          Our Features
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur border rounded-2xl p-8 transition"
              style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}
              >
                {feature.title}
              </h3>
              <p style={{ color: colors.mutedText }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
