import { defineConfig, defineGlobalStyles, defineTextStyles } from '@pandacss/dev';
import { weakAssDevPreset } from '@weakassdev/config/panda';

const globalCss = defineGlobalStyles({
  'body, #app': {
    width: '100%',
    height: '100%',
  },
  '#app': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

const textStyles = defineTextStyles({
  h1: {
    value: {
      fontFamily: 'Inter',
      fontWeight: 'semibold',
      fontSize: '6xl',
      lineHeight: '140%',
    },
  },
  h2: {
    value: {
      fontFamily: 'Inter',
      fontWeight: 'medium',
      fontSize: '5xl',
      lineHeight: '140%',
    },
  },
  h3: {
    value: {
      fontFamily: 'Inter',
      fontWeight: 'normal',
      fontSize: '4xl',
      lineHeight: '140%',
    },
  },
  body: {
    value: {
      fontFamily: 'Inter',
      fontWeight: 'normal',
      fontSize: 'md',
    },
  },
  button: {
    value: {
      fontFamily: 'Inter',
      fontWeight: 'bold',
      fontSize: 'sm',
    },
  },
  label: {
    value: {
      fontFamily: 'Inter',
      fontWeight: 'medium',
      fontSize: 'sm',
    },
  },
  caption: {
    value: {
      fontFamily: 'Inter',
      fontWeight: 'bold',
      fontSize: 'xs',
      fontVariant: 'small-caps',
    },
  },
});

export default defineConfig({
  preflight: true,
  globalCss,
  jsxFramework: 'react',

  include: ['./resources/js/**/*.{ts,tsx}'],
  exclude: [],

  theme: {
    extend: {
      textStyles,
    },
  },

  outdir: 'styled-system',
  presets: [weakAssDevPreset],
});
