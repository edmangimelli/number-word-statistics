import React, { Component } from "react";
import "./Main.css";
import Rules from './Rules';
import Bracket from "./components/Bracket";
import NumberInput from "./components/NumberInput";
import { isNumber, isString } from "./helpers";

class App extends Component {
  constructor(props) {
    super(props);

    const {
      left = "",
      right = "",
      includeLeft = false,
      includeRight = false,
      rulesExpanded = false,
      rules = Object.entries({
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
        20: "twenty",
        30: "thirty",
        40: "forty",
        50: "fifty",
        60: "sixty",
        70: "seventy",
        80: "eighty",
        90: "ninety",
        100: { word: "hundred", multiplier: true },
        1000: { word: "thousand", multiplier: true },
        1000000: { word: "million", multiplier: true },
        1000000000: { word: "billion", multiplier: true },
        1000000000000: { word: "trillion", multiplier: true },
      }).map(([k, v]) => ({ value: k, ...(isString(v) ? { word: v } : v) })),
    } = props;

    this.state = {
      left,
      right,
      includeLeft,
      includeRight,
      rulesExpanded,
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
    console.log(min, max, includeMin, includeMax);

    return [min + (includeMin ? 0 : 1), max - (includeMax ? 0 : 1), true];
  };

  exclusiveMinMax = () => {
    const inclusiveAnswer = this.inclusiveMinMax();
    const [min, max, OK] = inclusiveAnswer;
    if (!OK) return inclusiveAnswer;
    return [min - 1, max + 1, OK];
  };

  rules = () => (
    <div>
      {this.state.settingsExpanded ? (
        <Rules
          set={rules => this.setState({ rules })}
          get={this.state.rules}
          collapse={() => this.setState({ rulesExpanded: false })}
        />
      ) : (
        <button onClick={() => this.setState({ rulesExpanded: true })}>
          Rules
        </button>
      )}
    </div>
  );

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
    return (
      <div>
        between {min} and {max}
      </div>
    );
  };

  render() {
    const { rules, range, rangeDescription } = this;
    //console.log('state', this.state);
    return (
      <div>
        {rules()}
        {range()}
        {rangeDescription()}
      </div>
    );
  }
}

export default App;
