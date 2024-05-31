import { resolve } from "node:path";

import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    remix({
      ssr: true,
    }),
  ],

  resolve: {
    alias: {
      "~": resolve("app"),
    },
  },
});
