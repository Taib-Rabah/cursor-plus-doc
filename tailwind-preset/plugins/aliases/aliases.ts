import Plugin from "tailwindcss/plugin";
import { flattenTheme } from "../../utils/themeToKebabcase";
import { processBorderColor } from "./utils";

export const opacityToHexPart = (opacity: number) =>
  Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

const aliasesPlugin = Plugin(({ matchUtilities, theme }) => {
  const borderColor = flattenTheme(theme("borderColor"));
  const opacity = theme("opacity");

  matchUtilities(
    {
      b: (borderWidth, { modifier: borderColor }) => ({
        borderWidth,
        borderColor,
      }),
      bt: (borderTopWidth, { modifier: borderTopColor }) => ({
        borderTopWidth,
        borderTopColor,
      }),
      br: (borderRightWidth, { modifier: borderRightColor }) => ({
        borderRightWidth,
        borderRightColor,
      }),
      bb: (borderBottomWidth, { modifier: borderBottomColor }) => ({
        borderBottomWidth,
        borderBottomColor,
      }),
      bl: (borderLeftWidth, { modifier: borderLeftColor }) => ({
        borderLeftWidth,
        borderLeftColor,
      }),
    },
    {
      values: theme("borderWidth"),
      modifiers: borderColor,
    },
  );

  matchUtilities(
    {
      b: (borderColor, { modifier: opacity }) => processBorderColor("", borderColor, opacity),
      bt: (borderTopColor, { modifier: opacity }) =>
        processBorderColor("top", borderTopColor, opacity),
      br: (borderRightColor, { modifier: opacity }) =>
        processBorderColor("right", borderRightColor, opacity),
      bb: (borderBottomColor, { modifier: opacity }) =>
        processBorderColor("bottom", borderBottomColor, opacity),
      bl: (borderLeftColor, { modifier: opacity }) =>
        processBorderColor("left", borderLeftColor, opacity),
    },
    {
      values: borderColor,
      modifiers: opacity,
    },
  );

  matchUtilities(
    {
      "b-opacity": (borderOpacity) => ({
        "--tw-border-opacity": borderOpacity,
      }),
    },
    {
      values: opacity,
    },
  );

  // Translate

  const translate = theme("translate");

  matchUtilities(
    {
      x: (translateX) => ({
        "--tw-translate-x": translateX,
        translate: `var(--tw-translate-x) var(--tw-translate-y, 0)`,
      }),
      y: (translateY) => ({
        "--tw-translate-y": translateY,
        translate: `var(--tw-translate-x, 0) var(--tw-translate-y)`,
      }),
    },
    {
      values: translate,
      supportsNegativeValues: true,
    },
  );
});

export default aliasesPlugin;
