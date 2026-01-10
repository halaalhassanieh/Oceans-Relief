import { useState } from 'react';
import { motion } from 'framer-motion';
import { getColors, useTheme } from '../components/ThemeToggle';
import { moodButtons, musicSuggestions, reliefCards, TagLines, type ReliefMood } from '../constants';
import { DARK_COLORS, LIGHT_COLORS, PAGE_TRANSITIONS } from '../Configuration';
import MusicCarousel from '../components/findRelief/MusicCarousel';
import ReliefCard from '../components/findRelief/ReliefCard';
import ReleaseEmotions from '../components/findRelief/ReleaseEmotions';
import TabButton from '../components/findRelief/TapButton';


const FindRelief = () => {
  const { theme } = useTheme();
  const colors = getColors(theme);

  const [selectedMood, setSelectedMood] = useState<ReliefMood | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'messages' | 'music' | 'release'>('messages');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const filteredCards =
    selectedMood === 'all'
      ? reliefCards
      : reliefCards.filter(c => c.mood === selectedMood);

  const filteredMusic =
    selectedMood === 'all'
      ? musicSuggestions
      : musicSuggestions.filter(m => m.mood === selectedMood);

  const handleCardFlip = (cardId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      newSet.has(cardId) ? newSet.delete(cardId) : newSet.add(cardId);
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
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-center"
          style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}
        >
          Find Your <span style={{ color: colors.gold }}>Relief</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-center mb-8 italic"
          style={{ color: colors.mutedText }}
        >
          {TagLines[Math.floor(Math.random() * TagLines.length)]}
        </motion.p>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 mb-8 flex-wrap"
        >
          <TabButton
            label="Relief Messages"
            active={activeTab === 'messages'}
            theme={theme}
            colors={colors}
            onClick={() => setActiveTab('messages')}
          />

          <TabButton
            label="Music Suggestions"
            active={activeTab === 'music'}
            theme={theme}
            colors={colors}
            onClick={() => setActiveTab('music')}
          />

          <TabButton
            label="Release Your Emotions"
            active={activeTab === 'release'}
            theme={theme}
            colors={colors}
            onClick={() => setActiveTab('release')}
          />
        </motion.div>

        {/* Mood Filter */}
        {activeTab !== 'release' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {moodButtons.map(({ mood, label, emoji }) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className="px-6 py-2 rounded-full font-medium transition hover:scale-105"
                style={{
                  backgroundColor: selectedMood === mood ? colors.gold : colors.cardBg,
                  color:
                    selectedMood === mood
                      ? theme === 'dark'
                        ? DARK_COLORS.lightText
                        : LIGHT_COLORS.lightBg
                      : colors.mutedText,
                  borderWidth: 2,
                  borderColor: selectedMood === mood ? colors.gold : colors.borderColor
                }}
              >
                {emoji} {label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Content */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredCards.map((card, i) => (
              <ReliefCard
                key={card.id}
                card={card}
                index={i}
                isFlipped={flippedCards.has(card.id)}
                onFlip={() => handleCardFlip(card.id)}
                colors={colors}
                theme={theme}
              />
            ))}
          </div>
        )}

        {activeTab === 'music' && (
          <MusicCarousel musicList={filteredMusic} colors={colors} theme={theme} />
        )}

        {activeTab === 'release' && (
          <ReleaseEmotions colors={colors} theme={theme} />
        )}
      </div>
    </motion.div>
  );
};

export default FindRelief;
