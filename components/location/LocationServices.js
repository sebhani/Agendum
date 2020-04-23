/* istanbul ignore file */
import i18n from 'i18n-js';
import * as Permissions from 'expo-permissions';
import * as ExpoLocation from 'expo-location';
import { Alert, Linking } from 'react-native';

async function getCurrentLocation(object) {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        displayErrorAlert();
        return;
    }
    const location = await ExpoLocation.getCurrentPositionAsync({});
    object.setState({
        region: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }
    }, () => { object.props.updateRegion(object.state.region); });
}

function displayErrorAlert() {
    Alert.alert(i18n.t('LOCATION_ALERT_TITLE'),
        i18n.t('LOCATION_ALERT_MESSAGE'),
        [
            { text: i18n.t('LOCATION_ALERT_BUTTON'), onPress: () => { Linking.openURL('app-settings:'); } }
        ]);
}

export default getCurrentLocation;