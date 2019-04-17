export const isNumber = x =>
  typeof x === 'number' &&
  !Number.isNaN(x) &&
  Number.isFinite(x);


export const stringToNumber = str => {
  // return [number, OK]
  const regex = /^s*(-?\s*[1-9]\d*|(0|[1-9]\d*))(\s*(e|E)\s*(0|[1-9]\d*))?\s*$/;
  const matches = str.match(regex);
  if (!matches) return [null, false];
  const numberString = matches[0].replace(/\s/g,'');
  const number = Number(numberString);
  return [number, isNumber(number)];
}
