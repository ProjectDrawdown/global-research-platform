export const orderSuffixesDefault = {
  4: "T",
  3: "B",
  2: "M",
  1: "k",
  0: ""
};

export const orderSuffixesWeight = {
  2: "Gt",
  1: "Mt",
  0: "t"
}

export function prettyFormatBigNumber(num, precision = 3, orderSuffixes = orderSuffixesDefault) {
  const digits = Math.floor(Math.log10(num));
  const order = Math.min(4, Math.floor(digits/3));
  const suffix = order > 0 ? orderSuffixes[order] : orderSuffixes[0];
  return (num/Math.pow(10,order*3)).toPrecision(precision) + suffix;
}

export function prettyFormatBigWeight(num, precision = 3, orderSuffix = orderSuffixesWeight) {
  return prettyFormatBigNumber(num, precision, orderSuffix);
}
