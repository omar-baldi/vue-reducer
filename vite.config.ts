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
    },
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
