import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { Overlay, Input } from 'react-native-elements';

import i18n from 'i18n-js';

import styles from './styles';


export default class TheMap extends Component {
  /**
   * Represents a map.
   * @constructor
   */
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.onRegionChange = this.onRegionChange.bind(this);
    this.state = {
      isVisible: false,
    };
  }


  async componentDidMount() {
    const eventsJSON = await AsyncStorage.getItem('urEvent');
    this.setState({
      eventsInfo: JSON.parse(eventsJSON)
    });
  }


  /**
   *
   * @param {*} prevProps - props from previous state
   * Updates view when change detected in props
   */
  componentDidUpdate(prevProps) {
    const coordinates = this.props.updatedCoordinates;
    if (prevProps.updatedCoordinates !== coordinates) {
      this.fitScreenToPath(coordinates);
    }
  }


  /**
   *
   * @param {*} newRegion - region to update to on map
   * Update region on map
   */
  onRegionChange(newRegion) {
    region = newRegion;
  }

  /**
    * @param {boolean} boolean - True or false
    * Shows or hides the dialong box of 'Adjust time' button
    */
   showDialog=(boolean) => {
     if (this._isMounted) {
       this.setState({ isDialogVisible: boolean });
     }
   }

   // do not put conponents that dont belong to react-native-maps API inside the MapView
   render() {
     {
       let eventsArray = [];
       if (this.props.eventsArr != null) { eventsArray = this.props.eventsArr; } else if (this.state.eventsInfo != null) { eventsArray = this.state.eventsInfo; }

       var eventsFocus = eventsArray.map((event) => {
         return (
           <Circle
             key={event.textTitle + event.location}
             center={{ latitude: event.latitude, longitude: event.longitude }}
             radius={event.radius * 1000}
             fillColor="rgba(255,135,135,0.5)"
             strokeWidth={1}
           />
         );
       });
     }

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
         >
           {eventsFocus}
           <MapView.Marker
             coordinate={{ latitude: this.props.updatedRegion.latitude, longitude: this.props.updatedRegion.longitude }}
           />
         </MapView>
       </View>
     );
   }
}
