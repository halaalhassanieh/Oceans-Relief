
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { getColors, useTheme } from '../components/ThemeToggle';
import { DARK_COLORS, LIGHT_COLORS, PAGE_TRANSITIONS } from '../Configuration';




// ============================================================================
// PAGE: About & Contact
// ============================================================================

const About: React.FC = () => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const [message, setMessage] = useState('');
  const [isReleasing, setIsReleasing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleRelease = () => {
    if (message.trim()) {
      setIsReleasing(true);
      setTimeout(() => {
        setMessage('');
        setIsReleasing(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }, 1000);
    }
  };
  
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
          About <span style={{ color: colors.gold }}>Oceans Relief</span>
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

        {/* Release Your Emotions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16 p-8 sm:p-12 rounded-3xl border backdrop-blur"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center" 
            style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
            Release Your Emotions 🌊
          </h2>
          
          <p className="text-center mb-8" style={{ color: colors.mutedText }}>
            Write down what's on your mind. Let it go into the ocean.
            <br />
            Your message will disappear, taking your worries with it.
          </p>
          
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-2xl font-semibold" style={{ color: colors.gold }}>
                  Released to the ocean
                </p>
                <p className="text-sm mt-2" style={{ color: colors.mutedText }}>
                  Your emotions are floating away like driftwood...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <motion.textarea
                  animate={isReleasing ? { 
                    opacity: [1, 0.5, 0],
                    y: [0, -20, -50],
                    scale: [1, 0.95, 0.9]
                  } : {}}
                  transition={{ duration: 1 }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your thoughts here... Let them flow like water..."
                  className="w-full h-48 p-6 rounded-2xl border-2 backdrop-blur resize-none focus:outline-none focus:border-opacity-100 transition-all text-lg"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(64, 71, 81, 0.3)' : 'rgba(255, 255, 255, 0.5)',
                    borderColor: colors.borderColor,
                    color: theme === 'dark' ? colors.lightText : colors.darkText
                  }}
                />
                
                <div className="text-center mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRelease}
                    disabled={!message.trim() || isReleasing}
                    className="px-10 py-4 rounded-full font-bold text-lg shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ 
                      backgroundColor: colors.gold,
                      color: theme === 'dark' ? DARK_COLORS.lightText : LIGHT_COLORS.lightBg
                    }}>
                    {isReleasing ? 'Releasing...' : 'Release to the Ocean 🌊'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="p-8 sm:p-12 rounded-3xl border backdrop-blur"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" 
            style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
            Get In Touch
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About ;