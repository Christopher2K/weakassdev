import esbuild from 'esbuild';

esbuild.buildSync({
  entryPoints: ['src/main.ts'],
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  platform: 'node',
  format: 'esm',
  outfile: './dist/main.mjs',
  banner: {
    js: 'import { createRequire as topLevelCreateRequire } from "module"; const require = topLevelCreateRequire(import.meta.url);',
  },
});
