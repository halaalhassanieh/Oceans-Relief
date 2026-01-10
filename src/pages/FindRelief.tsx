import  { useState, } from 'react';
import { motion } from 'framer-motion';
import { getColors, useTheme } from '../components/ThemeToggle';
import { musicSuggestions, reliefCards, TagLines, type ReliefMood } from '../constants';
import { DARK_COLORS, LIGHT_COLORS, MOOD_COLORS, PAGE_TRANSITIONS } from '../Configuration';
import MusicCard from '../components/MusicCard';




// ============================================================================
// PAGE: Find Relief
// ============================================================================

const FindRelief: React.FC = () => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const [selectedMood, setSelectedMood] = useState<ReliefMood | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'messages' | 'music'>('messages');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [selectedMusicCard, setSelectedMusicCard] = useState<number | null>(null);
  
  const filteredCards = selectedMood === 'all' 
    ? reliefCards 
    : reliefCards.filter(card => card.mood === selectedMood);
    
  const filteredMusic = selectedMood === 'all'
    ? musicSuggestions
    : musicSuggestions.filter(music => music.mood === selectedMood);
  
  const moodButtons: { mood: ReliefMood | 'all'; label: string; emoji: string }[] = [
    { mood: 'all', label: 'All', emoji: '🌊' },
    { mood: 'calm', label: 'Calm', emoji: '☀️' },
    { mood: 'deep', label: 'Deep', emoji: '🌀' },
    { mood: 'storm', label: 'Storm', emoji: '⛈️' },
    { mood: 'night', label: 'Night', emoji: '🌙' },
  ];
  
  const handleCardFlip = (cardId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };
  
  return (
    <motion.div
      key="relief"
      initial={PAGE_TRANSITIONS.initial}
      animate={PAGE_TRANSITIONS.animate}
      exit={PAGE_TRANSITIONS.exit}
      transition={PAGE_TRANSITIONS.transition}
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-20">
      
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-center"
          style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
          Find Your <span style={{ color: colors.gold }}>Relief</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-center mb-8 italic"
          style={{ color: colors.mutedText }}>
          {TagLines[Math.floor(Math.random() * TagLines.length)]}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-base text-center mb-12"
          style={{ color: colors.mutedText }}>
          Choose a card number and click to reveal your message 🎴
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('messages')}
            className="px-6 py-3 rounded-full font-semibold transition"
            style={{
              backgroundColor: activeTab === 'messages' ? colors.gold : colors.cardBg,
              color: activeTab === 'messages' 
                ? (theme === 'dark' ? DARK_COLORS.lightText : LIGHT_COLORS.lightBg)
                : colors.mutedText,
              borderWidth: 2,
              borderColor: activeTab === 'messages' ? colors.gold : colors.borderColor
            }}>
            Relief Messages
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className="px-6 py-3 rounded-full font-semibold transition"
            style={{
              backgroundColor: activeTab === 'music' ? colors.gold : colors.cardBg,
              color: activeTab === 'music'
                ? (theme === 'dark' ? DARK_COLORS.lightText : LIGHT_COLORS.lightBg)
                : colors.mutedText,
              borderWidth: 2,
              borderColor: activeTab === 'music' ? colors.gold : colors.borderColor
            }}>
            Music Suggestions
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3 mb-12">
          {moodButtons.map(({ mood, label, emoji }) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className="px-6 py-2 rounded-full font-medium transition hover:scale-105"
              style={{
                backgroundColor: selectedMood === mood ? colors.gold : colors.cardBg,
                color: selectedMood === mood 
                  ? (theme === 'dark' ? DARK_COLORS.lightText : LIGHT_COLORS.lightBg)
                  : colors.mutedText,
                borderWidth: 2,
                borderColor: selectedMood === mood ? colors.gold : colors.borderColor
              }}>
              {emoji} {label}
            </button>
          ))}
        </motion.div>

        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredCards.map((card, i) => {
              const isFlipped = flippedCards.has(card.id);
              const cardStyles = [
                { gradient: 'linear-gradient(135deg, rgba(137, 111, 61, 0.15), rgba(64, 71, 81, 0.15))' },
                { gradient: 'linear-gradient(135deg, rgba(64, 71, 81, 0.15), rgba(16, 33, 52, 0.15))' },
                { gradient: 'linear-gradient(135deg, rgba(16, 33, 52, 0.15), rgba(137, 111, 61, 0.15))' },
                { gradient: 'linear-gradient(135deg, rgba(137, 111, 61, 0.15), rgba(26, 41, 63, 0.15))' },
              ];
              const style = cardStyles[i % cardStyles.length];
              const moodIcons = {
                calm: '☀️',
                deep: '🌀',
                storm: '⛈️',
                night: '🌙'
              };
              
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="relative h-64 cursor-pointer group"
                  style={{ perspective: '1000px' }}
                  onClick={() => handleCardFlip(card.id)}>
                  
                  <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}>
                    
                    {/* Card Back */}
                    <div
                      className="absolute inset-0 rounded-2xl border-2 backdrop-blur flex flex-col items-center justify-center p-6 group-hover:border-opacity-100 transition-all"
                      style={{
                        backfaceVisibility: 'hidden',
                        background: style.gradient,
                        borderColor: colors.borderColor,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                      }}>
                      
                      {/* Mood Icon - Large and Centered */}
                      <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
                        {moodIcons[card.mood]}
                      </div>
                      
                      {/* Tap to Reveal Text */}
                      <div className="text-xs font-semibold uppercase tracking-wider text-center" 
                        style={{ color: colors.mutedText }}>
                        Tap to Reveal
                      </div>
                      
                      {/* Decorative Wave Pattern */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10"
                        style={{
                          background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, currentColor 10px, currentColor 20px)',
                          clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                          color: colors.gold
                        }}
                      />
                    </div>
                    
                    {/* Card Front (Message) */}
                    <div
                      className="absolute inset-0 rounded-2xl border backdrop-blur p-6 flex flex-col"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        backgroundColor: colors.cardBg,
                        borderColor: colors.borderColor,
                        borderLeftWidth: 4,
                        borderLeftColor: MOOD_COLORS[card.mood].text,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                      }}>
                      <h3 className="text-lg font-bold mb-3" style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed grow" style={{ color: colors.mutedText }}>
                        {card.text}
                      </p>
                      <div className="mt-3 inline-block self-start px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                          backgroundColor: MOOD_COLORS[card.mood].bg,
                          color: MOOD_COLORS[card.mood].text
                        }}>
                        {card.mood}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'music' && (
          <div className="max-w-7xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base text-center mb-8"
              style={{ color: colors.mutedText }}>
              Select a card and tap to reveal the song suggestion 🎵
            </motion.p>
            
            {/* Carousel Container */}
            <div className="relative flex items-center justify-center gap-8 py-12 px-4 min-h-125">
              
              {/* Left Arrow Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const currentIndex = filteredMusic.findIndex(m => m.id === (selectedMusicCard || filteredMusic[0].id));
                  const prevIndex = (currentIndex - 1 + filteredMusic.length) % filteredMusic.length;
                  setSelectedMusicCard(filteredMusic[prevIndex].id);
                  setFlippedCards(new Set());
                }}
                className="absolute left-4 z-20 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border-2 hover:shadow-xl transition shadow-lg"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(64, 71, 81, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                  borderColor: colors.gold,
                  color: colors.gold
                }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              {/* Left Card */}
              <motion.div
                key={`left-${filteredMusic[(filteredMusic.findIndex(m => m.id === (selectedMusicCard || filteredMusic[0].id)) - 1 + filteredMusic.length) % filteredMusic.length].id}`}
                initial={{ scale: 0.7, opacity: 0, x: -100, rotateY: -25 }}
                animate={{ 
                  scale: 0.8,
                  opacity: 0.5,
                  x: -40,
                  rotateY: -15
                }}
                exit={{ scale: 0.7, opacity: 0, x: 100, rotateY: 25 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="cursor-pointer"
                style={{ 
                  perspective: '1500px',
                  width: '220px',
                  height: '340px'
                }}
                onClick={() => {
                  const currentIndex = filteredMusic.findIndex(m => m.id === (selectedMusicCard || filteredMusic[0].id));
                  const prevIndex = (currentIndex - 1 + filteredMusic.length) % filteredMusic.length;
                  setSelectedMusicCard(filteredMusic[prevIndex].id);
                  setFlippedCards(new Set());
                }}>
                <MusicCard 
                  music={filteredMusic[(filteredMusic.findIndex(m => m.id === (selectedMusicCard || filteredMusic[0].id)) - 1 + filteredMusic.length) % filteredMusic.length]}
                  isCenter={false}
                  isFlipped={false}
                  onFlip={() => {}}
                  theme={theme}
                  colors={colors}
                />
              </motion.div>
              
              {/* Center Card (Active) */}
              <motion.div
                key={`center-${filteredMusic[filteredMusic.findIndex(m => m.id === (selectedMusicCard || filteredMusic[0].id))].id}`}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                  x: 0,
                  rotateY: 0
                }}
                exit={{ scale: 0.8, opacity: 0.5 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="cursor-pointer z-10"
                style={{ 
                  perspective: '1500px',
                  width: '280px',
                  height: '420px'
                }}>
                <MusicCard 
                  music={filteredMusic[filteredMusic.findIndex(m => m.id === (selectedMusicCard || filteredMusic[0].id))]}
                  isCenter={true}
                  isFlipped={flippedCards.has((selectedMusicCard || filteredMusic[0].id) + 1000)}
                  onFlip={(id) => handleCardFlip(id + 1000)}
                  theme={theme}
                  colors={colors}
                />
              </motion.div>
              
              {/* Right Card */}
              <motion.div
                key={`right-${filteredMusic[(filteredMusic.findIndex(m => m.id === (selectedMusicCard || filteredMusic[0].id)) + 1) % filteredMusic.length].id}`}
                initial={{ scale: 0.7, opacity: 0, x: 100, rotateY: 25 }}
                animate={{ 
                  scale: 0.8,
                  opacity: 0.5,
                  x: 40,
                  rotateY: 15
                }}
                exit={{ scale: 0.7, opacity: 0, x: -100, rotateY: -25 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="cursor-pointer"
                style={{ 
                  perspective: '1500px',
                  width: '220px',
                  height: '340px'
                }}
                onClick={() => {
                  const currentIndex = filteredMusic.findIndex(m => m.id === (selectedMusicCard || filteredMusic[0].id));
                  const nextIndex = (currentIndex + 1) % filteredMusic.length;
                  setSelectedMusicCard(filteredMusic[nextIndex].id);
                  setFlippedCards(new Set());
                }}>
                <MusicCard 
                  music={filteredMusic[(filteredMusic.findIndex(m => m.id === (selectedMusicCard || filteredMusic[0].id)) + 1) % filteredMusic.length]}
                  isCenter={false}
                  isFlipped={false}
                  onFlip={() => {}}
                  theme={theme}
                  colors={colors}
                />
              </motion.div>
              
              {/* Right Arrow Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const currentIndex = filteredMusic.findIndex(m => m.id === (selectedMusicCard || filteredMusic[0].id));
                  const nextIndex = (currentIndex + 1) % filteredMusic.length;
                  setSelectedMusicCard(filteredMusic[nextIndex].id);
                  setFlippedCards(new Set());
                }}
                className="absolute right-4 z-20 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border-2 hover:shadow-xl transition shadow-lg"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(64, 71, 81, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                  borderColor: colors.gold,
                  color: colors.gold
                }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {filteredMusic.map((music) => (
                <button
                  key={music.id}
                  onClick={() => {
                    setSelectedMusicCard(music.id);
                    setFlippedCards(new Set());
                  }}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: (selectedMusicCard || filteredMusic[0].id) === music.id ? colors.gold : colors.mutedText,
                    opacity: (selectedMusicCard || filteredMusic[0].id) === music.id ? 1 : 0.3,
                    transform: (selectedMusicCard || filteredMusic[0].id) === music.id ? 'scale(1.5)' : 'scale(1)'
                  }}
                />
              ))}
            </div>
            
            {/* Navigation Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-6 text-sm"
              style={{ color: colors.mutedText }}>
              Use arrows or click side cards to navigate • Tap center card to reveal
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FindRelief ;