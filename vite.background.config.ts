import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    eslint({ include: ["**/*.ts", "**/*.tsx"], cache: false }),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [{ src: resolve(__dirname, "src/manifest.json"), dest: "./" }],
    }),
  ],
  root: "src",
  build: {
    outDir: "../build",
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, "src/background.ts"),
      output: {
        format: "es",
        entryFileNames: "background.js",
      },
    },
  },
});
