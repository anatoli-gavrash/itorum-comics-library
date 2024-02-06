import type { UserStorage } from "../store/slices/login/login.types";

export const validationPageValue = (min: number, max: number, value: number): number => {
  if (value && value >= min) {
    if (value <= max) {
      return value;
    }

    return max;
  }

  return min;
};

export const searchFilter = (string: string, data: UserStorage[]): number[] => {
  return data.filter(({title}) => title.includes(string)).map(({id}) => id);
};

export const randomInteger = (min: number = 0, max: number = 1000000000): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}

export const isObjectEmpty = (object: Object): boolean => {
  for (const key in object) {
    if (Object.hasOwn(object, key)) {
      return false;
    }
  }

  return true;
};
