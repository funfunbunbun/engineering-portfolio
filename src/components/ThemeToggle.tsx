import { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme === "dark",
  );
  return (
    <button
      className="theme-toggle"
      aria-label="Dark mode"
      aria-pressed={dark}
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.dataset.theme = next ? "dark" : "light";
        try {
          localStorage.setItem("portfolio-theme", next ? "dark" : "light");
        } catch {
          /* Optional preference. */
        }
        window.dispatchEvent(new Event("portfolio-theme"));
      }}
    >
      <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
      <span>{dark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
