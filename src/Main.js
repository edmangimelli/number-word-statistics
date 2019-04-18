import React, { Component } from 'react';
import './Main.css';
import Bracket from './components/Bracket';
import NumberInput from './components/NumberInput';
import {isNumber} from './helpers';


class Main extends Component {
  constructor(props) {
      super();

      this.state = {
          value: props.value,
          left: '',
          right: '',
          includeLeft: false,
          includeRight: false,
      };
  }

  inclusiveMinMax = () => {
    // return [min, max, OK]
    const {left, right, includeLeft, includeRight} = this.state;

    if (!isNumber(left) || !isNumber(right)) return [null, null, null];

    const [min, max, includeMin, includeMax] = left <= right ?
      [left, right, includeLeft, includeRight] :
      [right, left, includeRight, includeLeft];
    console.log(min, max, includeMin, includeMax);

    return [
      min + (includeMin ? 0 : 1),
      max - (includeMax ? 0 : 1),
      true
    ]
  }

  exclusiveMinMax = () => {
    const inclusiveAnswer = this.inclusiveMinMax();
    const [min, max, OK] = inclusiveAnswer;
    if (!OK) return inclusiveAnswer;
    return [min - 1, max + 1, OK];
  }

  render() {

    const [LeftBracket, RightBracket] = [
      ['[', '(', 'Left'],
      [']', ')', 'Right'],
    ].map(([includeStr, excludeStr, side]) => {
      const key = `include${side}`;
      return <Bracket {...{
        includeStr,
        excludeStr,
        set: x => this.setState({[key]: x}),
        get: () => this.state[key],
      }} />;
    })

    const [LeftInput, RightInput] = ['left', 'right'].map(k =>
      <NumberInput set={v => this.setState({[k]: v})} name={k} />
    );

    const [min, max, hasMinAndMax] = this.exclusiveMinMax();

    console.log('state', this.state);

    return (
      <div>
        <div>{LeftBracket} {LeftInput}, {RightInput} {RightBracket}</div>
        {hasMinAndMax && <div>between {min} and {max}</div>}
      </div>
    );
  }
}

export default Main;
