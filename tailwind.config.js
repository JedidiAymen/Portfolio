/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)", ink: "var(--ink)", graphite: "var(--graphite)",
        mist: "var(--mist)", lime: "var(--lime)", kerb: "var(--kerb)", line: "var(--line)",
      },
      fontFamily: {
        display: ["'Host Grotesk'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
