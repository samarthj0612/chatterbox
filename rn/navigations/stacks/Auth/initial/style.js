import { StyleSheet } from 'react-native';

const styleheet = () => {
  return StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      flexDirection: 'column-reverse',
      justifyContent: 'start',
      alignItems: 'center',
    },

    welcmText: {
      fontSize: 30,
      color: 'white',
      marginBottom: 10,
      letterSpacing: 2,
      textShadowRadius: 15,
      textShadowColor: '#493F40',
      textShadowOffset: { height: 0, width: 0 },
    },

    container: {
      width: '100%',
      padding: 30,
      margin: 30,
      alignItems: 'center',
    },

    rightArrIcon: {
      height: 20,
      width: 30,
    },

    continueBtn: {
      width: '100%',
      backgroundColor: '#493F40',
      borderWidth: 1,
      borderColor: '#FFFCED',
      borderRadius: 10,
      textAlign: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },

    continueBtnTxt: {
      color: '#FFFCED',
      fontSize: 14,
    },
  });
};

export default styleheet;
