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
  touchable1: {
    alignItems: 'center',
    backgroundColor: '#DC493D',
    color: '#812A28',
    width: '50%',
    height: '270%',
    borderRadius: 10,
    marginRight: 1,
    bottom: 45,
    justifyContent: 'center',
  },
    touchable2: {
    alignItems: 'center',
    backgroundColor: '#DC493D',
    color: '#812A28',
    width: '50%',
    height: '270%',
    borderRadius: 10,
    marginLeft: 1,
    bottom: 45,
    justifyContent: 'center',
  }
});

export default styles;
