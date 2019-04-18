import React, { Component } from 'react';
import Main from './Main';

class App extends Component {
  constructor(props) {
      super();
      this.state = {
          page: Main,
      };
  }

  currentPage = () => {
    const universalProps = {
      switcher: page => this.setState({page}),
    }

    return React.createElement(this.state.page, universalProps, null);
  }

  render() {
    return <div>{this.currentPage()}</div>;
  }
}

export default App;
