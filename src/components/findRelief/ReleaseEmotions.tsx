import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { DARK_COLORS, LIGHT_COLORS } from '../../Configuration';

type ReleaseEmotionsProps = {
  colors: {
    cardBg: string;
    borderColor: string;
    mutedText: string;
    gold: string;
    lightText: string;
    darkText: string;
  };
  theme: 'dark' | 'light';
};

const ReleaseEmotions = ({ colors, theme }: ReleaseEmotionsProps) => {
  const [message, setMessage] = useState('');
  const [isReleasing, setIsReleasing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRelease = () => {
    if (!message.trim()) return;

    setIsReleasing(true);

    setTimeout(() => {
      setMessage('');
      setIsReleasing(false);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="mb-16 p-8 sm:p-12 rounded-3xl border backdrop-blur"
      style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
    >
      <h2
        className="text-3xl sm:text-4xl font-bold mb-4 text-center"
        style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}
      >
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
            className="text-center py-12"
          >
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
            exit={{ opacity: 0 }}
          >
            <motion.textarea
              animate={
                isReleasing
                  ? {
                      opacity: [1, 0.5, 0],
                      y: [0, -20, -50],
                      scale: [1, 0.95, 0.9],
                    }
                  : {}
              }
              transition={{ duration: 1 }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your thoughts here... Let them flow like water..."
              className="w-full h-48 p-6 rounded-2xl border-2 backdrop-blur resize-none focus:outline-none focus:border-opacity-100 transition-all text-lg"
              style={{
                backgroundColor:
                  theme === 'dark'
                    ? 'rgba(64, 71, 81, 0.3)'
                    : 'rgba(255, 255, 255, 0.5)',
                borderColor: colors.borderColor,
                color: theme === 'dark' ? colors.lightText : colors.darkText,
              }}
            />

            <p className="text-center mt-3 mb-8" style={{ color: colors.gold }}>
              POV: You can be a Drama king/Queen if you want to
              <br />
              No one here is gonna judge you :)
            </p>

            <div className="text-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRelease}
                disabled={!message.trim() || isReleasing}
                className="px-10 py-4 rounded-full font-bold text-lg shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: colors.gold,
                  color:
                    theme === 'dark'
                      ? DARK_COLORS.lightText
                      : LIGHT_COLORS.lightBg,
                }}
              >
                {isReleasing ? 'Releasing...' : 'Release to the Ocean 🌊'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReleaseEmotions;
