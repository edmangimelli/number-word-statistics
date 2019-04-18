import { remove, stringToNumber, numberOfDigitsBeforeCursor } from "./helpers";

describe("test stringToNumber`", () => {
  it.each`
    input            | output
    ${"0"}           | ${0}
    ${"-0"}          | ${null}
    ${"0e0"}         | ${0}
    ${"1e09"}        | ${null}
    ${"9e0"}         | ${9}
    ${"9e-0"}        | ${null}
    ${"9e-8"}        | ${null}
    ${"1e6"}         | ${1000000}
    ${"  1  e  6  "} | ${1000000}
  `("should return $output when $input is the input", ({ output, input }) => {
    expect(stringToNumber(input)[0]).toEqual(output);
  });
});

describe("test remove`", () => {
  it.each`
    x       | from          | output
    ${"0"}  | ${"10000000"} | ${"1"}
    ${/e/g} | ${"eagle"}    | ${"agl"}
  `(
    "should return $output when $x is removed from $from",
    ({ x, from, output }) => {
      expect(remove(x, from)).toEqual(output);
    }
  );
});

describe("test numberOfDigitsBeforeCursor", () => {
  it.each`
    string         | position | output
    ${"123456789"} | ${4}     | ${4}
    ${"+ 1,000.0"} | ${4}     | ${1}
  `(
    "should return $output if cursor is at position $position in: $string",
    ({ string, position, output }) => {
      expect(numberOfDigitsBeforeCursor(string, position)).toEqual(output);
    }
  );
});
