import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DARK_COLORS, LIGHT_COLORS, MOOD_COLORS } from "../../Configuration";
import type { MusicSuggestion } from "../../constants";
import type { ThemeMode } from "../../types";

type MusicCardProps = {
  music: MusicSuggestion;
  isCenter: boolean;
  isFlipped: boolean;
  onFlip: (id: number) => void;
  theme: ThemeMode;
  colors: typeof DARK_COLORS | typeof LIGHT_COLORS;
};

const MusicCard = ({
  music,
  isCenter,
  isFlipped,
  onFlip,
  theme,
  colors,
}: MusicCardProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // البطاقة الأساسية حسب الريسبونيف
  const cardWidth = isMobile ? 180 : 280;
  const cardHeight = isMobile ? 270 : 420;

  const vinylSize = isMobile ? 60 : 112;
  const vinylInner = isMobile ? 20 : 40;

  const textSize = isMobile ? "text-sm" : "text-2xl";
  const subTextSize = isMobile ? "text-xs" : "text-base";
  const buttonHeight = isMobile ? "py-2 text-sm" : "py-3 text-base";

  return (
    <motion.div
      className="relative flex justify-center items-center "
      style={{
        width: cardWidth,
        height: cardHeight,
        transformStyle: "preserve-3d",
      }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
      onClick={() => isCenter && !isFlipped && onFlip(music.id)}
    >
      {/* Card Back */}
      <div
        className="absolute inset-0 rounded-3xl border-2 backdrop-blur flex flex-col items-center justify-center p-4"
        style={{
          backfaceVisibility: "hidden",
          backgroundColor: colors.cardBg,
          borderColor: colors.gold,
          boxShadow: "0 15px 50px rgba(0,0,0,0.4)",
          background:
            theme === "dark"
              ? `linear-gradient(135deg, ${DARK_COLORS.mediumNavy}, ${DARK_COLORS.darkNavy})`
              : `linear-gradient(135deg, ${LIGHT_COLORS.mediumBg}, ${LIGHT_COLORS.lightBg})`,
          pointerEvents: isCenter ? "auto" : "none",
        }}
      >
        {/* Vinyl */}
        <div
          className="relative mb-4 rounded-full flex items-center justify-center"
          style={{
            width: vinylSize,
            height: vinylSize,
            background: `radial-gradient(circle, ${colors.gold} 0%, ${DARK_COLORS.darkNavy} 100%)`,
            boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="rounded-full border-4"
            style={{
              width: vinylInner,
              height: vinylInner,
              borderColor: colors.gold,
              backgroundColor: DARK_COLORS.darkNavy,
            }}
          />
        </div>

        {/* Text */}
        <div
          className={`font-semibold uppercase tracking-wider text-center ${subTextSize}`}
          style={{ color: colors.mutedText }}
        >
          {isCenter ? "Tap to Reveal" : "Click to Select"}
          <br />
          Music Suggestion
        </div>

        {/* Mood Emoji */}
        <div className="absolute top-3 right-3 text-xl">
          {music.mood === "calm" && "☀️"}
          {music.mood === "deep" && "🌀"}
          {music.mood === "storm" && "⛈️"}
          {music.mood === "night" && "🌙"}
        </div>

        {/* Decorative notes */}
        <div className="absolute bottom-3 left-3 text-xl opacity-30">🎵</div>
        <div className="absolute top-1/3 left-4 text-lg opacity-20">🎶</div>
        <div className="absolute bottom-1/3 right-4 text-lg opacity-20">🎵</div>
      </div>

      {/* Card Front */}
      <div
        className="absolute inset-0 rounded-3xl border backdrop-blur p-4 flex flex-col"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          backgroundColor: colors.cardBg,
          borderColor: colors.borderColor,
          borderTopWidth: 5,
          borderTopColor: MOOD_COLORS[music.mood].text,
          boxShadow: "0 15px 50px rgba(0,0,0,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => onFlip(music.id)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition"
          style={{
            backgroundColor: colors.cardBg,
            borderWidth: 2,
            borderColor: colors.borderColor,
          }}
        >
          <span style={{ color: colors.mutedText }}>✕</span>
        </button>

        <div className={`text-4xl mb-2 text-center`}>🎵</div>

        <h3
          className={`font-bold mb-1 text-center ${textSize}`}
          style={{ color: theme === "dark" ? colors.lightText : colors.darkText }}
        >
          {music.song}
        </h3>

        <p
          className={`mb-2 text-center font-medium ${subTextSize}`}
          style={{ color: colors.mutedText }}
        >
          by {music.artist}
        </p>

        <div className="grow flex items-center justify-center">
          <p
            className={`italic leading-relaxed text-center px-2 ${subTextSize}`}
            style={{ color: colors.mutedText }}
          >
            "{music.line}"
          </p>
        </div>

        <div className="flex justify-center mb-2">
          <div
            className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: MOOD_COLORS[music.mood].bg,
              color: MOOD_COLORS[music.mood].text,
            }}
          >
            {music.mood}
          </div>
        </div>

        <button
          onClick={() => window.open(music.youtubeLink, "_blank", "noopener,noreferrer")}
          className={`w-full rounded-full font-bold hover:scale-105 transition shadow-lg ${buttonHeight}`}
          style={{
            backgroundColor: colors.gold,
            color: theme === "dark" ? DARK_COLORS.lightText : LIGHT_COLORS.lightBg,
          }}
        >
          Listen on YouTube 🎧
        </button>
      </div>
    </motion.div>
  );
};

export default MusicCard;
