import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
// import fetch from 'isomorphic-fetch';

// import Drawer from '../ui/drawer';
import Navbar from '../ui/navbar';
import Marker from '../ui/marker';

import styles from './styles.scss';

class Map extends Component {
  static defaultProps = {
    center: { lat: -23.2733196, lng: -68.0025969 },
    zoom: 1
  };

  state = {
    loaded: false,
    visible: false,
    projects: [],
    currentProject: {}
  }

  toggleDrawer = currentProject =>
    this.setState({ visible: !this.state.visible, currentProject });

  componentDidMount() {
    // http://unearthed.herokuapp.com/regions/viewSAprojects.json
    // https://unearthed.herokuapp.com/regions/viewDrillings.json
    // https://unearthed.herokuapp.com/regions/viewRegionData.json
    fetch('http://unearthed.herokuapp.com/regions/viewSAprojects.json')
      .then(res => res.json())
      .then(json => this.setState({ loaded: true, projects: json }));
  }

  render() {
    return (
      this.state.loaded ?
      <section className={styles.wrapper}>
        <Navbar />

        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
            {this.state.currentProject.properties ?
              // console.log(this.state.currentProject.properties)
              Object.keys(this.state.currentProject.properties).map((prop) =>
              <Menu.Item>
                {`${prop} : ${this.state.currentProject.properties[prop]}`}
              </Menu.Item>)
              : null
            }
          </Sidebar>
          <Sidebar.Pusher>
            <div className={styles.wrapper}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBm0sWmD1JQ2j4BRQaBaenY_r-qH_mDgS0' }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
              >
                {this.state.projects.features.slice(0, 150).map((project) =>
                  <Marker
                    key={project.id}
                    lat={project.geometry.coordinates[1]}
                    lng={project.geometry.coordinates[0]}
                    onClick={() => this.toggleDrawer(project)}
                  />
                )}
              </GoogleMapReact>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </section>
      :
      <div>loading...</div>
    );
  }
}

export default Map;
