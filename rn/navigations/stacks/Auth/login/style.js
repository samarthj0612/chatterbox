import { StyleSheet } from 'react-native';

const styleheet = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      justifyContent: 'center',
    },

    heading: {
      textAlign: 'center',
      fontWeight: '800',
      fontSize: 35,
      marginVertical: 20,
    },

    inputField: {
      width: '100%',
      borderRadius: 8,
      marginBottom: 20,
      paddingHorizontal: 8,
    },

    text1: {
      textAlign: 'right',
    },

    loginBtn: {
      backgroundColor: '#493F40',
      color: '#FFFCED',
      padding: 12,
      borderRadius: 8,
      alignSelf: 'center',
      marginTop: 30,
      paddingVertical: 8,
      paddingHorizontal: 35,
    },

    labelStyle: {
      marginVertical: 20,
    },

    eyeBtn: {
      borderWidth: 0.8,
      borderColor: '#191919',
      borderRadius: 50,
    },

    flexBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
};

export default styleheet;
