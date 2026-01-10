
import { motion } from 'framer-motion';
import { TagLines } from '../../constants';





const ReliefHeader = ({ colors, theme }: any) => {
  return (
    <>
      <motion.h1
        className="text-6xl font-bold text-center mb-4"
        style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}
      >
        Find Your <span style={{ color: colors.gold }}>Relief</span>
      </motion.h1>

      <p className="text-center italic mb-4" style={{ color: colors.mutedText }}>
        {TagLines[Math.floor(Math.random() * TagLines.length)]}
      </p>

      <p className="text-center mb-10" style={{ color: colors.mutedText }}>
        Choose a card number and click to reveal your message 🎴
      </p>
    </>
  );
};

export default ReliefHeader;
