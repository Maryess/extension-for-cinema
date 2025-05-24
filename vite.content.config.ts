import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../build",
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, "src/content.tsx"),
      output: {
        format: "iife",
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [
    react(),
    eslint({ include: ["**/*.ts", "**/*.tsx"], cache: false }),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [{ src: resolve(__dirname, "src/manifest.json"), dest: "./" }],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      public: path.resolve(__dirname, "public/"),
      app: path.resolve(__dirname, "src/popup/app"),
      pages: path.resolve(__dirname, "src/popup/pages"),
      api: path.resolve(__dirname, "src/popup/api"),
      services: path.resolve(__dirname, "src/popup/services"),
      store: path.resolve(__dirname, "src/popup/store"),
      hooks: path.resolve(__dirname, "src/popup/shared/lib/hooks"),
      widgets: path.resolve(__dirname, "src/popup/widgets"),
      features: path.resolve(__dirname, "src/popup/features"),
      styles: path.resolve(__dirname, "src/popup/shared/styles"),
      entities: path.resolve(__dirname, "src/popup/entities"),
      shared: path.resolve(__dirname, "src/popup/shared"),
      components: path.resolve(__dirname, "src/popup/components"),
      ui: path.resolve(__dirname, "src/popup/ui"),
    },
  },
});
