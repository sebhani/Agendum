import React, {Component} from 'react'
import {Text, View} from 'react-native';
import HelpTemplate from '../helpTemplate'
import HelpInformation from '../helpInformation'
import styles from './styles'

export default class HelpPage extends Component {
    constructor() {
        super();
    }

  render() {
    return (  
      <View style = {styles.container} >
        <View style = {styles.pageHeader} >
            <Text style = {{fontSize: 35}} > Topics </Text>
        </View>
        <HelpTemplate title = "Create a new task">
          <Text>{HelpInformation.createANewTask} </Text>
      </HelpTemplate>
      <HelpTemplate title = "Calendar">
          <Text>{HelpInformation.Calendar} </Text>
      </HelpTemplate>
      </View>
    );
  }
}
