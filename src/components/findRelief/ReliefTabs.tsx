
import { DARK_COLORS, LIGHT_COLORS } from '../../Configuration';






const ReliefTabs = ({ activeTab, onChange, colors, theme }: any) => {
  const renderButton = (key: 'messages' | 'music', label: string) => (
    <button
      onClick={() => onChange(key)}
      className="px-6 py-3 rounded-full font-semibold transition"
      style={{
        backgroundColor: activeTab === key ? colors.gold : colors.cardBg,
        color:
          activeTab === key
            ? theme === 'dark'
              ? DARK_COLORS.lightText
              : LIGHT_COLORS.lightBg
            : colors.mutedText,
        border: `2px solid ${activeTab === key ? colors.gold : colors.borderColor}`
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="flex justify-center gap-4 mb-8">
      {renderButton('messages', 'Relief Messages')}
      {renderButton('music', 'Music Suggestions')}
    </div>
  );
};

export default ReliefTabs;
