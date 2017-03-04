import React, { Component } from 'react';

import * as d3 from 'd3';

class App extends Component {
  componentDidMount() {
    d3.select('.app').append('svg');
  }

  render() {
    console.log(d3);
    return (
      <div className="app" />
    );
  }
}

export default App;
