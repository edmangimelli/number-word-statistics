export const isNumber = x =>
  typeof x === 'number' &&
  !Number.isNaN(x) &&
  Number.isFinite(x);

export const isString = x => typeof x === 'string';


export const stringToNumber = str => {
  // return [number, OK]
  const regex = /^(0|(\+|-)?[1-9]\d*)((e|E)\+?(0|[1-9]\d*))?$/;
  const commasAndWhitespaceRemoved = str.replace(/[\s,]/g, '');
  const matches = commasAndWhitespaceRemoved.match(regex);
  if (!matches) return [null, false];
  const numberString = matches[0].replace(/\s/g,'');
  const number = Number(numberString);
  return [number, isNumber(number)];
}

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const remove = (x, from) => {
  if (isString(x)) return from.split(x).join('');
  return from.replace(x, '');
}

export const formatNumber = number => {
  const string = String(number);
  if (string.length > 1 && remove('0', string).length === 1)
    return remove('+', number.toExponential());
  return number.toLocaleString()
}

export const numberOfDigitsBeforeCursor = (string, cursorPosition) =>
  string.slice(0, cursorPosition).match(/\d/g).length;

export const positionOfCursorIfItWasAfterXNumberOfDigits = (string, numberOfDigits) => {
  const len = string.length;
  for (let i = 0, digitsSeen = 0; i < len; i++) {
    if (string[i].match(/\D/)) continue;
    if (++digitsSeen === numberOfDigits) return i+1;
  }
  return len;
}
