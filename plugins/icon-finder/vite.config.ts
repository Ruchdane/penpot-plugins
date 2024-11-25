import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { stylePlugin } from "@libs/styles/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stylePlugin()],
  base: "/penpot-plugins/icon-finder/",
  build: {
    outDir: "../../dist/icon-finder",
    rollupOptions: {
      input: {
        plugin: "src/plugin.ts",
        index: "./index.html",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  preview: {
    port: 5173,
  },
});
