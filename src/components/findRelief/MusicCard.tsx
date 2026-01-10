
import { motion } from "framer-motion";

import { DARK_COLORS, LIGHT_COLORS, MOOD_COLORS } from "../../Configuration";
import type { MusicSuggestion } from "../../constants";
import type { ThemeMode } from "../../types";





// ============================================================================
// COMPONENT: Music Card
// ============================================================================

const MusicCard: React.FC<{
  music: MusicSuggestion;
  isCenter: boolean;
  isFlipped: boolean;
  onFlip: (id: number) => void;
  theme: ThemeMode;
  colors: typeof DARK_COLORS | typeof LIGHT_COLORS;
}> = ({ music, isCenter, isFlipped, onFlip, theme, colors }) => {
  return (
    <motion.div
      className="relative w-full h-full"
      style={{ transformStyle: 'preserve-3d' }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
      onClick={() => isCenter && !isFlipped && onFlip(music.id)}>
      
      {/* Card Back (Album Cover Style) */}
      <div
        className="absolute inset-0 rounded-3xl border-2 backdrop-blur flex flex-col items-center justify-center p-6"
        style={{
          backfaceVisibility: 'hidden',
          backgroundColor: colors.cardBg,
          borderColor: colors.gold,
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          background: theme === 'dark'
            ? `linear-gradient(135deg, ${DARK_COLORS.mediumNavy}, ${DARK_COLORS.darkNavy})`
            : `linear-gradient(135deg, ${LIGHT_COLORS.mediumBg}, ${LIGHT_COLORS.lightBg})`,
          pointerEvents: isCenter ? 'auto' : 'none'
        }}>
        
        {/* Vinyl Record Icon */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{ 
              background: `radial-gradient(circle, ${colors.gold} 0%, ${DARK_COLORS.darkNavy} 100%)`,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
            <div className="w-10 h-10 rounded-full border-4"
              style={{ 
                borderColor: colors.gold,
                backgroundColor: DARK_COLORS.darkNavy
              }} />
          </div>
        </div>
        
        <div className="text-sm font-semibold uppercase tracking-wider text-center" 
          style={{ color: colors.mutedText }}>
          {isCenter ? 'Tap to Reveal' : 'Click to Select'}
          <br />
          Music Suggestion
        </div>
        
        {/* Mood Emoji */}
        <div className="absolute top-6 right-6 text-2xl">
          {music.mood === 'calm' && '☀️'}
          {music.mood === 'deep' && '🌀'}
          {music.mood === 'storm' && '⛈️'}
          {music.mood === 'night' && '🌙'}
        </div>
        
        {/* Decorative music notes */}
        <div className="absolute bottom-6 left-6 text-2xl opacity-30">🎵</div>
        <div className="absolute top-1/3 left-8 text-xl opacity-20">🎶</div>
        <div className="absolute bottom-1/3 right-8 text-xl opacity-20">🎵</div>
      </div>
      
      {/* Card Front (Song Details) */}
      <div
        className="absolute inset-0 rounded-3xl border backdrop-blur p-6 flex flex-col"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          backgroundColor: colors.cardBg,
          borderColor: colors.borderColor,
          borderTopWidth: 6,
          borderTopColor: MOOD_COLORS[music.mood].text,
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
        }}
        onClick={(e) => e.stopPropagation()}>
        
        {/* Close button */}
        <button
          onClick={() => onFlip(music.id)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition"
          style={{ 
            backgroundColor: colors.cardBg,
            borderWidth: 2,
            borderColor: colors.borderColor
          }}>
          <span style={{ color: colors.mutedText }}>✕</span>
        </button>
        
        {/* Music Icon */}
        <div className="text-5xl mb-4 text-center">🎵</div>
        
        {/* Song Title */}
        <h3 className="text-2xl font-bold mb-2 text-center" 
          style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
          {music.song}
        </h3>
        
        {/* Artist */}
        <p className="text-base mb-4 text-center font-medium" 
          style={{ color: colors.mutedText }}>
          by {music.artist}
        </p>
        
        {/* Featured Line */}
        <div className="grow flex items-center justify-center">
          <p className="text-lg italic leading-relaxed text-center px-2" 
            style={{ color: colors.mutedText }}>
            "{music.line}"
          </p>
        </div>
        
        {/* Mood Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
            style={{ 
              backgroundColor: MOOD_COLORS[music.mood].bg,
              color: MOOD_COLORS[music.mood].text
            }}>
            {music.mood}
          </div>
        </div>
        
        {/* Listen Button */}
        <button
          onClick={() => {
            window.open(music.youtubeLink, '_blank', 'noopener,noreferrer');
          }}
          className="w-full py-3 rounded-full font-bold text-base hover:scale-105 transition shadow-lg"
          style={{ 
            backgroundColor: colors.gold,
            color: theme === 'dark' ? DARK_COLORS.lightText : LIGHT_COLORS.lightBg
          }}>
          Listen on YouTube 🎧
        </button>
      </div>
    </motion.div>
  );
};

export default MusicCard ;