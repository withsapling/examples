import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    target: 'node20',
    rollupOptions: {
      input: 'src/index.ts',
      output: {
        format: 'esm',
      },
    },
    outDir: 'dist',
    ssr: true,
    sourcemap: true,
  },
  optimizeDeps: {
    exclude: ['@sapling/sapling']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}) 