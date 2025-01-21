import Plugin from "tailwindcss/plugin";
import aliasesPlugin from "./aliases";
import layoutPlugin from "./layout";
import pseudoAsUnderlinePlugin from "./pseudoAsUnderline";
import othersPlugin from "./others";
import darkThemeColorsPlugin from "./darkThemeColors";

const plugins: ReturnType<typeof Plugin>[] = [
  aliasesPlugin,
  layoutPlugin,
  pseudoAsUnderlinePlugin,
  othersPlugin,
  darkThemeColorsPlugin,
];

export default plugins;
