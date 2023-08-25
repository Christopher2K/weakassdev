import { defineConfig, defineGlobalStyles } from '@pandacss/dev';
import { weakAssDevPreset } from '@weakassdev/config/panda';

const globalCss = defineGlobalStyles({
  body: {
    width: '100%',
    height: '100%',
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
