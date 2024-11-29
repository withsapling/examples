import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno()],
  build: {
    target: 'esnext',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: './scripts/index.ts',
        main: './styles/main.css',
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // Handle entry files based on their type
          return chunkInfo.name.endsWith('styles')
            ? 'css/[name].css'
            : 'scripts/[name].js';
        },
        assetFileNames: (assetInfo) => {
          // Handle other assets (like images, fonts, etc.)
          if (assetInfo?.fileName?.endsWith('.css')) {
            return 'css/[name][extname]';
          }
          return '[name][extname]';
        },
        dir: './static',
        preserveModules: false,
      }
    },
  },
})
