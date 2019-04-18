import React, {Component} from 'react';
import {stringToNumber} from '../helpers';

class NumberInput extends Component {
  constructor(props) {
      super();

      this.state = {
          value: props.value,
          valid: true,
      };
  }

  componentWillMount() {
      this.timer = null;
  }

  onChange = ({target}) => {
      const {value} = target;
      clearTimeout(this.timer);
      this.setState({ value });
      this.timer = setTimeout(this.validateAndReturnValue, 1000);
  }

  onKeyDown = (e) => {
    if (e.keyCode === 13) this.validateAndReturnValue();
  }

  validateAndReturnValue = () => {
      const { value } = this.state;
      const [number, OK] = stringToNumber(value);
      this.setState({valid: OK});
      if (!OK) return;
      this.props.set(number);
  }


  render() {
    const { onChange, onKeyDown } = this;
    const { value, valid } = this.state;
    const className = valid ? null : 'invalid';
    return <input {...{value, onChange, onKeyDown, ...className && {className}}} />;
  }
}

export default NumberInput;
