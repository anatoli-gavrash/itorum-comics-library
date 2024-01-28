
export const validationPageValue = (min: number, max: number, value: number): number => {
  if (value && value >= min) {
    if (value <= max) {
      return value;
    }

    return max;
  }

  return min;
};
