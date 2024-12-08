import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for src directory
      '@styles': path.resolve(__dirname, './src/styles'),
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
    sourcemap: true,
    rollupOptions: {

        input: {
          main: path.resolve(__dirname, 'index.html'), 
          challenges: path.resolve(__dirname, 'challenges.html'), 
        },
        output: {
          entryFileNames: 'assets/js/[name].bundle.js', 
          chunkFileNames: 'assets/js/[name].[hash].js', 
          assetFileNames: 'assets/[name].[ext]', 
        },
    }
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: false, 
  },
  test: {
    environment: 'jsdom',
  },
});
