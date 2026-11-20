/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--c-paper) / <alpha-value>)", ink: "rgb(var(--c-ink) / <alpha-value>)", graphite: "var(--graphite)", mist: "var(--mist)",
        lime: "rgb(var(--c-lime) / <alpha-value>)", kerb: "rgb(var(--c-kerb) / <alpha-value>)", line: "var(--line)",
        bg: "rgb(var(--c-bg) / <alpha-value>)", surface: "rgb(var(--c-surface) / <alpha-value>)", fg: "rgb(var(--c-fg) / <alpha-value>)", muted: "rgb(var(--c-muted) / <alpha-value>)",
        violet: "rgb(var(--c-violet) / <alpha-value>)", cyan: "rgb(var(--c-cyan) / <alpha-value>)", flare: "rgb(var(--c-flare) / <alpha-value>)", gold: "rgb(var(--c-gold) / <alpha-value>)",
      },
      fontFamily: {
        display: ["'Host Grotesk'", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
