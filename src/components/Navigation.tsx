import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme, getColors } from './ThemeToggle';
import ThemeToggle from './ThemeToggle';

function Navigation({ onLogoClick }: { onLogoClick: () => void }) {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b shadow-lg"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(26,41,63,0.95)' : 'rgba(255,255,255,0.95)',
        borderColor: colors.borderColor,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={onLogoClick}
            className="shrink-0 cursor-pointer hover:opacity-80 transition"
          >
            <div
              className="text-xl sm:text-2xl font-bold"
              style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}
            >
              Oceans Relief
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              to="/"
              className="transition font-medium text-sm xl:text-base"
              style={{
                color: isActive('/') ? colors.gold : colors.mutedText,
                fontWeight: isActive('/') ? 600 : 500,
              }}
            >
              Home
            </Link>
            <Link
              to="/relief"
              className="transition font-medium text-sm xl:text-base"
              style={{
                color: isActive('/relief') ? colors.gold : colors.mutedText,
                fontWeight: isActive('/relief') ? 600 : 500,
              }}
            >
              Find Relief
            </Link>
            <Link
              to="/about"
              className="transition font-medium text-sm xl:text-base"
              style={{
                color: isActive('/about') ? colors.gold : colors.mutedText,
                fontWeight: isActive('/about') ? 600 : 500,
              }}
            >
              About & Contact
            </Link>

            <ThemeToggle />
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-lg transition"
              style={{ color: theme === 'dark' ? colors.lightText : colors.darkText }}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t"
              style={{ borderColor: colors.borderColor }}
            >
              <div className="py-4 space-y-3">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 rounded-lg transition font-medium"
                  style={{ color: isActive('/') ? colors.gold : colors.mutedText }}
                >
                  Home
                </Link>
                <Link
                  to="/relief"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 rounded-lg transition font-medium"
                  style={{ color: isActive('/relief') ? colors.gold : colors.mutedText }}
                >
                  Find Relief
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 rounded-lg transition font-medium"
                  style={{ color: isActive('/about') ? colors.gold : colors.mutedText }}
                >
                  About & Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navigation;
