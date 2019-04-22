import React, { Component, createRef } from "react";
import { stringToNumber, numberToString, restoreCursor } from "../helpers";

const enter = 13;

class ControlledNumberInput extends Component {
  constructor(props) {
    super(props);

    const [string] = numberToString(props.value);
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
    const element = this.ref.current;
    const originalCursorPosition = element.selectionStart;
    this.setState(
      { string, previousPropsValue: this.props.value },
      () => {

    window.requestAnimationFrame(() => {
      element.selectionStart = element.selectionEnd = originalCursorPosition;
    });
      });

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
    const element = this.ref.current;
    const originalCursorPosition = element && element.selectionStart;
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
    this.setState({ string: newString });
    if (!element) return;
    restoreCursor({
      element,
      originalCursorPosition,
      previous: string,
      current: newString,
    });
  };

  render() {
    const { value } = this.props;
    const { string: previousString, valid, previousPropsValue } = this.state;
    const { onChange, onKeyDown, ref } = this;
    const className = valid ? null : "invalid";

    const [string] = numberToString(value);
    if (string !== previousString && value !== previousPropsValue) {
      this.setState({ string, previousPropsValue: value });
    }

    return (
      <input
        {...{
          ref,
          value: previousString,
          onChange,
          onKeyDown,
          ...(className && { className }),
        }}
      />
    );
  }
}

export default ControlledNumberInput;
