import esbuild from 'esbuild';

esbuild.buildSync({
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  outdir: './dist',
  banner: {
    js: 'import { createRequire as topLevelCreateRequire } from "module"; const require = topLevelCreateRequire(import.meta.url);',
  },
});
