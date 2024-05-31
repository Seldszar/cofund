import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["app/**/*.{js,jsx,ts,tsx}"],

  // The output directory
  outdir: "app/styled-system",

  // The framework to use for generating supercharged elements
  jsxFramework: "react",

  // The style props allowed on generated JSX components
  jsxStyleProps: "minimal",
});
