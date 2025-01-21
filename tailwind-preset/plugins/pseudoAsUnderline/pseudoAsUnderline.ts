import { type StringChoices, isOneOf } from "@trdev20/js-utils";
import { twJoin } from "tailwind-merge";
import { flattenTheme, generateObject, hexToRgb, isHex } from "../../utils";
import Plugin from "tailwindcss/plugin";
import { getColorWithOpacity } from "../../utils/getColorWithOpacity";

const pseudoAsUnderlinePlugin = Plugin(({ theme, matchComponents, matchUtilities }) => {
  // The starting position from which the underline animation will expand
  const underlinePositions = ["left", "center", "right"] as const;
  type underlinePosition = StringChoices<(typeof underlinePositions)[number]>;
  type Pseudo = "before" | "after";
  type Visibility = StringChoices<"show" | "hide">;

  // the base tw
  const getUnderlineBaseTw = (pseudo: Pseudo) =>
    `@apply relative ${pseudo}:absolute ${pseudo}:content-empty ${pseudo}:h-0.1em ${pseudo}:top-full ${pseudo}:bg-current ${pseudo}:rounded-full ${pseudo}:duration-200`;

  // what to add to the base tw based on the position
  const underlinePosDiffTw = {
    left: {
      before: "before:left-0 before:x-0",
      after: "after:left-0 after:x-0",
    },
    center: {
      before: "before:-x-50% before:left-50%",
      after: "after:-x-50% after:left-50%",
    },
    right: {
      before: "before:-x-100% before:left-100%",
      after: "after:-x-100% after:left-100%",
    },
  };

  // generate the final tw based on the position
  const genUnderlineTw = (pseudo: Pseudo, pos: underlinePosition) => {
    if (!isOneOf(pos, underlinePositions)) {
      return "";
    }
    return twJoin(getUnderlineBaseTw(pseudo), underlinePosDiffTw[pos][pseudo]);
  };

  const underlineTw = {
    left: {
      before: genUnderlineTw("before", "left"),
      after: genUnderlineTw("after", "left"),
    },
    center: {
      before: genUnderlineTw("before", "center"),
      after: genUnderlineTw("after", "center"),
    },
    right: {
      before: genUnderlineTw("before", "right"),
      after: genUnderlineTw("after", "right"),
    },
  };

  const processUnderline = ({
    pseudo,
    position,
    visibility,
  }: {
    pseudo: Pseudo;
    position: underlinePosition;
    visibility: Visibility | null;
  }) => {
    if (!isOneOf(position, ["left", "center", "right"] as const)) {
      return {};
    }

    const tw = twJoin(
      underlineTw[position][pseudo],
      visibility === "hide" ? `${pseudo}:w-0` : `${pseudo}:w-full`,
    );

    return {
      [tw]: "",
    };
  };

  matchComponents(
    {
      bu: (position, { modifier: visibility }) =>
        processUnderline({ position, visibility, pseudo: "before" }),
      au: (position, { modifier: visibility }) =>
        processUnderline({ position, visibility, pseudo: "after" }),
    },
    {
      values: {
        left: "left",
        center: "center",
        right: "right",
      },
      modifiers: {
        show: "show",
        hide: "hide",
      },
    },
  );

  const processBeforeUnderlineShowHide = ({
    pseudo,
    visibility,
    width,
  }: {
    pseudo: Pseudo;
    visibility: Visibility;
    width: string | null;
  }) => {
    const validWidth = visibility === "hide" ? `calc(100%-${width})` : width;
    const tw = `@apply ${pseudo}:w-[${validWidth}]`;
    return {
      [tw]: "",
    };
  };

  matchUtilities(
    {
      bu: (visibility: string, { modifier: percentage }) =>
        processBeforeUnderlineShowHide({
          pseudo: "before",
          visibility,
          width: percentage ?? "100%",
        }),
      au: (visibility: string, { modifier: percentage }) =>
        processBeforeUnderlineShowHide({
          pseudo: "after",
          visibility,
          width: percentage ?? "100%",
        }),
    },
    {
      values: {
        show: "show",
        hide: "hide",
      },
      modifiers: generateObject({
        ranges: [[0, 100, 5]],
        updateKeyValue: (kv) => `${kv}%`,
      }),
    },
  );

  matchUtilities(
    {
      "bu-duration": (duration: string, { modifier: delay }) => ({
        "&::before": {
          transitionDuration: duration,
          transitionDelay: delay,
        },
      }),
      "au-duration": (duration: string, { modifier: delay }) => ({
        "&::after": {
          transitionDuration: duration,
          transitionDelay: delay,
        },
      }),
    },
    {
      values: theme("transitionDuration"),
      modifiers: theme("transitionDelay"),
    },
  );

  matchUtilities(
    {
      "bu-delay": (delay) => ({
        "&::before": {
          transitionDelay: delay,
        },
      }),
      "au-delay": (delay) => ({
        "&::after": {
          transitionDelay: delay,
        },
      }),
    },
    {
      values: theme("transitionDelay"),
    },
  );

  matchUtilities(
    {
      bu: (color, { modifier: opacity }) => {
        const colorWithOpacity = getColorWithOpacity(color, "--tw-bg-opacity");
        return {
          "&::before": {
            "--tw-bg-opacity": opacity ?? "1",
            backgroundColor: colorWithOpacity,
          },
        };
      },
      au: (color, { modifier: opacity }) => {
        const colorWithOpacity = getColorWithOpacity(color, "--tw-bg-opacity");
        return {
          "&::after": {
            "--tw-bg-opacity": opacity ?? "1",
            backgroundColor: colorWithOpacity,
          },
        };
      },
    },
    {
      values: flattenTheme(theme("colors")),
      modifiers: theme("opacity"),
    },
  );
});

export default pseudoAsUnderlinePlugin;
