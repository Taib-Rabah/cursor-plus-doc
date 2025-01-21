import Plugin from "tailwindcss/plugin";
import { createVariantHelpers } from "../_utils";

const othersPlugin = Plugin(({ addUtilities, matchUtilities, addVariant, matchVariant, theme }) => {
  const { addVariantWithPeerAndGroup, matchVariantWithPeerAndGroup } = createVariantHelpers({
    addVariant,
    matchVariant,
  });

  addVariantWithPeerAndGroup("hocus", ":where(:hover, :focus)");

  addVariant("light", "&:is(.light *)");

  matchVariantWithPeerAndGroup("not", (value) => `:not(${value})`);
  matchVariantWithPeerAndGroup("has-not", (value) => `:not(:has(${value}))`);

  addVariant("can-hover", "@media(hover:hover)");
  addVariant("cant-hover", "@media(hover:none)");

  matchUtilities({
    animation: (value) => ({
      animation: value,
    }),
    "easing": (value) => ({
      "animation-timing-function": value,
    }),
  });

  // Opposite of screens
  for (const [key, value] of Object.entries(theme("screens") ?? {})) {
    addVariant(`-${key}`, `@media(width < ${value})`);
  }
});

export default othersPlugin;
