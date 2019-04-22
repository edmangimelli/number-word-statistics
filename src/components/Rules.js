import React, { Component } from "react";
import ControlledNumberInput from "./ControlledNumberInput";
import Input from "./Input";
import Checkbox from "./Checkbox";
import PredefinedRulesPicker from "./PredefinedRulesPicker";
import { nameOfTheCurrentRuleSet, stringToNumber } from "../helpers";

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

const stringsToParagraph = ({ heading, strings, className }) => {
  if (strings.length === 0) return null;
  return (
    <div className={className}>
      {heading}
      {strings.map(s => (
        <div style={{ color: "inherit", textAlign: "inherit" }}>{s}</div>
      ))}
    </div>
  );
};

const defaultState = {
  word: "",
  valueString: "",
  multiplier: false,
};

class Rules extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  add = () => {
    const { rules, set } = this.props;
    const { word, valueString, multiplier } = this.state;
    const [value, OK] = stringToNumber(valueString);
    if (!OK) return;
    set([...rules, { word, value, multiplier }]);
    this.setState({ valueString: null }, () => this.setState(defaultState));
  };

  render() {
    const {
      set: setRules,
      rules,
      toggle,
      show,
      setAndResetTable,
      warnings,
      errors,
    } = this.props;
    const { word, valueString, multiplier } = this.state;
    const { add } = this;
    const ruleSetName = nameOfTheCurrentRuleSet(rules);
    const noteAboutWhichRuleSetIsInUse =
      ruleSetName === null ? "(custom)" : `(using "${ruleSetName}")`;
    const listOfErrors = stringsToParagraph({
      heading: "Errors:",
      strings: errors,
      className: "error",
    });
    const listOfWarnings = stringsToParagraph({
      heading: "Warnings:",
      strings: warnings,
      className: "warning",
    });

    return (
      <div>
        <div style={{ textAlign: "right" }}>
          Rules{" "}
          <button onClick={toggle} style={{ fontSize: "80%" }}>
            ({show ? "collapse" : "expand"})
            {errors.length === 0
              ? null
              : [" ", <span className="errorColor">(!)</span>]}
          </button>
        </div>
        {show && (
          <div className="rules" style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
              <PredefinedRulesPicker
                {...{ setAndResetTable, className: "rules" }}
              />
            </div>
            <div className="note center">{` ${noteAboutWhichRuleSetIsInUse}`}</div>
            {listOfErrors}
            {listOfWarnings}
            <table>
              <thead>
                <tr>
                  <td>value</td>
                  <td>word</td>
                  <td>multiplier</td>
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
                        <Input onChange={word => set({ word })} value={word} />,
                        <Checkbox for={{ multiplier }} set={set} />,
                        <button onClick={del}>delete</button>,
                      ].map(element => (
                        <td>{element}</td>
                      ))}
                    </tr>
                  );
                })}
                <tr>
                  <td>
                    <ControlledNumberInput
                      set={valueString => this.setState({ valueString })}
                      value={valueString}
                    />
                  </td>
                  <td>
                    <Input
                      onChange={word => this.setState({ word })}
                      value={word}
                    />
                  </td>
                  <td>
                    <Checkbox for={{ multiplier }} set={this.setState} />
                  </td>
                  <td>
                    <button onClick={add}>add</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Rules;
