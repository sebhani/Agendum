import React, { Component } from 'react';
import { View, Image } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './styles';

let region = '';

export default class TheMap extends Component {
  /**
   * Represents a map.
   * @constructor
   */
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.focusOnBuilding = this.focusOnBuilding.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  /**
   * Sets the mapRef when the component is mounted
   */
  componentDidMount() {
    this.setState({ mapRef: this.mapRef });
  }

  /**
   *
   * @param {*} newRegion - region to update to on map
   * Update region on map
   */
  onRegionChange(newRegion) {
    region = newRegion;
  }


  // do not put conponents that dont belong to react-native-maps API inside the MapView
  render() {

    const currRef = (ref) => { this.mapRef = ref; };
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation
          followsUserLocation
          ref={currRef}
          provider={PROVIDER_GOOGLE}
          key="map"
          region={this.props.updatedRegion}
          onRegionChange={this.onRegionChange}
          style={styles.mapStyle}
          onPoiClick={this.selectPoi}
        >
          {this.props.polylineVisibility && (
          <Polyline
            coordinates={this.props.updatedCoordinates ? this.props.updatedCoordinates : []}
            strokeWidth={4}
            strokeColor="black"
          />
          )}
          {
            // Add different colored marker at location if nothing is nearby
            this.props.nearbyMarkers.length > 0
              ? this.props.nearbyMarkers.map((marker) => {
                return (
                  <MapView.Marker
                    key={marker.id}
                    coordinate={marker.coordinates}
                    title={marker.title}
                    description={marker.description}
                  />
                );
              }) : (
                <MapView.Marker
                  pinColor="#84ECED"
                  coordinate={{
                    latitude: this.props.updatedRegion.latitude,
                    longitude: this.props.updatedRegion.longitude
                  }}
                  title=""
                  description=""
                >
                </MapView.Marker>

              )
          }
        </MapView>
      </View>
    );
  }
}
