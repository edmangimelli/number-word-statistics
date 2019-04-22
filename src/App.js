import React, { Component } from "react";
import Rules from "./components/Rules";
import Bracket from "./components/Bracket";
import ControlledNumberInput from "./components/ControlledNumberInput";
import Calculations from "./components/Calculations";
import SetDelimiters from "./components/SetDelimiters";
import { isNumber, warningsAndErrorsForRuleSet } from "./helpers";
import predefinedRules from "./predefinedRules";

class App extends Component {
  constructor(props) {
    super(props);

    const {
      left = 1,
      right = 123,
      includeLeft = false,
      includeRight = false,
      showRules = null,
      showDelimiters = null,
      rules = predefinedRules[
        "Short Scale (US, Eastern Europe, English Canadian, Australian, and modern British)"
      ],
      innerDelimiter = "",
      outerDelimiter = "",
      soughtString = "e",
    } = props;

    this.state = {
      left,
      right,
      includeLeft,
      includeRight,
      showRules,
      showDelimiters,
      rules,
      innerDelimiter,
      outerDelimiter,
      soughtString,
    };
  }

  inclusiveMinMax = () => {
    // return [min, max, OK]
    const { left, right, includeLeft, includeRight } = this.state;

    if (!isNumber(left) || !isNumber(right)) return [null, null, null];

    const [min, max, includeMin, includeMax] =
      left <= right
        ? [left, right, includeLeft, includeRight]
        : [right, left, includeRight, includeLeft];

    const includedMin = min + (includeMin ? 0 : 1);
    const includedMax = max - (includeMax ? 0 : 1);

    if (includedMin > includedMax) return [null, null, null];

    return [includedMin, includedMax, true];
  };

  exclusiveMinMax = () => {
    const inclusiveAnswer = this.inclusiveMinMax();
    const [min, max, OK] = inclusiveAnswer;
    if (!OK) return inclusiveAnswer;
    return [min - 1, max + 1, OK];
  };

  rules = ({ warnings, errors }) => {
    const { rules, showRules } = this.state;
    return (
      <Rules
        set={rules => this.setState({ rules })}
        setAndResetTable={rules =>
          this.setState({ rules, showRules: false }, () =>
            this.setState({ showRules: true })
          )
        }
        rules={rules}
        show={showRules}
        toggle={() => this.setState({ showRules: !showRules || null })}
        warnings={warnings}
        errors={errors}
      />
    );
  };

  range = () => {
    const [LeftBracket, RightBracket] = [
      ["[", "(", "Left"],
      ["]", ")", "Right"],
    ].map(([includeStr, excludeStr, side]) => {
      const key = `include${side}`;
      return (
        <Bracket
          {...{
            includeStr,
            excludeStr,
            set: x => this.setState({ [key]: x }),
            get: () => this.state[key],
          }}
        />
      );
    });

    const [LeftInput, RightInput] = ["left", "right"].map(k => (
      <ControlledNumberInput
        set={v => this.setState({ [k]: v })}
        value={this.state[k]}
      />
    ));

    return (
      <div>
        {LeftBracket} {LeftInput}, {RightInput} {RightBracket}
      </div>
    );
  };

  rangeDescription = () => {
    const [min, max, OK] = this.exclusiveMinMax();
    if (!OK)
      return (
        <div className="note" style={{ marginBottom: "20px" }}>
          (invalid range)
        </div>
      );

    const format = n => n.toLocaleString();
    const [formattedMin, formattedMax] = [min, max].map(format);
    return (
      <div style={{ marginBottom: "20px" }}>
        between {formattedMin} and {formattedMax}{" "}
        <span className="note">
          (strictly between; {formattedMin} to {formattedMax} excluding{" "}
          {formattedMin} and {formattedMax})
        </span>
      </div>
    );
  };

  setDelimiters = ({ errors }) => {
    const {
      innerDelimiter: inner,
      outerDelimiter: outer,
      rules,
      showDelimiters,
    } = this.state;
    return (
      <SetDelimiters
        {...{
          inner,
          outer,
          setInner: innerDelimiter => this.setState({ innerDelimiter }),
          setOuter: outerDelimiter => this.setState({ outerDelimiter }),
          rules,
          errors,
          show: showDelimiters,
          toggle: () =>
            this.setState({ showDelimiters: !showDelimiters || null }),
        }}
      />
    );
  };

  calculations = ({ warnings, errors }) => {
    const { rules, innerDelimiter, outerDelimiter, soughtString } = this.state;
    const [min, max, OK] = this.inclusiveMinMax();
    if (!OK) return null;
    return (
      <Calculations
        {...{
          min,
          max,
          rules,
          innerDelimiter,
          outerDelimiter,
          warnings,
          errors,
          soughtString,
          setSoughtString: soughtString => this.setState({ soughtString }),
        }}
      />
    );
  };

  render() {
    const {
      rules,
      range,
      rangeDescription,
      setDelimiters,
      calculations,
    } = this;
    const warningsAndErrors = warningsAndErrorsForRuleSet(this.state.rules);
    return (
      <div>
        {rules(warningsAndErrors)}
        {setDelimiters(warningsAndErrors)}
        {range()}
        {rangeDescription()}
        {calculations(warningsAndErrors)}
      </div>
    );
  }
}

export default App;
