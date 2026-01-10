import './App.css';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeContext } from './components/ThemeToggle';
import { useState } from 'react';
import { DARK_COLORS, LIGHT_COLORS } from './Configuration';

import Home from './pages/Home';
import FindRelief from './pages/FindRelief';
import About from './pages/About';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CoverLayer from './components/CoverLayer';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/relief" element={<FindRelief />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showCover, setShowCover] = useState<boolean>(true);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  const handleEnter = () => {
    setHasEntered(true);
    setShowCover(false);
  };

  const handleLogoClick = () => {
    setShowCover(true);
    setTimeout(() => setHasEntered(false), 50);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <div className="relative min-h-screen overflow-hidden">
          {hasEntered && (
            <div
              className="min-h-screen"
              style={{
                background:
                  theme === 'dark'
                    ? `linear-gradient(135deg, ${DARK_COLORS.darkNavy} 0%, ${DARK_COLORS.lightNavy} 50%, ${DARK_COLORS.darkNavy} 100%)`
                    : `linear-gradient(135deg, ${LIGHT_COLORS.lightBg} 0%, ${LIGHT_COLORS.lighterBg} 50%, ${LIGHT_COLORS.mediumBg} 100%)`,
              }}
            >
              <Navigation onLogoClick={handleLogoClick} />
              <main className="pt-16">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          )}

          {showCover && <CoverLayer onEnter={handleEnter} />}
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
