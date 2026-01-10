// MoodFilter.tsx
import { DARK_COLORS, LIGHT_COLORS } from '../../Configuration';

const moods = [
  { mood: 'all', label: 'All', emoji: '🌊' },
  { mood: 'calm', label: 'Calm', emoji: '☀️' },
  { mood: 'deep', label: 'Deep', emoji: '🌀' },
  { mood: 'storm', label: 'Storm', emoji: '⛈️' },
  { mood: 'night', label: 'Night', emoji: '🌙' },
];

const MoodFilter = ({ selectedMood, onChange, colors, theme }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {moods.map(({ mood, label, emoji }) => (
        <button
          key={mood}
          onClick={() => onChange(mood)}
          className="px-6 py-2 rounded-full font-medium transition"
          style={{
            backgroundColor: selectedMood === mood ? colors.gold : colors.cardBg,
            color:
              selectedMood === mood
                ? theme === 'dark'
                  ? DARK_COLORS.lightText
                  : LIGHT_COLORS.lightBg
                : colors.mutedText,
            border: `2px solid ${selectedMood === mood ? colors.gold : colors.borderColor}`
          }}
        >
          {emoji} {label}
        </button>
      ))}
    </div>
  );
};

export default MoodFilter;
