import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno()],
  build: {
    target: 'esnext',
    outDir: './static/scripts',
    emptyOutDir: true,
    watch: {},
    rollupOptions: {
      input: {
        index: './scripts/index.ts',
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
        dir: './static/scripts',
        preserveModules: false,
      }
    },
  },
})
