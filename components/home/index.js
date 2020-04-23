import React, { Component } from 'react';
import { View } from 'react-native';
import TheMap from '../map';
import styles from './styles';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}
  render() {
    return (
      <View style={styles.container}>
        <TheMap
          updatedCoordinates={this.state.coordinates}
          encryptedLine={this.state.encryptedLine}
          turnInteriorModeOn={this.turnInteriorModeOn}
          updatedRegion={this.state.presetRegion}
          polylineVisibility={this.state.showDirectionsMenu}
          getDestinationIfSet={this.getDestinationIfSet}
          updateRegionCloser={this.updateRegionCloser}
          nearbyMarkers={this.state.nearbyMarkers}
          getBuildingInfoData={this.getBuildingInfoData}
        />
      </View>
    );
  }
}
export default Home;
