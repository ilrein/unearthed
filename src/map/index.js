import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Sidebar, Menu } from 'semantic-ui-react'
// import fetch from 'isomorphic-fetch';

import Toggler from '../ui/toggler';
import Navbar from '../ui/navbar';
import Marker from '../ui/marker';

import deposit from '../ui/icons/deposit.svg';
import operation from '../ui/icons/operation.svg';
import miner from '../ui/icons/miner.svg';
import styles from './styles.scss';

const clean = str => str.split('.').join(' ');

function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    // zoomControlOptions: {
    //   position: maps.ControlPosition.RIGHT_CENTER,
    //   style: maps.ZoomControlStyle.SMALL
    // },
    // mapTypeControlOptions: {
    //   position: maps.ControlPosition.TOP_RIGHT
    // },
    // mapTypeControl: true
    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
  };
}

class Map extends Component {
  static defaultProps = {
    center: { lat: -23.2733196, lng: -68.0025969 },
    zoom: 1,
  };

  state = {
    visible: false,
    currentProject: {},
    currentType: null,
    projects: {
      show: true,
      loaded: false,
      data: {}
    },
    construction: {
      show: true,
      loaded: false,
      data: {}
    },
    operation: {
      show: true,
      loaded: false,
      data: {}
    }
  }

  toggleDrawer = (currentProject, currentType) =>
    this.setState({ visible: true, currentProject, currentType });

  toggleOperation = () =>
    this.setState({ operation: { ...this.state.operation, show: !this.state.operation.show } }, () => console.log(this.state.operation), () => console.log(this.state.operation));

  toggleProjects = () =>
    this.setState({ projects: { ...this.state.projects, show: !this.state.projects.show } }, () => console.log(this.state.operation), () => console.log(this.state.operation));

  toggleConstruction = () =>
    this.setState({ construction: { ...this.state.construction, show: !this.state.construction.show } }, () => console.log(this.state.operation), () => console.log(this.state.operation));

  componentDidMount() {
    // http://unearthed.herokuapp.com/regions/viewSAprojects.json
    // https://unearthed.herokuapp.com/regions/viewDrillings.json
    // https://unearthed.herokuapp.com/regions/viewRegionData.json
    fetch('https://raw.githubusercontent.com/ChalkyBrush/unearthed17/master/app/assets/ProjectSA_geojson.json')
      .then(res => res.json())
      .then(json => {
        this.setState(
          { projects: {
            loaded: true,
            data: json,
            show: true,
          } }
        )
      });

    fetch('https://raw.githubusercontent.com/ChalkyBrush/unearthed17/master/app/assets/PropertiesConstruction_geojson.json')
      .then(res => res.json())
      .then(json => {
        this.setState(
          { construction: {
            loaded: true,
            data: json,
            show: true,
          } }
        )
      });

    fetch('https://raw.githubusercontent.com/ChalkyBrush/unearthed17/master/app/assets/PropertiesOperation_geojson.json')
      .then(res => res.json())
      .then(json => {
        this.setState(
          { operation: {
            loaded: true,
            data: json,
            show: true,
          } }
        )
      });
  }

  render() {
    return (
      <section className={styles.wrapper}>
        <Navbar />

        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            width="thin"
            visible={this.state.visible}
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item className={styles.title}>
              {this.state.currentType}
            </Menu.Item>
            {this.state.currentProject.properties ?
              Object.keys(this.state.currentProject.properties).map((prop, index) =>
              <Menu.Item key={index}>
                <small>{`${clean(prop)}`}</small>
                <hr className={styles.hr} />
                <small>{`${this.state.currentProject.properties[prop]}`}</small>
              </Menu.Item>)
              : null
            }
          </Sidebar>
          <Sidebar.Pusher>
            <div className={styles.wrapper}>
              <Toggler
                onToggleOperation={this.toggleOperation}
                onToggleProject={this.toggleProjects}
                onToggleConstruction={this.toggleConstruction}
              />
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBm0sWmD1JQ2j4BRQaBaenY_r-qH_mDgS0' }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                options={createMapOptions}
              >
                {this.state.projects.loaded && this.state.projects.show ?
                  this.state.projects.data.features.slice(0, 150).map((project) =>
                    <Marker
                      key={project.id}
                      icon={deposit}
                      lat={project.geometry.coordinates[1]}
                      lng={project.geometry.coordinates[0]}
                      onClick={() => this.toggleDrawer(project, 'Project')}
                    />
                  )
                  :
                  null
                }

                {this.state.construction.loaded && this.state.construction.show ?
                  this.state.construction.data.features.slice(0, 150).map((project) =>
                    <Marker
                      key={project.id}
                      icon={miner}
                      lat={project.geometry.coordinates[1]}
                      lng={project.geometry.coordinates[0]}
                      onClick={() => this.toggleDrawer(project, 'Construction')}
                      bgColor="yellow"
                      size="small"
                    />
                  )
                  :
                  null
                }

                {this.state.operation.loaded && this.state.operation.show ?
                  this.state.operation.data.features.slice(0, 150).map((project) =>
                    <Marker
                      key={project.id}
                      icon={operation}
                      lat={project.geometry.coordinates[1]}
                      lng={project.geometry.coordinates[0]}
                      onClick={() => this.toggleDrawer(project, 'Operation')}
                      bgColor="purple"
                      size="small"
                    />
                  )
                  :
                  null
                }
              </GoogleMapReact>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </section>
    );
  }
}

export default Map;
