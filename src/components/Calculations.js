import React from "react";
import Input from "./Input";
import {
  isNumber,
  rangeInclusive,
  numberToWord,
  occurrencesOfSubstringArrayInStringArray,
  randomIndexer,
  arraysAreEqual,
} from "../helpers";

const numberOfTestsToRun = 5000;

const Div = ({ children }) => (
  <div className="calculation">{children || null}</div>
);
const Answer = ({ children }) => (
  <span className="answer">{children || null}</span>
);

const Calculations = ({
  min,
  max,
  rules,
  innerDelimiter,
  outerDelimiter,
  warnings,
  errors,
  soughtString,
  setSoughtString,
}) => {
  if (errors.length > 0) return null;
  const rangeInWords = rangeInclusive(min, max)
    .map(number => numberToWord(number, rules).join(innerDelimiter || ""))
    .join(outerDelimiter || "");

  const range = [...rangeInWords];
  const rangeLength = range.length;
  const sought = [...soughtString];
  const soughtLength = sought.length;

  const [occurrences, occurrencesString] = (() => {
    if (soughtLength === 0) return [null, null];
    const occurrences = occurrencesOfSubstringArrayInStringArray({
      sub: sought,
      str: range,
      subLength: soughtLength,
      strLength: rangeLength,
    });
    return [occurrences, ` (${occurrences} occurrences)`];
  })();

  const [probability, probabilityString] = (() => {
    if (occurrences === null || rangeLength === 0) return [null, "n/a"];
    const prob = occurrences / rangeLength;
    return [prob, <Answer>{`${(prob * 100).toFixed(3)} %`}</Answer>];
  })();

  const empiricalProbabilityString = (() => {
    if (
      probability === null ||
      !isNumber(numberOfTestsToRun) ||
      numberOfTestsToRun < 1
    )
      return "n/a";
    const random = randomIndexer(rangeLength);

    let numberOfTimesSoughtStringWasRandomlyFound = 0;
    for (let i = 0; i < numberOfTestsToRun; i++) {
      const rand = random();
      const current = range.slice(rand, rand + soughtLength);
      if (arraysAreEqual(current, sought))
        numberOfTimesSoughtStringWasRandomlyFound++;
    }

    const empProb =
      numberOfTimesSoughtStringWasRandomlyFound / numberOfTestsToRun;

    return [
      <Answer>{`${(empProb * 100).toFixed(3)} %`}</Answer>,
      <div className="note" style={{ textAlign: "left" }}>
        {"  "}(number of tests ran: {numberOfTestsToRun}; number of times
        substring was found: {numberOfTimesSoughtStringWasRandomlyFound})
      </div>,
    ];
  })();

  return (
    <Div>
      <Div>
        &bull; Length of range as one long string of number words ={" "}
        <Answer>{rangeLength}</Answer>
      </Div>
      <Div>
        &bull; Probability of randomly selecting a letter from the string below
        and it being the beginning of the following substring{" "}
        <Input
          onChange={setSoughtString}
          value={soughtString}
          className="soughtStringInput"
        />
        {` = `}
        {probabilityString}
        <span className="note">{occurrencesString}</span>
      </Div>
      <Div>
        &bull; <i>Empirical</i> probability (experimental probability) ={" "}
        {empiricalProbabilityString}
      </Div>
      <div className="wordWrap" style={{ marginTop: "20px" }}>
        {rangeInWords}
      </div>
    </Div>
  );
};

export default Calculations;
