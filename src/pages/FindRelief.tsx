import  { useState, } from 'react';
import { motion } from 'framer-motion';
import { getColors, useTheme } from '../components/ThemeToggle';
import { musicSuggestions, reliefCards, TagLines, type ReliefMood } from '../constants';
import { DARK_COLORS, LIGHT_COLORS, MOOD_COLORS, PAGE_TRANSITIONS } from '../Configuration';




// ============================================================================
// PAGE: Find Relief
// ============================================================================

const FindRelief = () => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const [selectedMood, setSelectedMood] = useState<ReliefMood | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'messages' | 'music'>('messages');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  
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
              
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="relative h-64 cursor-pointer"
                  style={{ perspective: '1000px' }}
                  onClick={() => handleCardFlip(card.id)}>
                  
                  <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}>
                    
                    {/* Card Back (Number) */}
                    <div
                      className="absolute inset-0 rounded-2xl border-2 backdrop-blur flex flex-col items-center justify-center"
                      style={{
                        backfaceVisibility: 'hidden',
                        backgroundColor: colors.cardBg,
                        borderColor: colors.gold,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        background: theme === 'dark'
                          ? `linear-gradient(135deg, ${DARK_COLORS.mediumNavy}, ${DARK_COLORS.darkNavy})`
                          : `linear-gradient(135deg, ${LIGHT_COLORS.mediumBg}, ${LIGHT_COLORS.lightBg})`
                      }}>
                      <div className="text-7xl font-bold mb-3" style={{ color: colors.gold }}>
                        {card.id}
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: colors.mutedText }}>
                        Tap to Reveal
                      </div>
                      <div className="absolute top-4 right-4 text-2xl">
                        {card.mood === 'calm' && '☀️'}
                        {card.mood === 'deep' && '🌀'}
                        {card.mood === 'storm' && '⛈️'}
                        {card.mood === 'night' && '🌙'}
                      </div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMusic.map((music, i) => (
              <motion.div
                key={music.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-2xl border backdrop-blur cursor-pointer"
                style={{ 
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  borderTopWidth: 4,
                  borderTopColor: MOOD_COLORS[music.mood].text
                }}>
                <div className="text-4xl mb-3">🎵</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
                  {music.song}
                </h3>
                <p className="text-sm mb-3" style={{ color: colors.mutedText }}>
                  by {music.artist}
                </p>
                <p className="text-base italic leading-relaxed" style={{ color: colors.mutedText }}>
                  "{music.line}"
                </p>
                <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ 
                    backgroundColor: MOOD_COLORS[music.mood].bg,
                    color: MOOD_COLORS[music.mood].text
                  }}>
                  {music.mood}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
export default FindRelief ;