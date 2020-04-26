import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, TextInput } from 'react-native';
import {
  Text, Input,
} from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import { Dropdown } from 'react-native-material-dropdown';
import i18n from 'i18n-js';
import DatePicker from 'react-native-datepicker';
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
      unit:'km',
      // current concordia bulding tapped on
      isVisible: false,
      showDirectionsMenu: false,
      radius: 0,
      textTitle: '',
      date: '',
      events: [],
      buttonVisible: false
    };
  }

  componentDidMount() {
    if (this.props.navigation.state) {
      console.log('ay');
      this.setState({ eventsArr: '' });
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

  getDestination = (location) => {
    this.setState({ location, buttonVisible: true });
  }

  setVisibility = () => {
    this.setState({ isVisible: true });
  }

  async formatarray() {
    let r = this.state.radius;
    if (this.state.unit === 'm') { r = this.state.radius / 1000; }
    const element = {
      textTitle: this.state.textTitle,
      radius: r,
      date: this.state.date,
      location: this.state.location,
      latitude: this.state.presetRegion.latitude,
      longitude: this.state.presetRegion.longitude
    };
    this.state.events.push(element);
    let urEvents = this.state.events;
    const myStore = await AsyncStorage.getItem('urEvent');
    if (myStore != null) { urEvents = [...JSON.parse(myStore), ...this.state.events]; }

    this.setState({ eventsArr: urEvents });
    await AsyncStorage.setItem('urEvent', JSON.stringify(urEvents));
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
          eventsArr={this.state.eventsArr ? this.state.eventsArr : null}
        />
        {!this.state.showDirectionsMenu && (
        <MapSearchBar
          getDestinationIfSet={this.getDestinationIfSet}
          navigation={this.props.navigation}
          updateRegion={this.updateRegion}
          changeVisibilityTo={this.changeVisibilityTo}
          getDestination={this.getDestination}
        />
        )}
        <Location
          updateRegion={this.updateRegion}
        />
        {this.state.isVisible && (
        <View style={{
          position: 'absolute', height: 430, width: 320, padding: 20, borderRadius: 10, backgroundColor: 'white'
        }}
        >
          <Text
            h5
            style={{
              textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: 8
            }}
          >
            Enter the information about your event
          </Text>
          <Input
            placeholder="Enter Event Title"
            onChangeText={(text) => { this.setState({ textTitle: text }); }}
          />
          <View style={{
            top: 20, justifyContent: 'center', alignItems: 'center', paddingBottom: 50
          }}
          >
            <Text style={{ marginBottom: 6 }}>
              Location:
              {' '}
              {this.state.location}
            </Text>
            <Text h5 style={{ fontSize: 16, fontWeight: 'bold' }}>Set radius for notification</Text>
            <View style={{borderColor: 'black'}}>
            <View style={{borderWidth:1, borderColor:'black',borderRadius:5,padding:10,right: '10%'}}>
            <TextInput
              placeholder = "0 km"
              keyboardType={'numeric'}
              onChangeText={(radius) => { this.setState({ radius }); }}
            />
            </View>
            <View style={{width: 50, top: '-60%', left: '10%'}}>
            <Dropdown
              style={{width: 10}}
              value={this.state.unit}
              data={[{value:'km'},{value: 'm'}]}
              onChangeText={ (unit) => {this.setState({unit}); }}
            />
            </View>
            </View>
          </View>
          <View>
            <DatePicker
              iosMode
              style={{ width: 280, bottom:'180%' }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate={new Date()}
              maxDate="2021-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                datePickerCon: { backgroundColor: 'black' },
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 30,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ date }); }}
            />
          </View>
          <Text style={{ marginTop: 6, bottom: '15%' }}>you can check this event in the calendar</Text>
          <View>
            <View style={{flexDirection: 'row', position: 'absolute', top: '90%' }}>
              <TouchableOpacity
                style={styles.touchable1}
                onPress={() => {
                  this.setState({ isVisible: false, buttonVisible: false });
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.touchable2}
                onPress={() => {
                  this.formatarray();
                  this.setState({ isVisible: false, buttonVisible: false });
                }}
              >
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        ) }
        {this.state.buttonVisible && (<AddButton setVisibility={this.setVisibility} />)}

      </View>
    );
  }
}
export default Home;
