import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MusicCard from './MusicCard';
import { DARK_COLORS, LIGHT_COLORS } from '../../Configuration';
import type { ThemeMode } from '../../types';
import type { MusicSuggestion } from '../../constants';

interface MusicCarouselProps {
  musicList: MusicSuggestion[];
  theme: ThemeMode;
  colors: typeof DARK_COLORS | typeof LIGHT_COLORS;
}

const MusicCarousel: React.FC<MusicCarouselProps> = ({ musicList, theme, colors }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
// إضافة حالة جديدة لمؤشر النقاط
const [activeDot, setActiveDot] = useState(0);

// عند الانتقال للسهم التالي
const goNext = () => {
  setActiveIndex(nextIndex);
  setActiveDot((prev) => (prev + 1) % 3); // ينقل اللون إلى النقطة التالية
};

// عند الانتقال للسهم السابق
const goPrev = () => {
  setActiveIndex(prevIndex);
  setActiveDot((prev) => (prev + 2) % 3); // تتحرك عكس الاتجاه
};

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prevIndex = (activeIndex - 1 + musicList.length) % musicList.length;
  const nextIndex = (activeIndex + 1) % musicList.length;


  const toggleFlip = (id: number) => {
    const next = new Set(flipped);
    next.has(id) ? next.delete(id) : next.add(id);
    setFlipped(next);
  };

  // Responsive sizes
  const centerSize = isMobile
    ? { w: 200, h: 300 }
    : { w: 280, h: 420 };
  const sideSize = isMobile
    ? { w: 160, h: 240 }
    : { w: 220, h: 340 };

  // Positions for smooth scaling
  const leftX = isMobile ? -120 : -140;
  const rightX = isMobile ? 120 : 140;

  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-center mb-6" style={{ color: colors.mutedText }}>
        Tap the center card to reveal a music suggestion 🎵
      </p>

      <div className="relative flex items-center justify-center py-10 sm:min-h-120 min-h-90 ">
        {/* Left Arrow */}
        <Arrow direction="left" onClick={goPrev} colors={colors} theme={theme} />

        <div className="flex items-center justify-center gap-6 relative">
          {/* Left Card */}
          <motion.div
            key={musicList[prevIndex].id}
            initial={{ x: -200, scale: 0.7, opacity: 0.5 }}
            animate={{ x: leftX, scale: 0.85, opacity: 0.6 }}
            transition={{ type: 'spring', stiffness: 150, damping: 25 }}
            style={{ width: sideSize.w, height: sideSize.h }}
            className='flex items-center justify-center'
          >
            <MusicCard
              music={musicList[prevIndex]}
              isCenter={false}
              isFlipped={false}
              onFlip={() => {}}
              colors={colors}
              theme={theme}
            />
          </motion.div>

          {/* Center Card */}
          <motion.div
            key={musicList[activeIndex].id}
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 28 }}
            style={{ width: centerSize.w, height: centerSize.h, zIndex: 10 }}
            className='flex items-center justify-center'
          >
            <MusicCard
              music={musicList[activeIndex]}
              isCenter
              isFlipped={flipped.has(musicList[activeIndex].id)}
              onFlip={() => toggleFlip(musicList[activeIndex].id)}
              colors={colors}
              theme={theme}
            />
          </motion.div>

          {/* Right Card */}
          <motion.div
            key={musicList[nextIndex].id}
            initial={{ x: 200, scale: 0.7, opacity: 0.5 }}
            animate={{ x: rightX, scale: 0.85, opacity: 0.6 }}
            transition={{ type: 'spring', stiffness: 150, damping: 25 }}
            style={{ width: sideSize.w, height: sideSize.h }}
            className='flex items-center justify-center'
          >
            <MusicCard
              music={musicList[nextIndex]}
              isCenter={false}
              isFlipped={false}
              onFlip={() => {}}
              colors={colors}
              theme={theme}
            />
          </motion.div>
        </div>

        {/* Right Arrow */}
        <Arrow direction="right" onClick={goNext} colors={colors} theme={theme} />
      </div>

{/* Dots */}
<div className="flex justify-center gap-2 mt-4">
  {[0, 1, 2].map((dotIdx) => (
    <motion.div
      key={dotIdx}
      layout
      className="rounded-full"
      style={{
        width: activeDot === dotIdx ? 12 : 8,
        height: activeDot === dotIdx ? 12 : 8,
        backgroundColor: activeDot === dotIdx ? colors.gold : colors.mutedText,
        opacity: activeDot === dotIdx ? 1 : 0.4,
      }}
      transition={{ type: 'spring', stiffness: 160, damping: 28 }}
    />
  ))}
</div>



      <p className="text-center mt-4 text-sm" style={{ color: colors.mutedText }}>
        Navigate using arrows • Tap center to flip
      </p>
    </div>
  );
};

export default MusicCarousel;

// Arrow component (unchanged, as in your original)
const Arrow = ({
  direction,
  onClick,
  theme,
  colors
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  theme: ThemeMode;
  colors: typeof DARK_COLORS | typeof LIGHT_COLORS;
}) => {
  const isLeft = direction === 'left';
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`absolute ${isLeft ? 'left-1' : 'right-1'} z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border-2 shadow-lg`}
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(64,71,81,0.8)' : 'rgba(255,255,255,0.9)',
        borderColor: colors.gold,
        color: colors.gold
      }}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isLeft ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        )}
      </svg>
    </motion.button>
  );
};
