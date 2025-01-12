import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno(), react()],

  build: {
    target: 'esnext',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './styles/main.css',
        counter: './scripts/Counter.tsx',
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
