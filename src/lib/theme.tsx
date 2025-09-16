import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (next: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'theme';

function getSystemPrefersDarkTheme(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function readStoredTheme(): Theme | null {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (raw === 'light' || raw === 'dark') return raw;
    return null;
  } catch {
    return null;
  }
}

function writeStoredTheme(theme: Theme): void {
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, theme);
  } catch(e) {
    console.error('Could not write theme', e)
  }
}

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const initialTheme = useMemo<Theme>(() => readStoredTheme() ?? (getSystemPrefersDarkTheme() ? 'dark' : 'light'), []);
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  
  const setTheme = (next: Theme) => {
    setThemeState(next);
    writeStoredTheme(next); 
  }

  return <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
}


// Example usage
// In your app root:
// <head>
//   <ThemeScript />
// </head>
// <body>
//   <ThemeProvider>
//     <App />
//   </ThemeProvider>
// </body>

// In a component:
// const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
// <button onClick={toggleTheme}>Toggle theme</button>
