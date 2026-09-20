import { vlyPlugin } from "@vly-ai/integrations";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: './', // Charge les scripts depuis le chemin relatif
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    target: 'esnext',
    minify: 'esbuild',
  },
  optimizeDeps: {
    entries: ['index.html'],
    include: [
      'react',
      'react/jsx-runtime',
      'react-dom',
      'react-dom/client',
      'react-router',
      '@convex-dev/auth/react',
      'framer-motion',
    ],
  },
  server: {
    host: true,
    port: 5173,
    hmr: {
      overlay: false,
    },
  },
});
