import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

class addButton extends Component {
  back() {
    if (this.props.withRedux) {
      this.props.resetNavigation();
    }
    this.props.changeVisibilityTo(false);
    if (this.props.changePolylineVisibilityTo) {
      this.props.changePolylineVisibilityTo(false);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => {
        }}
        >
          <Ionicons name="ios-add" size={42} color="#812A28" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default addButton;
