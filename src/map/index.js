import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
// import fetch from 'isomorphic-fetch';

// import Drawer from '../ui/drawer';
import Navbar from '../ui/navbar';
import Marker from '../ui/marker';

import sample from './sample.json';
import styles from './styles.scss';

class Map extends Component {
  static defaultProps = {
    center: { lat: -23.2733196, lng: -68.0025969 },
    zoom: 6
  };

  state = {
    loaded: false,
    visible: false,
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

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

        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <div className={styles.wrapper}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBm0sWmD1JQ2j4BRQaBaenY_r-qH_mDgS0' }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
              >
                {sample.mines.map((mine) =>
                  <Marker
                    key={mine.mine.name}
                    lat={mine.mine.lat}
                    lng={mine.mine.lng}
                    onClick={this.toggleVisibility}
                  />
                )}
              </GoogleMapReact>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </section>
    );
  }
}

export default Map;
