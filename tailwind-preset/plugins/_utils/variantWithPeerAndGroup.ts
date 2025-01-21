import { PluginAPI } from "tailwindcss/types/config";

type MatchVariantOptions = Parameters<PluginAPI["matchVariant"]>[2];

export const createVariantHelpers = ({
  addVariant,
  matchVariant,
}: Pick<PluginAPI, "addVariant" | "matchVariant">) => {
  const addVariantWithPeerAndGroup = (name: string, definition: string) => {
    addVariant(name, `&${definition}`);
    addVariant(`peer-${name}`, `.peer${definition} ~ &`);
    addVariant(`group-${name}`, `.group${definition} &`);
  };

  const matchVariantWithPeerAndGroup = (
    name: string,
    cb: (value: unknown) => string | string[],
    options?: MatchVariantOptions,
  ) => {
    matchVariant(name, (value) => `&${cb(value)}`, options);
    matchVariant(`peer-${name}`, (value) => `.peer${cb(value)} ~ &`);
    matchVariant(`group-${name}`, (value) => `.group${cb(value)} &`);
  };

  return {
    addVariantWithPeerAndGroup,
    matchVariantWithPeerAndGroup,
  };
};
