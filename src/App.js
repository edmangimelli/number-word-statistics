import React, { Component } from "react";
import "./Main.css";
import Bracket from "./components/Bracket";
import NumberInput from "./components/NumberInput";
import { isNumber } from "./helpers";

class App extends Component {
  constructor(props) {
    super(props);

    const {
      left = "",
      right = "",
      includeLeft = false,
      includeRight = false,
      rulesExpanded = false,
      rules = {
      },
    } = props;

    this.state = {
      left,
      right,
      includeLeft,
      includeRight,
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

  rules = () => <div>{
    this.state.settingsExpanded ? (
      <Rules
        set={rules => this.setState({ rules })}
        get={this.state.rules}
        collapse={() => this.setState({ rulesExpanded: false })}
      />
    ) : (
      <button onClick={() => this.setState({ rulesExpanded: true })}>
        Rules
      </button>
    )
  }</div>;

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
    return <div>between {min} and {max}</div>;
  }

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
