import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: "./src/app",
  base: "/app",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/app"),
    },
  },
  // this is a proxy to the backend server so your react app can hit /api while in dev mode
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  build: {
    emptyOutDir: true,
    outDir: "../../static/app",
    watch: process.env.NODE_ENV === "development" ? {} : null,
  },
});
