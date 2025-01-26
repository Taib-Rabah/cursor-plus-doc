import Plugin from "tailwindcss/plugin";

const layoutPlugin = Plugin(
  ({ addUtilities, addComponents, matchComponents, theme }) => {
    matchComponents(
      {
        wrapper: (width) => ({
          [`@apply w-full max-w-[${width}] mx-auto ~xs/2xl:~px-4/12`]: "",
        }),
      },
      {
        values: {
          DEFAULT: theme("screens.2xl"),
          ...theme("screens"),
        },
      },
    );

    matchComponents(
      {
        flex: (pos, { modifier: direction }) => {
          const [justify, align] = pos.split("-");
          return {
            display: "flex",
            justifyContent: justify ?? null,
            alignItems: align ?? null,
            flexDirection: direction,
          };
        },
      },
      {
        values: {
          "top-left": "start-start",
          "top-right": "start-end",
          "top-center": "start-center",
          "bottom-left": "end-start",
          "bottom-right": "end-end",
          "bottom-center": "end-center",
          "center-left": "center-start",
          "center-right": "center-end",
          center: "center-center",
        },
        modifiers: {
          row: "row",
          col: "column",
        },
      },
    );

    addComponents({
      ".grid-center": {
        display: "grid",
        placeItems: "center",
        placeContent: "center",
      },
      ".absolute-with-grid": {
        display: "grid",
        gridTemplateAreas: "single-cell",
        "& > *": {
          gridArea: "single-cell",
        },
      },
    });

    addUtilities({
      ".non-interactive": {
        "pointer-events": "none",
        "user-select": "none",
      },
    });
  },
);

export default layoutPlugin;
