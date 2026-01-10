import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import MusicCard from './MusicCard';

interface Props {
  musicList: any[];
  colors: any;
  theme: string;
}

type Position = 'left' | 'center' | 'right';

const MusicCarousel: React.FC<Props> = ({ musicList, colors, theme }) => {
  const [activeId, setActiveId] = useState<number>(musicList[0]?.id);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
      setIsTablet(w >= 640 && w < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeIndex = useMemo(
    () => musicList.findIndex(m => m.id === activeId),
    [activeId, musicList]
  );

  const prevIndex = (activeIndex - 1 + musicList.length) % musicList.length;
  const nextIndex = (activeIndex + 1) % musicList.length;

  const goNext = () => {
    setActiveId(musicList[nextIndex].id);
    setFlipped(new Set());
  };
  const goPrev = () => {
    setActiveId(musicList[prevIndex].id);
    setFlipped(new Set());
  };
  const toggleFlip = (id: number) => {
    const next = new Set(flipped);
    next.has(id) ? next.delete(id) : next.add(id);
    setFlipped(next);
  };

  // Sizes based on screen
  const centerSize = isMobile
    ? { w: 240, h: 360 }
    : isTablet
    ? { w: 260, h: 390 }
    : { w: 280, h: 420 };

  const sideSize = isTablet
    ? { w: 200, h: 320 }
    : { w: 220, h: 340 };

  return (
    <div className="max-w-7xl mx-auto">

      <p className="text-center mb-8" style={{ color: colors.mutedText }}>
        Select a card and tap to reveal the song suggestion 🎵
      </p>

      <div className="relative flex items-center justify-center py-12 min-h-120 overflow-hidden">

        {/* Left arrow - Always visible */}
        <Arrow direction="left" onClick={goPrev} colors={colors} theme={theme} />

        <div className="flex items-center justify-center gap-6">

          {/* Left card */}
          {!isMobile && (
            <CarouselCard
              key={`left-${musicList[prevIndex].id}`}
              music={musicList[prevIndex]}
              size={sideSize}
              position="left"
              onClick={goPrev}
              colors={colors}
              theme={theme}
            />
          )}

          {/* Center card */}
          <CarouselCard
            key={`center-${musicList[activeIndex].id}`}
            music={musicList[activeIndex]}
            size={centerSize}
            position="center"
            isCenter
            isFlipped={flipped.has(musicList[activeIndex].id)}
            onFlip={() => toggleFlip(musicList[activeIndex].id)}
            colors={colors}
            theme={theme}
          />

          {/* Right card */}
          {!isMobile && (
            <CarouselCard
              key={`right-${musicList[nextIndex].id}`}
              music={musicList[nextIndex]}
              size={sideSize}
              position="right"
              onClick={goNext}
              colors={colors}
              theme={theme}
            />
          )}

        </div>

        {/* Right arrow - Always visible */}
        <Arrow direction="right" onClick={goNext} colors={colors} theme={theme} />

      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {musicList.map(m => (
          <button
            key={m.id}
            onClick={() => {
              setActiveId(m.id);
              setFlipped(new Set());
            }}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: activeId === m.id ? colors.gold : colors.mutedText,
              opacity: activeId === m.id ? 1 : 0.3,
              transform: activeId === m.id ? 'scale(1.5)' : 'scale(1)'
            }}
          />
        ))}
      </div>

      <p className="text-center mt-4 text-sm" style={{ color: colors.mutedText }}>
        Swipe arrows or tap side cards • Tap center to reveal
      </p>

    </div>
  );
};

export default MusicCarousel;

// =======================================
// Sub Components
// =======================================
const Arrow = ({ direction, onClick, colors, theme }: any) => {
  const isLeft = direction === 'left';
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`absolute ${isLeft ? 'left-4' : 'right-4'} z-20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border-2 shadow-lg`}
      style={{
        backgroundColor: theme === 'dark'
          ? 'rgba(64,71,81,0.8)'
          : 'rgba(255,255,255,0.9)',
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

const CarouselCard = ({
  music,
  size,
  position = 'center' as Position,
  isCenter = false,
  isFlipped = false,
  onFlip,
  onClick,
  colors,
  theme
}: any) => {
  const variants: Record<Position, any> = {
    left: { scale: 0.8, opacity: 0.5, x: -40, rotateY: -15 },
    center: { scale: 1, opacity: 1, x: 0, rotateY: 0 },
    right: { scale: 0.8, opacity: 0.5, x: 40, rotateY: 15 }
  };

  const safePosition: Position = (position === 'left' || position === 'center' || position === 'right')
    ? position
    : 'center';

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={variants[safePosition]}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      style={{
        width: size.w,
        height: size.h,
        perspective: '1500px',
        cursor: 'pointer',
        zIndex: isCenter ? 10 : 1
      }}
      onClick={onClick}
    >
      <MusicCard
        music={music}
        isCenter={isCenter}
        isFlipped={isFlipped}
        onFlip={onFlip}
        colors={colors}
        theme={theme}
      />
    </motion.div>
  );
};
