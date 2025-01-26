export const isHex = (color: string) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color.trim());
};

export const isHsl = (color: string) => {
  return /^hsla?\(.+\)$/.test(color.trim());
};

export const isRgb = (color: string) => {
  return /^rgba?\(.+\)$/.test(color.trim());
};
