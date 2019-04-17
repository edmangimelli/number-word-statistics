import React, { Component } from 'react';
import './App.css';
import Main from './Main';

class App extends Component {
  constructor(props) {
      super();
      this.state = {
          page: Main,
      };
  }

  currentPage = () => new Map([[Main, <Main />]]).get(this.state.page);

  render() {
    return <div>{this.currentPage()}</div>;
  }
}

export default App;

const isNumber = x =>
  typeof x === 'number' &&
  !Number.isNaN(x) &&
  Number.isFinite(x);


const stringToNumber = str => {
  // return [number, OK]
  const regex = /^s*(-?\s*[1-9]\d*|(0|[1-9]\d*))(\s*(e|E)\s*(0|[1-9]\d*))?\s*$/;
  const matches = str.match(regex);
  if (!matches) return [null, false];
  const numberString = matches[0].replace(/\s/g,'');
  const number = Number(numberString);
  return [number, isNumber(number)];
}
