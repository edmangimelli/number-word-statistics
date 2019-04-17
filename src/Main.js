import React, { Component } from 'react';
import './Main.css';
import Bracket from './components/Bracket';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class Main extends Component {
  constructor(props) {
      super();

      this.state = {
          value: props.value,
          includeMin: false,
          includeMax: false,
      };
  }

  componentWillMount() {
      this.timer = null;
  }

  handleChange = (value) => {
      clearTimeout(this.timer);

      this.setState({ value });

      this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  }

  handleKeyDown = (e) => {
      if (e.keyCode === ENTER_KEY) {
          this.triggerChange();
      }
  }

  triggerChange = () => {
      const { value } = this.state;

      this.props.onChange(value);
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

    console.log('state', this.state);

    return (
      <div>
        {LeftBracket} <input />, <input /> {RightBracket}
      </div>
    );
  }
}

export default Main;
