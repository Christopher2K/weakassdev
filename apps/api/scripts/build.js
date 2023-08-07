import esbuild from 'esbuild';
import esbuildPluginPino from 'esbuild-plugin-pino';
import { rename, mkdir, copyFile } from 'fs/promises';

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  platform: 'node',
  format: 'esm',
  outdir: './dist',
  banner: {
    js: `
import { createRequire as topLevelCreateRequire } from "module";
const require = topLevelCreateRequire(import.meta.url);
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
`,
  },
  plugins: [esbuildPluginPino({ transports: ['pino-pretty'] })],
});

await mkdir('./dist/lib', { recursive: true });
await copyFile('./dist/thread-stream-worker.js', './dist/lib/worker.js');
await copyFile('./dist/pino-pretty.js', './dist/pino-pretty-transport.js');
await rename('./dist/main.js', './dist/main.mjs');
