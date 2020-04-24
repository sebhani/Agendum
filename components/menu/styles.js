import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  logo: {
    width: 200,
    top: 80,
    left: 10,
    resizeMode: 'contain',
    position: 'absolute',
    color:'#191BA9',
    fontSize: 40,
    fontWeight: 'bold',
    borderWidth: 5,
    borderRadius: 20,
    borderColor: '#191BA9',
  },
  options: {
    position: 'absolute',
    top: '20%',
    left: 0,
    paddingLeft: 20,
  },
  option: {
    paddingBottom: 20,
    textAlign: 'left',
    fontSize: 30,
  },
  help: {
    position: 'absolute',
    top: '100%',
    left: 0,
    paddingLeft: 20,
    fontSize: 30,
  }
});

export default styles;
