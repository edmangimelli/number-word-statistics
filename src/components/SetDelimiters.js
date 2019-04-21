import React, { Component, createRef } from "react";
import Input from "./Input";
import { numberToWord, capitalize } from "../helpers";

const SetDelimiters = props => {
  const { inner, outer, rules } = props;
  const word = n => numberToWord(n, rules);
  return (
    <div>
      {[
        ["inner", word(6210).join(inner)],
        ["outer", `${word(28).join(inner)}${outer}${word(27).join(inner)}`],
      ].map(([k, example]) => (
        <div>
          {`${k} delimiter: `}
          <Input
            onChange={props[`set${capitalize(k)}`]}
            value={props[k]}
            name={k}
          />
          <span className="note"> (example: "{example}")</span>
        </div>
      ))}
    </div>
  );
};

export default SetDelimiters;
