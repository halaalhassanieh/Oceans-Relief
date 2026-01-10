

export type PageType = 'home' | 'relief' | 'about';
export type ThemeMode = 'dark' | 'light';

export type NavigationProps = {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onLogoClick: () => void;
};