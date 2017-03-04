import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import Navbar from '../ui/navbar';
import styles from './styles.scss';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11
  };

  render() {
    return (
      <section className={styles.wrapper}>
        <Navbar />
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </section>
    );
  }
}

export default Map;
