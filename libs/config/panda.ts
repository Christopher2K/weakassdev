import { defineGlobalStyles, definePreset } from '@pandacss/dev';
import pandaPreset from '@pandacss/preset-panda';

const globalCss = defineGlobalStyles({
  html: {
    width: '100%',
    height: '100%',
  },
});

export const weakAssDevPreset = definePreset({
  presets: [pandaPreset],
  globalCss,
  theme: {
    extend: {},
  },
});
