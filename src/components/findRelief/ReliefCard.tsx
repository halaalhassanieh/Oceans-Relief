import { motion } from 'framer-motion';
import { MOOD_COLORS } from '../../Configuration';

type ReliefCardProps = {
  card: {
    id: number;
    title: string;
    text: string;
    mood: 'calm' | 'deep' | 'storm' | 'night';
  };
  index?: number;
  isFlipped: boolean;
  onFlip: () => void;
  colors: {
    cardBg: string;
    borderColor: string;
    mutedText: string;
    lightText: string;
    darkText: string;
    gold: string;
  };
  theme: 'dark' | 'light';
};

const ReliefCard = ({ card, isFlipped, onFlip, colors, theme }: ReliefCardProps) => {
  // Gradient backgrounds (cycled)
  const cardStyles = [
    { gradient: 'linear-gradient(135deg, rgba(137, 111, 61, 0.15), rgba(64, 71, 81, 0.15))' },
    { gradient: 'linear-gradient(135deg, rgba(64, 71, 81, 0.15), rgba(16, 33, 52, 0.15))' },
    { gradient: 'linear-gradient(135deg, rgba(16, 33, 52, 0.15), rgba(137, 111, 61, 0.15))' },
    { gradient: 'linear-gradient(135deg, rgba(137, 111, 61, 0.15), rgba(26, 41, 63, 0.15))' },
  ];
  const style = cardStyles[card.id % cardStyles.length];

  // Mood Icons
  const moodIcons: Record<string, string> = {
    calm: '☀️',
    deep: '🌀',
    storm: '⛈️',
    night: '🌙',
  };

  const moodColor = MOOD_COLORS[card.mood] || {
    bg: colors.cardBg,
    border: colors.borderColor,
    text: colors.mutedText,
  };

  return (
    <motion.div
      onClick={onFlip}
      className="relative h-64 cursor-pointer group"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border-2 backdrop-blur flex flex-col items-center justify-center p-6 group-hover:border-opacity-100 transition-all"
          style={{
            backfaceVisibility: 'hidden',
            background: style.gradient,
            borderColor: colors.borderColor,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }}
        >
          <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
            {moodIcons[card.mood]}
          </div>
          <div
            className="text-xs font-semibold uppercase tracking-wider text-center"
            style={{ color: colors.mutedText }}
          >
            Tap to Reveal a message for you
          </div>

          {/* Decorative Wave */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 opacity-10"
            style={{
              background:
                'repeating-linear-gradient(90deg, transparent, transparent 10px, currentColor 10px, currentColor 20px)',
              clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
              color: colors.gold,
            }}
          />
        </div>

        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl border backdrop-blur p-6 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: colors.cardBg,
            borderColor: colors.borderColor,
            borderLeftWidth: 4,
            borderLeftColor: moodColor.text,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          <h3
            className="text-lg font-bold mb-3"
            style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}
          >
            {card.title}
          </h3>
          <p className="text-sm leading-relaxed grow" style={{ color: colors.mutedText }}>
            {card.text}
          </p>
          <div
            className="mt-3 inline-block self-start px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: moodColor.bg,
              color: moodColor.text,
            }}
          >
            {card.mood}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReliefCard;
