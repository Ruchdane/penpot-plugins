import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { stylePlugin } from "@libs/styles/plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, isPreview }) => {
  // Since we can't get a "plugin.js" without "import" we need to be smarter for this plugin
  // In dev mode only plugin code is rebuild (one file = no chunk)
  // In build mode, esbuild will be used after vite to ensure plugin.js has no "import"
  return {
    plugins: [react(), stylePlugin()],
    base: "/penpot-plugins/tailwind-html/",
    build: {
      minify: false,
      outDir: "../../dist/tailwind-html",
      rollupOptions: {
        input: {
          plugin: "src/plugin.ts",
          ...(mode === "dev" ? {} : { index: "./index.html" }),
        },
        output: {
          entryFileNames: "[name].js",
        },
      },
    },
    preview: {
      port: 5173,
    },
  };
});
