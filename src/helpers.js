import predefinedRules from "./rules";

export const isNumber = x =>
  typeof x === "number" && !Number.isNaN(x) && Number.isFinite(x);

export const isString = x => typeof x === "string";

export const stringToNumber = str => {
  // return [number, OK]
  const regex = /^(0|(\+|-)?[1-9]\d*)((e|E)\+?(0|[1-9]\d*))?$/;
  const commasAndWhitespaceRemoved = String(str).replace(/[\s,]/g, "");
  const matches = commasAndWhitespaceRemoved.match(regex);
  if (!matches) return [null, false];
  const numberString = matches[0].replace(/\s/g, "");
  const number = Number(numberString);
  return [number, isNumber(number)];
};

export const numberToString = number => {
  // return [string, OK]
  if (!isNumber(number)) return ["", false];
  if (number > 9999 &&  remove('0', String(number)).length === 1)
    return [remove("+", number.toExponential()), true];
  return [number.toLocaleString(), true];
};

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const remove = (x, from) => {
  if (isString(x)) return from.split(x).join("");
  return from.replace(x, "");
};

export const numberOfDigitsBeforeCursor = (string, cursorPosition) =>
  string.slice(0, cursorPosition).match(/\d/g).length;

export const positionOfCursorIfItWasAfterXNumberOfDigits = (
  string,
  numberOfDigits
) => {
  const len = string.length;
  for (let i = 0, digitsSeen = 0; i < len; i++) {
    if (string[i].match(/\D/)) continue;
    if (++digitsSeen === numberOfDigits) return i + 1;
  }
  return len;
};

export const restoreCursor = ({
  element,
  originalCursorPosition,
  previous,
  current,
}) => {
  const numberOfDigits = numberOfDigitsBeforeCursor(
    previous,
    originalCursorPosition
  );
  const newCursorPosition = positionOfCursorIfItWasAfterXNumberOfDigits(
    current,
    numberOfDigits
  );
  window.requestAnimationFrame(() => {
    element.selectionStart = element.selectionEnd = newCursorPosition;
  });
};

export const nameOfTheCurrentRuleSet = currentRuleSet => {
  for (const [nameOfRuleSet, ruleSet] of Object.entries(predefinedRules))
    if (ruleSetsAreEqual(currentRuleSet, ruleSet)) return nameOfRuleSet;
  return null;
};

const ruleSetsAreEqual = (A, B) => {
  if (A.length !== B.length) return false;
  for (const a of A)
    if (!B.find(b => ["value", "word", "multiplier"].every(k => a[k] === b[k])))
      return false;
  return true;
};

const sortDescending = x => x.sort((a, b) => b - a);

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

export const numberToWord = (number, rules) => {
  const { values, words, multipliers } = parseRules(rules);
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

export const rangeInclusive = (a, b) => [...Array(b-a+1).keys()].map(n => n+a);
