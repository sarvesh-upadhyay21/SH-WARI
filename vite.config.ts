import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const port = Number(process.env.PORT ?? 5173);

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2020",
    sourcemap: false,
    cssCodeSplit: true,
    minify: "esbuild",
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },

  server: {
    host: "0.0.0.0",
    port,
    strictPort: true,
  },

  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
