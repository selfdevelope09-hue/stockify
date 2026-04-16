module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'trading-green': '#4ade80',
        'trading-red': '#ef4444',
        'trading-bg': '#0a0a0f',
        'trading-card': '#1a1a2e',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
