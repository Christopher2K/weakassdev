import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
  html: {
    width: '100%',
    height: '100%',
  },
  body: {
    display: 'grid',
    gridTemplateColumns: {
      base: '72px 1fr',
      md: '280px 1fr',
    },
    margin: '0 auto',
    maxWidth: '1100px',
    height: '100%',
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  globalCss,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
