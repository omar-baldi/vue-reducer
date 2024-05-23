import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [vue()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
