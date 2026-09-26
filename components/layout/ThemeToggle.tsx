"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentTheme = document.documentElement.getAttribute("data-theme") as "dark" | "light";
    if (currentTheme === "light" || currentTheme === "dark") {
      setTheme(currentTheme);
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = isDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (e) {
      console.warn("Unable to save theme preference to localStorage", e);
    }
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-8 h-8 rounded-md border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] flex items-center justify-center text-[var(--text-muted)] opacity-50",
          className
        )}
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} theme`}
      className={cn(
        "w-8 h-8 rounded-md border border-[var(--border-color)] hover:border-[var(--border-hover)] bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors",
        className
      )}
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-[var(--warning-indicator)]" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--accent-color)]" />
      )}
    </button>
  );
};
