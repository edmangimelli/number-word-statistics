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
          min: '',
          max: '',
          includeMin: false,
          includeMax: false,
      };
  }

  inclusiveMinMax = () => {
    // return [min, max, OK]

    let {min, max} = this.state;
    if (!isNumber(min) || !isNumber(max)) return [null, null, null];
    if (min > max) [min, max] = [max, min];
    
    const {includeMin, includeMax} = this.state;

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
      ['[', '(', 'includeMin'],
      [']', ')', 'includeMax'],
    ].map(([includeStr, excludeStr, key]) =>
      <Bracket {...{
        includeStr,
        excludeStr,
        set: x => this.setState({[key]: x}),
        get: () => this.state[key],
      }} />
    )

    const [MinInput, MaxInput] = ['min', 'max'].map(k =>
      <NumberInput set={v => this.setState({[k]: v})} />
    );

    const [min, max, hasMinAndMax] = this.exclusiveMinMax();

    console.log('state', this.state);

    return (
      <div>
        <div>{LeftBracket} {MinInput}, {MaxInput} {RightBracket}</div>
        {hasMinAndMax && <div>between {min} and {max}</div>}
      </div>
    );
  }
}

export default Main;
