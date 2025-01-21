import { hexToRgb } from "./hexToRgb";
import { isHex } from "./validators";

/**
 * If the color is a hex color, convert it to rgba
 * 
 * Otherwise, append the opacity variable to the color
 */

export const getColorWithOpacity = (color: string, opacityVar: string) => {
  if (isHex(color)) return hexToRgba(color, opacityVar);
  return appendOpacity(color, opacityVar);
};

const hexToRgba = (hex: string, opacityVar: string) => {
  const { r, g, b } = hexToRgb(hex);
  const rgba = `rgba(${r} ${g} ${b} / var(${opacityVar}))`;
  return rgba;
};

const appendOpacity = (color: string, opacityVar: string) => {
  const colorWithOpacity = color.slice(0, -1) + ` / var(${opacityVar}))`;
  return colorWithOpacity;
};
