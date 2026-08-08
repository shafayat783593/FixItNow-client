"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggleButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // avoid hydration mismatch — resolvedTheme is only reliable after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-16 rounded-full border border-border bg-secondary" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex h-9 w-16 items-center rounded-full border border-border bg-secondary px-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* background icons */}
      <Sun
        className={`absolute left-1.5 h-4 w-4 text-accent transition-opacity duration-300 ${
          isDark ? "opacity-40" : "opacity-0"
        }`}
      />
      <Moon
        className={`absolute right-1.5 h-4 w-4 text-accent transition-opacity duration-300 ${
          isDark ? "opacity-0" : "opacity-40"
        }`}
      />

      {/* sliding knob */}
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-300 ease-out ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon className="h-4 w-4" strokeWidth={2} />
        ) : (
          <Sun className="h-4 w-4" strokeWidth={2} />
        )}
      </span>
    </button>
  );
}