import { Link } from "react-router-dom";
import { FOOTER_SECTIONS, type FooterSection } from "../constants";
import { getColors, useTheme } from "./ThemeToggle";

function Footer() {
  const { theme } = useTheme();
  const colors = getColors(theme);

  return (
    <footer
      className="border-t backdrop-blur py-2 sm:py-3"
      style={{
        backgroundColor:
          theme === "dark"
            ? "rgba(26, 41, 63, 0.5)"
            : "rgba(255, 255, 255, 0.5)",
        borderColor: colors.borderColor,
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-2 sm:mb-3">
          {/* Logo / Branding */}
          <div>
            <h3
              className="text-xs sm:text-sm font-semibold mb-1"
              style={{ color: theme === "dark" ? colors.lightText : colors.darkText }}
            >
              Oceans Relief
            </h3>
            <p className="text-[11px] sm:text-xs" style={{ color: colors.mutedText }}>
              Find calm between the waves.
            </p>
          </div>

          {/* Footer Sections */}
          {FOOTER_SECTIONS.map((section: FooterSection, i) => (
            <div key={i}>
              <h4
                className="text-xs sm:text-sm font-semibold mb-1"
                style={{ color: theme === "dark" ? colors.lightText : colors.darkText }}
              >
                {section.title}
              </h4>

              <div className="space-y-1">
                {section.links.map((link, j) => {
                  const isExternal = link.url.startsWith("http");
                  return isExternal ? (
                    <a
                      key={j}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] sm:text-xs cursor-pointer transition hover:opacity-100 block"
                      style={{ color: colors.mutedText, opacity: 0.8 }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={j}
                      to={link.url}
                      className="text-[10px] sm:text-xs cursor-pointer transition hover:opacity-100 block"
                      style={{ color: colors.mutedText, opacity: 0.8 }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div
          className="border-t pt-1 sm:pt-2 text-center text-[10px] sm:text-[11px]"
          style={{
            borderColor: colors.borderColor,
            color: colors.mutedText,
            opacity: 0.6,
          }}
        >
          © 2026 OceansRelief. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
