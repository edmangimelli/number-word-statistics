import React from "react";
import { rangeInclusive, numberToWord } from "../helpers";

const Calculations = ({min, max, rules}) => {
  const rangeInWords = rangeInclusive(min, max).map(number =>
    numberToWord(number, rules)
      //.split(" ")
      //.join("")
  ).join(', ');
  return <div className='wordWrap'>{rangeInWords}</div>;
};

export default Calculations;
