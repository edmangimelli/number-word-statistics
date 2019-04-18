import React, { Component } from 'react';
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
