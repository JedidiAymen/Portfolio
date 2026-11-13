import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), ...(process.env.SINGLE ? [viteSingleFile()] : [])],
  build: process.env.SINGLE ? { outDir: "dist-single", assetsInlineLimit: 100_000_000 } : {},
});
