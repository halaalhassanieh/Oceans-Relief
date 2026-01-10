import { DARK_COLORS, LIGHT_COLORS } from "../../Configuration";

type TabButtonProps = {
  label: string;
  active: boolean;
  theme: string;
  colors: any;
  onClick: () => void;
};

const TabButton = ({ label, active, theme, colors, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className="px-6 py-3 rounded-full font-semibold transition"
    style={{
      backgroundColor: active ? colors.gold : colors.cardBg,
      color: active
        ? theme === 'dark'
          ? DARK_COLORS.lightText
          : LIGHT_COLORS.lightBg
        : colors.mutedText,
      borderWidth: 2,
      borderColor: active ? colors.gold : colors.borderColor
    }}
  >
    {label}
  </button>
);
export default TabButton;