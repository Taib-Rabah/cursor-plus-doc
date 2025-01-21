import { getColorWithOpacity } from "../../utils/getColorWithOpacity";
import { flattenTheme, hexToRgb, isHex } from "../../utils";
import { isOneOf, keys } from "@trdev20/js-utils";
import Plugin from "tailwindcss/plugin";
import { CSSRuleObject } from "tailwindcss/types/config";

const darkThemeColorsPlugin = Plugin(({ matchUtilities, matchComponents, theme }) => {
  const properties = {
    Text: "color",
    Bg: "background-color",
    B: "border-color",
    Bt: "border-top-color",
    Br: "border-right-color",
    Bb: "border-bottom-color",
    Bl: "border-left-color",
    Fill: "fill",
    Stroke: "stroke",
    Outline: "outline-color",
    Caret: "caret-color",
  };

  const propertiesWithOpacity = {
    Text: "--tw-text-opacity",
    Bg: "--tw-bg-opacity",
    B: "--tw-border-opacity",
    Bt: "--tw-border-opacity",
    Br: "--tw-border-opacity",
    Bb: "--tw-border-opacity",
    Bl: "--tw-border-opacity",
  };

  const genRuleObject = (
    propertyKey: keyof typeof properties,
    color: string,
    darkColor: string | null,
  ) => {
    const propertyHasOpacity = isOneOf(propertyKey, keys(propertiesWithOpacity));

    const cssProperty = properties[propertyKey];

    if (propertyHasOpacity) {
      const opacityVar = propertiesWithOpacity[propertyKey];
      const colorWithOpacity = getColorWithOpacity(color, opacityVar);
      const darkColorWithOpacity = darkColor ? getColorWithOpacity(darkColor, opacityVar) : null;
      return {
        [opacityVar]: "1",
        [cssProperty]: colorWithOpacity,
        "&:is(.dark *)": !darkColorWithOpacity
          ? null
          : {
              [cssProperty]: darkColorWithOpacity,
            },
      };
    }

    return {
      [cssProperty]: color,
      "&:is(.dark *)": !darkColor
        ? null
        : {
            [cssProperty]: darkColor,
          },
    };
  };

  const colors = flattenTheme(theme("colors"));

  for (const propertyKey of keys(properties)) {
    matchComponents(
      {
        [propertyKey]: (color, { modifier: darkColor }) =>
          genRuleObject(propertyKey, color, darkColor),
      },
      {
        values: colors,
        modifiers: colors,
      },
    );
  }

  for (const propertyKey of ["Text", "Bg", "B"] as const) {
    matchUtilities(
      {
        [`${propertyKey}-opacity`]: (opacity, { modifier: darkOpacity }) => {
          const twProperty = `${propertyKey}-opacity`;
          return {
            [twProperty]: opacity,
            "&:is(.dark *)": !darkOpacity
              ? null
              : {
                  [twProperty]: darkOpacity,
                },
          };
        },
      },
      {
        values: theme("opacity"),
        modifiers: theme("opacity"),
      },
    );
  }
});

export default darkThemeColorsPlugin;
