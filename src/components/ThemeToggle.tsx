"use client";

import { useTheme } from "./ThemeProvider";

/**
 * Sun/moon switch. Both icons are always rendered and cross-faded so the
 * button never changes size, and the label always describes the action the
 * click will perform rather than the current state.
 */
export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      suppressHydrationWarning
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-lg text-foreground transition hover:border-brand hover:text-brand ${className}`}
    >
      <i
        className={`ri-sun-line absolute transition-all duration-300 ${
          isDark ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
        aria-hidden="true"
      />
      <i
        className={`ri-moon-line absolute transition-all duration-300 ${
          isDark ? "scale-50 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
