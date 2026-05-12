"use client";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-xs font-medium tracking-widest uppercase text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
    >
      {theme === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
}
