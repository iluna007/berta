import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "mapbox-gl": "mapbox-gl/dist/mapbox-gl.js",
    },
  },

  optimizeDeps: {
    include: ["mapbox-gl"],
  },

  build: {
    outDir: "build",
    chunkSizeWarningLimit: 3000, // 🔥 elimina el warning de chunks grandes
  },

  server: {
    proxy: {
      "/api": {
        target: "https://ukraine.bellingcat.com/ukraine-server",
        changeOrigin: true,
      },
      "/timemap": {
        target:
          "https://bellingcat-embeds.ams3.cdn.digitaloceanspaces.com/production/ukr",
        changeOrigin: true,
      },
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.js",
    passWithNoTests: true,
  },
});
