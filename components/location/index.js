
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { View, Image, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import getCurrentLocation from './getCurrentLocation';
import styles from './styles';
import locateMe from '../../assets/icons/locate-me.png';

export default class Location extends Component {
  /** @async
   * Will update the view to position the map at the user's current location
   *and Returns the name of building the user is currently located in (if the user is on campus) */
  async locateMe() {
    this.eventsWithinCircle(await getCurrentLocation(this));
  }

  eventsWithinCircle = async (userCurrentLocation)=>{
    let eventsInsideCircle = [];
    const evnts = await AsyncStorage.getItem('urEvent');
    const events = JSON.parse(evnts);
    console.log('here! ',events);
    if(evnts !=null && userCurrentLocation!=null){
      console.log('inside the if');
      events.forEach(event => {
        this.isWithinCircle(event.radius, [event.latitude, event.longitude], userCurrentLocation);
      });
    }
  }

  isWithinCircle = (radius, circleCenter, userCurrentLocation) =>{
    const radiusToPowerOfTwo = pow(radius,2);
    const dToPowerOfTwo = pow((userCurrentLocation[0] - circleCenter[0]),2) + pow((userCurrentLocation[1] - circleCenter[1]),2);
    return (dToPowerOfTwo <= radiusToPowerOfTwo);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.locateMe();
          }}
        >
          <Image style={styles.location} source={locateMe} />
        </TouchableOpacity>
      </View>
    );
  }
}
