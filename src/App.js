import React, { Component } from "react";
import "./Main.css";
import Rules from "./components/Rules";
import Bracket from "./components/Bracket";
import NumberInput from "./components/NumberInput";
import Calculations from "./components/Calculations";
import { isNumber, numberToString, numberToWord } from "./helpers";
import predefinedRules from "./rules";

class App extends Component {
  constructor(props) {
    super(props);

    const {
      left = "",
      right = "",
      includeLeft = false,
      includeRight = false,
      showRules = null,
      rules = predefinedRules["short scale (US)"],
    } = props;

    this.state = {
      left,
      right,
      includeLeft,
      includeRight,
      showRules,
      rules,
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

    return [min + (includeMin ? 0 : 1), max - (includeMax ? 0 : 1), true];
  };

  exclusiveMinMax = () => {
    const inclusiveAnswer = this.inclusiveMinMax();
    const [min, max, OK] = inclusiveAnswer;
    if (!OK) return inclusiveAnswer;
    return [min - 1, max + 1, OK];
  };

  rules = () => {
    const { rules, showRules } = this.state;
    return (
      <Rules
        set={rules => this.setState({ rules })}
        setAndResetTable={rules => this.setState(
          { rules, showRules: false },
          () => this.setState({showRules: true})
        )}
        rules={rules}
        show={showRules}
        toggle={() => this.setState({ showRules: !showRules || null })}
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
      <NumberInput set={v => this.setState({ [k]: v })} name={k} />
    ));

    return (
      <div>
        {LeftBracket} {LeftInput}, {RightInput} {RightBracket}
      </div>
    );
  };

  rangeDescription = () => {
    const [min, max, OK] = this.exclusiveMinMax();
    if (!OK) return null;
    const format = n => n.toLocaleString();
    const [formattedMin, formattedMax] = [min, max].map(format);
    return (
      <div>
        between {formattedMin} and {formattedMax}
      </div>
    );
  };

  render() {
    const { range, rangeDescription } = this;
    const {rules} = this.state;
    console.log("state", this.state);
    const [min, max, OK] = this.inclusiveMinMax();
    return (
      <div>
        {this.rules()}
        {range()}
        {rangeDescription()}
        {OK && <Calculations {...{min, max, rules}} />}
      </div>
    );
  }
}

export default App;
