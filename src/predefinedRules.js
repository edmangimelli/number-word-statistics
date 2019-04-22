const notMultipliers = false;

const objectToRules = (obj, multiplier = true) =>
  Object.entries(obj).map(([word, value]) => ({ word, value, multiplier }));

const powersOfTen = obj =>
  Object.entries(obj).reduce(
    (newObj, [k, v]) => ({ ...newObj, [k]: Math.pow(10, v) }),
    {}
  );

const common = objectToRules(
  {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  },
  notMultipliers
).concat(
  objectToRules({
    hundred: 100,
    thousand: 1000,
  })
);

const rules = Object.entries({
  "Short Scale (US, Eastern Europe, English Canadian, Australian, and modern British)": {
    million: 6,
    billion: 9,
    trillion: 12,
    quadrillion: 15,
    quintillion: 18,
    sextillion: 21,
    septillion: 24,
    octillion: 27,
    nonillion: 30,
    /*
    decillion: 33,
    undecillion: 36,
    duodecillion: 39,
    tredecillion: 42,
    quattuordecillion: 45,
    quindecillion: 48,
    sexdecillion: 51,
    septendecillion: 54,
    octodecillion: 57,
    novemdecillion: 60,
    vigintillion: 63,
    centillion: 303,
    */
  },
  "Long Scale (Western, Central Europe, older British, and French Canadian)": {
    million: 6,
    milliard: 9,
    billion: 12,
    billiard: 15,
    trillion: 18,
    quadrillion: 24,
    quintillion: 30,
    /*
    sextillion: 36,
    septillion: 42,
    octillion: 48,
    nonillion: 54,
    decillion: 60,
    undecillion: 66,
    duodecillion: 72,
    tredecillion: 78,
    quattuordecillion: 84,
    quindecillion: 90,
    sexdecillion: 96,
    septendecillion: 102,
    octodecillion: 108,
    novemdecillion: 114,
    vigintillion: 120,
    centillion: 600,
    */
  },
  /*
  'extended short scale': {
    million: 6,
    billion: 9,
    trillion: 12,
    quadrillion: 15,
    quintillion: 18,
    sextillion: 21,
    septillion: 24,
    octillion: 27,
    nonillion: 30,
    decillion: 33,
    undecillion: 36,
    duodecillion: 39,
    tredecillion: 42,
    quattuordecillion: 45,
    quinquadecillion: 48,
    sedecillion: 51,
    septendecillion: 54,
    octodecillion: 57,
    novendecillion: 60,
    vigintillion: 63,
    unvigintillion: 66,
    duovigintillion: 69,
    tresvigintillion: 72,
    quattuorvigintillion: 75,
    quinquavigintillion: 78,
    sesvigintillion: 81,
    septemvigintillion: 84,
    octovigintillion: 87,
    novemvigintillion: 90,
    trigintillion: 93,
    untrigintillion: 96,
    duotrigintillion: 99,
    trestrigintillion: 102,
    quattuortrigintillion: 105,
    quinquatrigintillion: 108,
    sestrigintillion: 111,
    septentrigintillion: 114,
    octotrigintillion: 117,
    noventrigintillion: 120,
    quadragintillion: 123,
    quinquagintillion: 153,
    sexagintillion: 183,
    septuagintillion: 213,
    octogintillion: 243,
    nonagintillion: 273,
    centillion: 303,
    uncentillion: 306,
    decicentillion: 333,
    undecicentillion: 336,
    viginticentillion: 363,
    unviginticentillion: 366,
    trigintacentillion: 393,
    quadragintacentillion: 423,
    quinquagintacentillion: 453,
    sexagintacentillion: 483,
    septuagintacentillion: 513,
    octogintacentillion: 543,
    nonagintacentillion: 573,
    ducentillion: 603,
    trecentillion: 903,
    quadringentillion: 1203,
    quingentillion: 1503,
    sescentillion: 1803,
    septingentillion: 2103,
    octingentillion: 2403,
    nongentillion: 2703,
    millinillion: 3003,
  },
  */
}).reduce(
  (newObj, [nameOfRuleSet, obj]) => ({
    ...newObj,
    [nameOfRuleSet]: common.concat(objectToRules(powersOfTen(obj))),
  }),
  {}
);

rules["Roman Numerals"] = objectToRules(
  {
    " ": 0,
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  },
  notMultipliers
);

rules["Modern Roman Numerals"] = rules["Roman Numerals"].concat(
  objectToRules(
    {
      IV: 4,
      IX: 9,
      XL: 40,
      XC: 90,
      CD: 400,
      CM: 900,
    },
    notMultipliers
  )
);

rules["Tally Marks (pretty)"] = objectToRules(
  {
    " ": 0,
    "𝍩": 1,
    "𝍪": 2,
    "𝍫": 3,
    "𝍬": 4,
    卌: 5,
  },
  notMultipliers
);

rules["Tally Marks (simple)"] = objectToRules(
  {
    " ": 0,
    I: 1,
    V: 5,
  },
  notMultipliers
);

rules["Power of 2ish (made-up)"] = objectToRules(
  {
    O: 0,
    ".": 1,
    "-": 2,
    "=": 4,
    "#": 8,
    S: 16,
    $: 32,
    a: 64,
    "@": 128,
    v: 256,
    w: 512,
  },
  notMultipliers
).concat(
  objectToRules({
    x: 1024,
  })
);

rules["Simplest (Unary)"] = objectToRules(
  {
    0: 0,
    1: 1,
  },
  notMultipliers
);

rules["Not Entirely Proper French"] = objectToRules(
  {
    zero: 0,
    un: 1,
    deux: 2,
    trois: 3,
    quatre: 4,
    cinq: 5,
    six: 6,
    sept: 7,
    huit: 8,
    neuf: 9,
    dix: 10,
    onze: 11,
    douze: 12,
    treize: 13,
    quatorze: 14,
    quinze: 15,
    seize: 16,
    dixsept: 17,
    dixhuit: 18,
    dixneuf: 19,
    vingt: 20,
    trente: 30,
    quarante: 40,
    cinquante: 50,
    soixante: 60,
    quatrevingt: 80,
  },
  notMultipliers
).concat(
  objectToRules(
    powersOfTen({
      cent: 2,
      mille: 3,
      million: 6,
      milliard: 9,
      billion: 12,
      billiard: 15,
      trillion: 18,
    })
  )
);

export default rules;
