import React, { Component } from 'react';

import Map from './map';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
      }}>
        <Map />
      </div>
    );
  }
}

export default App;
