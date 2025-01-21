import type { Config } from "tailwindcss";
import { generateObject } from "../utils";
import plugins from "../plugins";
import fluid, { extract } from "fluid-tailwind";

const fontSize = generateObject([
  {
    ranges: [[0, 22, 0.5]],
    updateValue: (v) => `${v / 4}rem`,
    includeNegative: true,
  },
]);

const borderWidth = generateObject([
  {
    ranges: [[0, 10, 1]],
    updateValue: (v) => `${v / 16}rem`,
  },
]);

const spacing = generateObject([
  {
    ranges: [[0, 2, 0.05]],
    updateKeyValue: (kv) => `${kv}em`,
  },
  {
    ranges: [[0, 100, 5]],
    updateKeyValue: (kv) => `${kv}%`,
  },
  {
    ranges: [[0, 100, 1]],
    updateValue: (v) => `${v / 4}rem`,
    includeNegative: true,
  },
]);

const transitionDuration = generateObject({
  ranges: [[0, 2000, 100]],
  updateValue: (v) => `${v}ms`,
  custom: {
    inherit: "inherit",
  },
});

const pxToRem = (px: number) => `${px / 16}rem`;

const preset: Config = {
  content: {
    files: [],
    extract,
  },
  plugins: [...plugins, fluid],
  theme: {
    extend: {
      data: {
        active: "active=true",
        "not-active": "active=false",
        playing: "playing=true",
        "not-playing": "playing=false",
        selected: "selected=true",
        "not-selected": "selected=false",
        visible: "visible=true",
        "not-visible": "visible=false",
        copied: "copied=true",
        "not-copied": "copied=false",
        expanded: "expanded=true",
        "not-expanded": "expanded=false",
      },
      screens: {
        "2xs": pxToRem(280), // 17.5rem
        xs: pxToRem(380), // 23.75rem
        sm: pxToRem(480), // 30rem
        sm2: pxToRem(640), // 40rem
        md: pxToRem(768), // 48rem
        lg: pxToRem(1024), // 64rem
        xl: pxToRem(1280), // 80rem
        "2xl": pxToRem(1440), // 90rem
      },
      content: {
        empty: "''",
        star: "*",
      },
      transitionDuration,
      transitionDelay: transitionDuration,
      fontSize,
      borderWidth,
      spacing,
    },
  },
};

export default preset;
