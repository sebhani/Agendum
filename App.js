import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import i18n from 'i18n-js';
import Home from './components/home';


const Stack = createStackNavigator();
console.disableYellowBox = true;
export default class App extends Component {
  render() {
    return (
      <SafeAreaView
        forceInset={{ top: 'always' }}
        style={{ backgroundColor: '#212121', flex: 1 }}
      >

        <Provider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                title: '',
                headerStyle: {
                  backgroundColor: '#F5FCFF',
                  shadowColor: 'transparent',
                },
                headerTintColor: '#808080',
                headerBackTitleStyle: {
                  fontSize: 25
                },
                headerBackTitle: i18n.t('back')
              }}
            >
              <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    );
  }
}
