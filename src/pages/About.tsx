
import { motion } from 'framer-motion';




// ============================================================================
// PAGE: About & Contact
// ============================================================================

import { getColors, useTheme } from "../components/ThemeToggle";
import { DARK_COLORS, LIGHT_COLORS, PAGE_TRANSITIONS } from '../Configuration';

const About = () => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  
  return (
    <motion.div
      key="about"
      initial={PAGE_TRANSITIONS.initial}
      animate={PAGE_TRANSITIONS.animate}
      exit={PAGE_TRANSITIONS.exit}
      transition={PAGE_TRANSITIONS.transition}
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-20">
      
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-center"
          style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
          About <span style={{ color: colors.gold }}> Oceans Relief</span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl mb-16 max-w-3xl mx-auto space-y-6"
          style={{ color: colors.mutedText }}>
          <p>
             Oceans Relief is your digital sanctuary for finding peace in life's turbulent moments. 
            Like the ocean's rhythmic waves, we believe calm can be found even in the storm.
          </p>
          <p>
            Through carefully curated relief messages and soothing music, we help you navigate 
            difficult emotions and find your center. Each wave of feeling will pass—we're here 
            to help you float through them.
          </p>
          <p className="italic" style={{ color: colors.gold }}>
            "Find calm between the waves"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-8 sm:p-12 rounded-3xl border backdrop-blur"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" 
            style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
            Get In Touch
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-semibold mb-2" style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
                Email
              </h3>
              <p style={{ color: colors.mutedText }}>hello@OceansRelief.com</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-semibold mb-2" style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
                Support
              </h3>
              <p style={{ color: colors.mutedText }}>Available 24/7</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🌊</div>
              <h3 className="font-semibold mb-2" style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
                Community
              </h3>
              <p style={{ color: colors.mutedText }}>Join our journey</p>
            </div>
          </div>

          <div className="text-center">
            <button 
              className="px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition shadow-2xl"
              style={{ 
                backgroundColor: colors.gold,
                color: theme === 'dark' ? DARK_COLORS.lightText : LIGHT_COLORS.lightBg
              }}>
              Send Message 💌
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default About ;