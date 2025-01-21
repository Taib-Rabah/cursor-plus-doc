import { isEmptyString, isObject, Obj } from "@trdev20/js-utils";

/**
 * Flattens an object from the tw theme object and converts the keys to KebabCase.
 *
 * @example
 * ```ts
 * // theme("colors")
 * // from
 *
 * {
 *   "primary": {
 *     DEFAULT: "#000000",
 *     light: "#000000",
 *     dark: "#000000"
 *   },
 *   ...
 * }
 *
 * // to
 *
 * {
 *   primary: "#000000",
 *   "primary-light": "#000000",
 *   "primary-dark": "#000000",
 *   ...
 * }
 * ```
 */

export const flattenTheme = (theme: Obj) => {
  const flattened: Obj<string, string> = {};

  const flatten = (obj: Obj, prefix: string = "") => {
    for (const key in obj) {
      if (key === "DEFAULT" && prefix === "") continue;

      const value = obj[key];
      const newKey =
        key === "DEFAULT"
          ? prefix
          : isEmptyString(prefix)
          ? key
          : `${prefix}-${key}`;

      if (isObject(value)) {
        flatten(value, newKey);
      } else {
        flattened[newKey] = `${value}`;
      }
    }
  };

  flatten(theme);

  return flattened;
};

