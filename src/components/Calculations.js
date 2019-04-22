import React from "react";
import { rangeInclusive, numberToWord } from "../helpers";

const Calculations = ({
  min,
  max,
  rules,
  innerDelimiter,
  outerDelimiter,
  warnings,
  errors,
}) => {
  if (errors.length > 0) return null;
  const rangeInWords = rangeInclusive(min, max)
    .map(number => numberToWord(number, rules).join(innerDelimiter || ""))
    .join(outerDelimiter || "");
  return <div className="wordWrap">{rangeInWords}</div>;
};

export default Calculations;
