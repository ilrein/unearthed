import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import fetch from 'isomorphic-fetch';

import styles from './styles.scss';
import Navbar from '../ui/navbar';
import Marker from '../ui/marker';

import sample from './sample.json';

class Map extends Component {
  static defaultProps = {
    center: { lat: -46.378345, lng: -72.3007623 },
    zoom: 11
  };

  state = {
    loaded: false,
  }

  componentDidMount() {
    // fetch('https://unearthed.herokuapp.com/regions/viewRegionData.json')
    //   .then(res => console.log({
    //     res
    //   }))
  }

  render() {
    return (
      <section className={styles.wrapper}>
        <Navbar />
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {sample.mines.map((mine) =>
            <Marker
              key={mine.mine.name}
              lat={mine.mine.lat}
              lng={mine.mine.lng}
            />
          )}
        </GoogleMapReact>
      </section>
    );
  }
}

export default Map;
