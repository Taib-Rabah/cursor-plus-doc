import { getColorWithOpacity } from "../../utils/getColorWithOpacity";
import { upperFirst } from "@trdev20/js-utils";

export const processBorderColor = (
  borderPosition: string,
  borderColor: string,
  opacity: string,
) => {
  const targetBorder = `border${upperFirst(borderPosition)}Color`;
  const borderColorWithOpacity = getColorWithOpacity(borderColor, "--tw-border-opacity");

  return {
    "--tw-border-opacity": opacity ?? "1",
    [targetBorder]: borderColorWithOpacity,
  };
};
