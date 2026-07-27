"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "vemoosc-theme";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Runs before first paint (see `ThemeScript`) so the correct theme is on
 * <html> by the time anything renders — no white flash on a dark-mode load.
 * Kept in sync with the provider below; both read the same storage key.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    // Light is the default: only switch to dark if the visitor explicitly
    // chose it before. A first-time visitor always gets the white theme,
    // regardless of their OS setting.
    var theme = stored === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Read straight from <html>, which THEME_INIT_SCRIPT has already set before
  // paint. On the server there is no document, so fall back to the same
  // default the markup renders with (light) — hydration then corrects it in
  // one pass rather than via a setState-in-effect round trip.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  });

  // Mirror state onto <html> whenever it changes. Safe to run on mount too:
  // the value already matches what the pre-paint script wrote.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    // Freeze transitions for a frame so the swap is instant rather than a
    // staggered cross-fade of every element on the page.
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 80);

    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private browsing / storage disabled — the theme still applies for
        // this session, it just won't be remembered.
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
