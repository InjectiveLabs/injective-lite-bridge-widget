import {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} from "tailwindcss-scoped-preflight";

import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-mode="dark"]'],

  blocklist: ["container"],

  theme: {
    extend: {},
  },

  important: ".inj-app",

  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(".inj-app", {
        // except: ".no-twp", // optional, to exclude some elements under .twp from being preflighted, like external markup
        rootStyles: "move to container",
      }),
    }),
  ],
} as Config;
