
import './App.css'
import { useState } from 'react';
import {  AnimatePresence } from 'framer-motion';
import type { PageType, ThemeMode } from './types';
import { ThemeContext } from './components/ThemeToggle';
import { DARK_COLORS, LIGHT_COLORS } from './Configuration';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import FindRelief from './pages/FindRelief';
import About from './pages/About';
import Footer from './components/Footer';
import CoverLayer from './components/CoverLayer';


 function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [showCover, setShowCover] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  
  const handleEnter = (): void => {
    setHasEntered(true);
    setShowCover(false);
  };
  
  const handleLogoClick = (): void => {
    setShowCover(true);
    setTimeout(() => {
      setHasEntered(false);
      setCurrentPage('home');
    }, 50);
  };
  
  const handleNavigate = (page: PageType): void => {
    setCurrentPage(page);
  };
  
  const toggleTheme = (): void => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="relative min-h-screen overflow-hidden">
        {hasEntered ? (
          <div className="min-h-screen"
            style={{ 
              background: theme === 'dark'
                ? `linear-gradient(135deg, ${DARK_COLORS.darkNavy} 0%, ${DARK_COLORS.lightNavy} 50%, ${DARK_COLORS.darkNavy} 100%)`
                : `linear-gradient(135deg, ${LIGHT_COLORS.lightBg} 0%, ${LIGHT_COLORS.lighterBg} 50%, ${LIGHT_COLORS.mediumBg} 100%)`
            }}>
            <Navigation currentPage={currentPage} onNavigate={handleNavigate} onLogoClick={handleLogoClick} />
            <main className="pt-16">
              <AnimatePresence mode="wait">
                {currentPage === 'home' && <Home key="home" onNavigate={handleNavigate} />}
                {currentPage === 'relief' && <FindRelief key="relief" />}
                {currentPage === 'about' && <About key="about" />}
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        ) : null}
        
        <AnimatePresence>
          {showCover && <CoverLayer onEnter={handleEnter} />}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}
export default App ;
