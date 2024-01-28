import { UserStorage } from "../store/slices/login/login.types";

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

