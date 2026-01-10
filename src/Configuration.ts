
export const DARK_COLORS = {
  darkNavy: '#1a293f',
  mediumNavy: '#404751',
  lightNavy: '#102134',
  gold: '#896f3d',
  lightText: '#ffffff',
  darkText: '#1a293f',
  mutedText: 'rgba(255, 255, 255, 0.7)',
  cardBg: 'rgba(64, 71, 81, 0.2)',
  borderColor: 'rgba(137, 111, 61, 0.2)',
} as const;

export const LIGHT_COLORS = {
  lightBg: '#f5f7fa',
  lighterBg: '#ffffff',
  mediumBg: '#e8ecf1',
  gold: '#896f3d',
  lightText: '#ffffff',
  darkText: '#1a293f',
  mutedText: 'rgba(26, 41, 63, 0.7)',
  cardBg: 'rgba(255, 255, 255, 0.9)',
  borderColor: 'rgba(137, 111, 61, 0.15)',
} as const;

export const PAGE_TRANSITIONS = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }
} as const;

export const FADE_ANIMATION_CONFIG = {
  duration: 1.2,
  ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
  yDistance: -100,
} as const;

export const MOOD_COLORS = {
   calm: { bg: 'rgba(137, 111, 61, 0.1)', border: 'rgba(137, 111, 61, 0.3)', text: '#896f3d' },
  deep: { bg: 'rgba(64, 71, 81, 0.2)', border: 'rgba(64, 71, 81, 0.4)', text: '#404751' },
  storm: { bg: 'rgba(26, 41, 63, 0.2)', border: 'rgba(26, 41, 63, 0.4)', text: '#1a293f' },
  night: { bg: 'rgba(16, 33, 52, 0.2)', border: 'rgba(16, 33, 52, 0.4)', text: '#102134' },
};