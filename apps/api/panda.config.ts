import { defineConfig, defineGlobalStyles, defineTextStyles, defineTokens } from '@pandacss/dev';
import { weakAssDevPreset } from '@weakassdev/config/panda';

const globalCss = defineGlobalStyles({
  'body, #app': {
    width: '100%',
    height: '100%',
  },
});

const colors = defineTokens.colors({
  whitesmoke: {
    '100': { value: '#F3F5F4' },
    '200': { value: '#F1F3F2' },
    '300': { value: '#E7E8E7' },
    '400': { value: '#D6D8D7' },
    '500': { value: '#C0C2C1' },
    '600': { value: '#A6A7A6' },
    '700': { value: '#888988' },
    '800': { value: '#676868' },
    '900': { value: '#464746' },
    '1000': { value: '#262626' },
  },
});

const DEFAULT_TEXT_SIZE = 18;
const getTextSize = (remSize: number) => `${(DEFAULT_TEXT_SIZE * remSize).toFixed(3)}px`;
const textStyles = defineTextStyles({
  heading1: {
    value: {
      fontFamily: 'Inter',
      lineHeight: '130%',
      fontSize: getTextSize(2.448),
      fontWeight: 'bold',
    },
  },
  heading2: {
    value: {
      fontFamily: 'Inter',
      lineHeight: '130%',
      fontSize: getTextSize(2.074),
      fontWeight: '500',
    },
  },
  heading3: {
    value: {
      fontFamily: 'Inter',
      lineHeight: '130%',
      fontSize: getTextSize(1.728),
      fontWeight: '500',
    },
  },
  heading4: {
    value: {
      fontFamily: 'Inter',
      lineHeight: '130%',
      fontSize: getTextSize(1.44),
      fontWeight: '500',
    },
  },
  heading5: {
    value: {
      fontFamily: 'Inter',
      lineHeight: '130%',
      fontSize: getTextSize(1.2),
      fontWeight: '500',
    },
  },
  body: {
    value: {
      fontFamily: 'Inter',
      lineHeight: '175%',
      fontSize: getTextSize(1),
    },
  },
  bodyImportant: {
    value: {
      fontFamily: 'Inter',
      lineHeight: '175%',
      fontSize: getTextSize(1),
      fontWeight: '500',
    },
  },
  bodyUnderline: {
    value: {
      fontFamily: 'Inter',
      lineHeight: '175%',
      fontSize: getTextSize(1),
      textDecoration: 'underline',
    },
  },
  small: {
    value: {
      fontFamily: 'Inter',
      lineHeight: '175%',
      fontSize: getTextSize(0.833),
    },
  },
  smallImportant: {
    value: {
      fontFamily: 'Inter',
      lineHeight: '175%',
      fontSize: getTextSize(0.833),
      fontWeight: 'bold',
    },
  },
  xsmall: {
    value: {
      fontFamily: 'Inter',
      lineHeight: '175%',
      fontSize: getTextSize(0.684),
    },
  },
});

export default defineConfig({
  importMap: {
    css: '@style/css',
    recipes: '@style/recipes',
    patterns: '@style/patterns',
    jsx: '@style/jsx',
  },
  preflight: true,
  jsxFramework: 'vue',

  globalCss,

  include: ['./**/*.{vue,ts}'],
  exclude: [],

  theme: {
    extend: {
      textStyles,
      tokens: {
        colors,
      },
    },
  },

  outdir: 'styled-system',
  presets: [weakAssDevPreset],
});
