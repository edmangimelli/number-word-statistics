import {isNumber, stringToNumber} from './helpers';

describe('test stringToNumber`', () => {
  it.each`
    input     | output
    ${'0'}    | ${0}
    ${'-0'}   | ${null}
    ${'0e0'}  | ${0}
    ${'1e09'} | ${null}
    ${'9e0'}  | ${9}
    ${'9e-0'} | ${null}
    ${'9e-8'} | ${null}
    ${'1e6'}  | ${1000000}
    ${'  1  e  6  '} | ${1000000}
  `('should return $output when $input is the input', ({output, input}) => {
    expect(stringToNumber(input)[0]).toEqual(output);
  });
});
