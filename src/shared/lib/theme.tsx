"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "workifind.theme";

/**
 * Runs before first paint, ahead of hydration, so the page never renders in
 * the wrong theme and flashes. Inlined into <head> by the root layout; kept as
 * a string because it has to execute synchronously, which a React component
 * cannot do.
 *
 * Mirrors `resolve` below — if the rules here and there disagree, the class
 * set at boot gets corrected on hydration and the flash comes back.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = stored === "dark" || ((!stored || stored === "system") && prefersDark);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (e) {}
})();
`;

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolve(theme: Theme) {
  return theme === "dark" || (theme === "system" && systemPrefersDark());
}

function apply(theme: Theme) {
  const dark = resolve(theme);
  document.documentElement.classList.toggle("dark", dark);
  // Tells the browser to theme its own surfaces — form controls, scrollbars —
  // which otherwise stay light against a dark page.
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  /** What `theme` currently evaluates to, with "system" already resolved. */
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Starts at "system" on both server and client so the first client render
  // matches the server's markup; the real value is read in the effect below.
  // The inline script has already applied the correct class by then, so this
  // never shows as a flash.
  const [theme, setThemeState] = useState<Theme>("system");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const initial: Theme =
      stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : "system";

    setThemeState(initial);
    setIsDark(resolve(initial));
  }, []);

  // Only "system" tracks the OS; an explicit choice must survive the user
  // flipping their OS theme.
  useEffect(() => {
    if (theme !== "system") return;

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      apply("system");
      setIsDark(systemPrefersDark());
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    apply(next);
    setThemeState(next);
    setIsDark(resolve(next));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
