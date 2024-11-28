import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for src directory
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/global-styles/_buttons.scss" as *;
          @use "@/styles/global-styles/_colors.scss" as *;
          @use "@/styles/global-styles/_fonts.scss" as *;
          @use "@/styles/global-styles/_screens.scss" as *;
        `,
      },
    },
    devSourcemap: true,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      input: './src/js/main.js', // Define your entry point here
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
  },
  test: {
    environment: 'jsdom',
  },
});
