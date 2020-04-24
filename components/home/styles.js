import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    position: 'absolute',
    bottom: 30,
  },
  touchable: {
    alignItems: 'center',
    backgroundColor: 'rgba(156,211,215,0.95)',
    width: '50%',
    height: '270%',
    bottom: 45,
    justifyContent: 'center',
  }
});

export default styles;
