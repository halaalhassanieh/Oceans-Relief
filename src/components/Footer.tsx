
// ============================================================================
// COMPONENT: Footer
// ============================================================================

import { FOOTER_SECTIONS } from "../constants";
import { getColors, useTheme } from "./ThemeToggle";

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  
  return (
    <footer className="border-t backdrop-blur py-12"
      style={{ 
        backgroundColor: theme === 'dark' ? 'rgba(26, 41, 63, 0.6)' : 'rgba(255, 255, 255, 0.6)',
        borderColor: colors.borderColor
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
             Oceans Relief
            </h3>
            <p style={{ color: colors.mutedText }}>Find calm between the waves.</p>
          </div>
          {FOOTER_SECTIONS.map((section, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-4" style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}>
                {section.title}
              </h4>
              <div className="space-y-2">
                {section.links.map((link, j) => (
                  <div key={j} className="cursor-pointer transition hover:opacity-100" style={{ color: colors.mutedText }}>
                    {link}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div> 
        <div className="border-t pt-8 text-center text-sm"
          style={{ borderColor: colors.borderColor, color: colors.mutedText, opacity: 0.6 }}>
          © 2026 OceansRelief. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
