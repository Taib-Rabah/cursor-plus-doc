import { isArray } from "@trdev20/js-utils";

export type Range = [start: number, end: number];
export type RangeWithStep = [...Range, step: number];

export type GenerateValuesParams = {
  ranges: (Range | RangeWithStep)[];
  updateKey?: (key: number) => string;
  updateValue?: (value: number) => string;
  updateKeyValue?: (keyOrValue: number) => string;
  defaultStep?: number;
  includeNegative?: boolean;
  custom?: Record<string, string>;
};

type FixObjectUpdate = {
  updateKey?: (key: string) => string;
  updateValue?: (value: string) => string;
  updateKeyValue?: (keyOrValue: string) => string;
};

export const fixObject = (
  obj: Record<string, string>,
  { updateKey, updateValue, updateKeyValue }: FixObjectUpdate,
) => {
  const result: Record<string, string> = {};
  for (const key in obj) {
    const value = obj[key]!;
    const newKey = updateKey ? updateKey(key) : updateKeyValue ? updateKeyValue(key) : key;
    const newValue = updateValue
      ? updateValue(value)
      : updateKeyValue
        ? updateKeyValue(value)
        : value;
    result[newKey] = newValue;
  }
  return result;
};

export const generateObject = (params: GenerateValuesParams | GenerateValuesParams[]) => {
  const paramsArray = isArray(params) ? params : [params];

  let finalObj: Record<string, string> = {};

  const _generateObject = ({
    ranges,
    defaultStep = 1,
    updateKey,
    updateValue,
    updateKeyValue,
    includeNegative,
    custom,
  }: GenerateValuesParams) => {
    let obj: Record<string, string> = {};

    for (const range of ranges) {
      const [start, end, step = defaultStep] = range;
      for (let i = start; i <= end; i = +(i + step).toFixed(2)) {
        const key = updateKey ? updateKey(i) : updateKeyValue ? updateKeyValue(i) : i.toString();
        const value = updateValue
          ? updateValue(i)
          : updateKeyValue
            ? updateKeyValue(i)
            : i.toString();
        obj[key] = value;
        if (includeNegative) {
          obj[`-${key}`] = `-${value}`;
        }
      }
    }

    if (includeNegative && custom) {
      const negativeCustom = fixObject(custom, {
        updateKeyValue: (keyOrValue) => `-${keyOrValue}`,
      });
      obj = {
        ...obj,
        ...custom,
        ...negativeCustom,
      };
    } else if (custom) {
      obj = { ...obj, ...custom };
    }

    return obj;
  };

  for (const params of paramsArray) {
    const newObj = _generateObject(params);
    finalObj = { ...finalObj, ...newObj };
  }

  return finalObj;
};
