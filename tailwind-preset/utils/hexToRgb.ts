export type RGB = {
  r: number;
  g: number;
  b: number;
};

export const isHex = (hex: string): boolean => /^#[0-9A-F]{6}|#[0-9A-F]{3}$/i.test(hex.trim());

export const hexToRgb = (hex: string): RGB => {
  if (!isHex(hex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  if (hex.length === 4) {
    hex = hex.replace(/^#/, "").replace(/(.)/g, "$1$1").padStart(7, "#");
  }

  const [r, g, b] = hex.replace(/^#/, "").match(/../g)!.map(hexPartToRgbPart) as [
    number,
    number,
    number,
  ];

  return { r, g, b };
};

const hexPartToRgbPart = (hexPart: string) => parseInt(hexPart, 16);
