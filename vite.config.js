import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1600,
  },
  resolve: {
    alias: {
      // Optional: Alias for Phaser if needed
      // 'phaser': 'phaser/dist/phaser.js'
    },
  },
  optimizeDeps: {
    include: ["phaser"],
  },
});
