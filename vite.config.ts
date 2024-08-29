import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { nodePolyfills } from "@bangjelkoski/vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    vue(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],

  build: {
    lib: {
      entry: "./src/main.ts", // Entry point of your widget
      name: "InjBridgeWidget",
      formats: ["umd"], // UMD format for universal compatibility
      fileName: (format) => `inj-bridge-widget.${format}.js`,
    },
    rollupOptions: {
      // Do not mark Vue as external
      external: [], // Keep this empty to bundle everything
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    cssCodeSplit: false, // Ensure CSS is bundled with JS,
  },
});
