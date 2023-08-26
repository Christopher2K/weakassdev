import { defineConfig, defineGlobalStyles } from '@pandacss/dev';
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

export default defineConfig({
  preflight: true,
  globalCss,
  jsxFramework: 'react',

  include: ['./resources/js/**/*.{ts,tsx}'],
  exclude: [],

  outdir: 'styled-system',
  presets: [weakAssDevPreset],
});
