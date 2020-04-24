import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Overlay, Text, Input, Button
} from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import TheMap from '../map';

import MapSearchBar from '../mapSearchBar';
import Location from '../location';
import AddButton from '../addButton';
import styles from './styles';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set Initial region of the map
      coordinates: [],
      presetRegion: {
        latitude: 45.492408,
        longitude: -73.582153,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
      },
      // current concordia bulding tapped on
      isVisible: true,
      showDirectionsMenu: false,
    };
  }

  componentDidMount() {
    if (this.props.navigation.state) {
      this.getCalDirections();
    }
  }


  /**
   * gets new region from 'OutdoorDirections' component and updates region state
   * @param {object} region - New region to be passed.
   */
  getRegionFromOutdoorDirections = (region) => {
    this.updateRegion(region);
  };


  /**
   * gets new coordinates from 'OutdoorDirections' component and updates coordinates state
   * @param {object} coordinates - New coordinates to be passed.
   */
  getCoordinatesFromOutdoorDirections = (coordinates) => {
    this.updateCoordinates(coordinates);
  };


  /**
   * Changes visibility of directions search menus depending on context
   * @param {*} showDirectionsMenu - desired visibility boolean
   */
  changeVisibilityTo = (showDirectionsMenu) => {
    this.setState({
      showDirectionsMenu
    });
  };


  /**
   * updates coordinates and passes new coordinates 'Map' component.
   * @param {object} newCoordinates - New coordinates to be passed.
   */
  updateCoordinates = (newCoordinates) => {
    this.setState({
      coordinates: newCoordinates
    });
  };


  /**
   * updates region and passes the new region 'map' component.
   * @param {object} newRegion - New region to be passed.
   */
  updateRegion = (newRegion) => {
    this.setState({
      presetRegion: {
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }
    });
  };


  updateRegionCloser = (newRegion) => {
    this.setState({
      presetRegion: {
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* zIndex=1 */}
        <TheMap
          updatedCoordinates={this.state.coordinates}
          updatedRegion={this.state.presetRegion}
          getDestinationIfSet={this.getDestinationIfSet}
          updateRegionCloser={this.updateRegionCloser}
        />
        {!this.state.showDirectionsMenu && (
        <MapSearchBar
          getDestinationIfSet={this.getDestinationIfSet}
          navigation={this.props.navigation}
          updateRegion={this.updateRegion}
          changeVisibilityTo={this.changeVisibilityTo}
        />
        )}
        <Location
          updateRegion={this.updateRegion}
        />
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          height="40%"
        >
          <Text h5 style={{ textAlign: 'center', fontSize: 16 }}>Enter the information about your event</Text>
          <Input
            placeholder="Enter Event Title"
          />
          <View style={{
            top: 20, justifyContent: 'center', alignItems: 'center', paddingBottom: 50
          }}
          >
            <NumericInput
              styles={{ top: 20 }}
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor="#EA3788"
              leftButtonBackgroundColor="#E56B70"
              totalWidth={190}
              totalHeight={45}
              iconSize={25}
              rounded
              minValue={0}
              onChange={(value) => { return console.log(value); }}
            />
          </View>
          <View styles={{ top: 90 }}>
            <TouchableOpacity style={{
              alignItems: 'center',
              backgroundColor: '#DDDDDD',
              padding: 10
            }}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
        <AddButton />

      </View>
    );
  }
}
export default Home;
