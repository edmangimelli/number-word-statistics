import React from "react";
import ControlledNumberInput from "./ControlledNumberInput";
import Input from "./Input";
import Checkbox from "./Checkbox";
import PredefinedRulesPicker from "./PredefinedRulesPicker";
import { nameOfTheCurrentRuleSet } from "../helpers";

const createSetter = (rules, set, i) => obj => {
  set([
    ...rules.slice(0, i),
    { ...rules[i], ...obj },
    ...rules.slice(i + 1, rules.length),
  ]);
};

const createDeleter = (rules, set, i) => obj => {
  set([...rules.slice(0, i), ...rules.slice(i + 1, rules.length)]);
};

const Rules = ({ set: setRules, rules, toggle, show, setAndResetTable }) => {
  const ruleSetName = nameOfTheCurrentRuleSet(rules);
  const noteAboutWhichRuleSetIsInUse =
    ruleSetName === null ? "(custom)" : `(using "${ruleSetName}")`;

  const Td = ({ children }) => <td className="center">{children}</td>;

  return (
    <div style={{ marginBottom: "20px" }}>
      <div>
        Rules <button onClick={toggle} style={{fontSize: "80%"}}>({show ? 'collapse' : 'expand'})</button>
      </div>
      {show && (
        <div className="rules">
          <div style={{ marginBottom: "20px" }}>
            <PredefinedRulesPicker {...{setAndResetTable, className: "rules"}} />
          </div>
          <div className="note center">{` ${noteAboutWhichRuleSetIsInUse}`}</div>
          <table>
            <thead>
              <tr>
                <Td>value</Td>
                <Td>word</Td>
                <Td>multiplier</Td>
              </tr>
            </thead>
            <tbody>
              {rules.map(({ value, word, multiplier }, i) => {
                const set = createSetter(rules, setRules, i);
                const del = createDeleter(rules, setRules, i);
                return (
                  <tr>
                    {[
                      <ControlledNumberInput
                        set={value => set({ value })}
                        value={value}
                      />,
                      //<Input onChange={value => set({ value })} value={value} />,
                      <Input onChange={word => set({ word })} value={word} />,
                      <Checkbox for={{ multiplier }} set={set} />,
                      <button onClick={del}>delete</button>,
                    ].map(element => (
                      <td>{element}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Rules;
