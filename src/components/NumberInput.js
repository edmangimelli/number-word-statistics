import React, { Component } from "react";
import {
  stringToNumber,
  formatNumber,
  numberOfDigitsBeforeCursor,
  positionOfCursorIfItWasAfterXNumberOfDigits,
} from "../helpers";

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

  onChange = ({ target }) => {
    const { value } = target;
    clearTimeout(this.timer);
    this.setState({ value });
    this.timer = setTimeout(this.validateInputReturnValueToParentFormatInput, 900);
  };

  onKeyDown = e => {
    if (e.keyCode === 13) this.validateInputReturnValueToParentFormatInput();
  };

  validateInputReturnValueToParentFormatInput = () => {
    // validate input
    const { value } = this.state;
    const [number, OK] = stringToNumber(value);
    this.setState({ valid: OK });
    if (!OK) return;
    // return value to parent
    this.props.set(number);
    // format input
    const formatted = formatNumber(number);
    const element = this.refs[this.props.name];
    const originalCursorPosition = element.selectionStart;
    this.setState({ value: formatted });
    this.restoreCursor({
      element,
      originalCursorPosition,
      previous: value,
      current: formatted,
    });
  };

  restoreCursor = ({element, originalCursorPosition, previous, current}) => {
    const numberOfDigits = numberOfDigitsBeforeCursor(
      previous,
      originalCursorPosition
    );
    console.log('numberOfDigits', numberOfDigits);
    const newCursorPosition = positionOfCursorIfItWasAfterXNumberOfDigits(
      current,
      numberOfDigits
    );
    console.log('newCursorPosition', newCursorPosition);
    window.requestAnimationFrame(
      () => {
        element.selectionStart = element.selectionEnd = newCursorPosition;
      }
    );
  };

  render() {
    const { onChange, onKeyDown } = this;
    const { value, valid } = this.state;
    const { name } = this.props;
    const className = valid ? null : "invalid";
    return (
      <input
        {...{
          value,
          onChange,
          onKeyDown,
          ...(className && { className }),
          ref: name,
        }}
      />
    );
  }
}

export default NumberInput;
