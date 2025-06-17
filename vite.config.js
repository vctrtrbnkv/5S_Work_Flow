import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    build: {
        outDir: 'dist',
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
            input: {
                main: './index.html',
                about: './about.html',
            },
        },
    },
    resolve: {
        alias: {
            // Optional: Alias for Phaser if needed
            // 'phaser': 'phaser/dist/phaser.js'
        },
    },
    optimizeDeps: {
        include: ['phaser'],
    },
});
