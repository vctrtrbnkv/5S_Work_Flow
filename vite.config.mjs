import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: './',
  base: '/5S_Work_Flow',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 0,
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'public/assets/sprites/*',
          dest: 'assets/sprites',
        },
      ],
    }),
  ],
});