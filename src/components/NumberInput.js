import React, { Component, createRef } from "react";
import { stringToNumber, numberToString, restoreCursor } from "../helpers";

const enter = 13;

class NumberInput extends Component {
  constructor(props) {
    super(props);

    const [string] = numberToString(props.initialValue);
    this.state = {
      string,
      valid: true,
    };

    this.ref = createRef();
  }

  componentWillMount() {
    this.timer = null;
  }

  onChange = ({ target }) => {
    const string = target.value;
    clearTimeout(this.timer);
    this.setState({ string });
    this.timer = setTimeout(
      this.validateInputReturnValueToParentFormatInput,
      900
    );
  };

  onKeyDown = ({ keyCode: pressedKey }) => {
    if (pressedKey === enter)
      this.validateInputReturnValueToParentFormatInput();
  };

  validateInputReturnValueToParentFormatInput = () => {
    // validate input
    const { set } = this.props;
    const { string } = this.state;
    const [number, OK] = stringToNumber(string);
    this.setState({ valid: OK });
    if (!OK) return;
    // return value to parent
    set(number);
    // format input
    const [newString] = numberToString(number);
    const element = this.ref.current;
    const originalCursorPosition = element.selectionStart;
    this.setState({ string: newString });
    restoreCursor({
      element,
      originalCursorPosition,
      previous: string,
      current: newString,
    });
  };

  render() {
    const { string: value, valid } = this.state;
    const { onChange, onKeyDown, ref } = this;
    const className = valid ? null : "invalid";

    return (
      <input
        {...{
          ref,
          value,
          onChange,
          onKeyDown,
          ...(className && { className }),
        }}
      />
    );
  }
}

export default NumberInput;
