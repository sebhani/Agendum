
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { View, Image, AsyncStorage, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import getCurrentLocation from './getCurrentLocation';
import styles from './styles';
import locateMe from '../../assets/icons/locate-me.png';
import { Audio } from 'expo-av';

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

    const soundObject = new Audio.Sound();

    if(evnts !=null && userCurrentLocation!=null){
      events.forEach(event => {
        if(this.isWithinCircle(userCurrentLocation, {lat: event.latitude, lng: event.longitude}, event.radius)){
          eventsInsideCircle.push(event.textTitle);
        }
      });
    }

    if(eventsInsideCircle.length > 0){
      try {
        await soundObject.loadAsync(require('./alarm.mp3'));
        await soundObject.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
        console.log(error);
      }

      Alert.alert(`The following events have occurred: ${eventsInsideCircle.join()}`);
    }
  }


  isWithinCircle = (checkPoint, centerPoint, km) =>{
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    console.log(Math.sqrt(dx * dx + dy * dy) <= km);
    return Math.sqrt(dx * dx + dy * dy) <= km;
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
