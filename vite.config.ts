import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [vue(), dts({ rollupTypes: true })],
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/composables/index.ts"),
      name: "vueReducersHooks",
      fileName: "index",
      formats: ["es", "cjs"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@tests": path.resolve(__dirname, "tests"),
    },
  },
});
