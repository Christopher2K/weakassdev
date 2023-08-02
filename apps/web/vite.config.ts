import { fileURLToPath, URL } from 'node:url';
import solid from 'solid-start/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [solid()],
  server: {
    hmr: {
      host: 'weakassdev.local',
    },
    watch: {
      usePolling: true,
      interval: 10,
    },
  },

  resolve: {
    alias: {
      '@app': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
