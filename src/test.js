const isString = x => typeof x === "string";
const sortDescending = x => x.sort((a, b) => Math.sign(b - a));

const defaultRules = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety",
  100: { word: "hundred", multiplier: true },
  1000: { word: "thousand", multiplier: true },
  1000000: { word: "million", multiplier: true },
  1000000000: { word: "billion", multiplier: true },
  1000000000000: { word: "trillion", multiplier: true },
};

const result = Object.entries(defaultRules).map(([k, v]) => ({
  value: k,
  ...(isString(v) ? { word: v } : v),
}));

console.log(result);

const parseRules = array => {
  const [values, words, multipliers] = array.reduce(
    ([values, words, multipliers], { value, word, multiplier }) => {
      values.add(value);
      if (multiplier) multipliers.add(value);
      return [values, { ...words, [value]: word }, multipliers];
    },
    [new Set(), {}, new Set()]
  );
  return {
    values: sortDescending([...values]),
    words,
    multipliers: [...multipliers],
  };
};

const parsedRules = parseRules(result);

const numberToWord = (number, rules) => {
  const { values, words, multipliers } = rules;
  const b = biggestValueLessThanOriginalNumber(number, values);
  if (isMultiplier(b, multipliers)) {
    const quotient = Math.floor(number / b);
    const difference = number - b * quotient;
    const firstHalf = `${numberToWord(quotient, rules)} ${words[b]}`;
    if (difference === 0) return firstHalf;
    return `${firstHalf} ${numberToWord(number - b * quotient, rules)}`;
  }
  const difference = number - b;
  if (difference === 0) return words[b];
  return `${words[b]} ${numberToWord(difference, rules)}`;
};

const biggestValueLessThanOriginalNumber = (number, values) =>
  values.find(v => v <= number);

const isMultiplier = (number, multipliers) => multipliers.indexOf(number) > -1;

console.log(numberToWord(324789123, parsedRules));
