import React from "react";
import Input from "./Input";
import { numberToWord, capitalize } from "../helpers";

const maxExampleWidth = 40;

const example = ({ func, defaultNumber, backupNumber }) => {
  const result = func(defaultNumber);
  return result.length > maxExampleWidth ? func(backupNumber) : result;
};

const SetDelimiters = props => {
  const { inner, outer, rules, errors, show, toggle } = props;
  const word = n => numberToWord(n, rules).join(inner);

  const erroneousRuleSetMessage = 'n/a (rule set has errors)';

  const [innerExample, outerExample] = errors.length === 0 ? 
    [
      example({
        func: n => `${n} = "${word(n)}"`,
        defaultNumber: 6210,
        backupNumber: 17,
      }),
      example({
        func: n => `${n}, ${n+1} = "${word(n)}${outer}${word(n + 1)}"`,
        defaultNumber: 27,
        backupNumber: 7,
      })
    ] :
    [erroneousRuleSetMessage, erroneousRuleSetMessage];

  return (
  <div>
    <div style={{textAlign: 'right'}}>
      Delimiters{" "}
      <button onClick={toggle} style={{ fontSize: "80%" }}>
        ({show ? "collapse" : "expand"})
      </button>
    </div>
    {show && <div className="delimiter" style={{margin: '20px 0px'}}>
      {[["inner", innerExample], ["outer", outerExample]].map(
        ([k, example]) => (
          <div className="delimiter">
            {`${k} delimiter: `}
            <Input
              className="delimiterInput"
              onChange={props[`set${capitalize(k)}`]}
              value={props[k]}
            />
            <span className="note"> (example: {example})</span>
          </div>
        )
      )}
    </div>}
  </div>
  );
};

export default SetDelimiters;
