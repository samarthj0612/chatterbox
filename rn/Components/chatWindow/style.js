import { StyleSheet } from 'react-native';

const styleheet = () => {
  return StyleSheet.create({
    container: { flex: 1 },

    screenContainer: { height: '100%', alignItems: 'center', padding: 16 },

    chatWindow: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      padding: 12,
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },

    message: {
      borderWidth: 0.4,
      borderColor: '#111111',
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 10,
      marginBottom: 18,
    },

    lmsgs: {
      alignItems: 'flex-start',
    },

    rmsgs: {
      alignItems: 'flex-end',
    },

    msgUser: {
      fontSize: 10,
      opacity: 0.6,
    },

    msgText: {
      fontSize: 14,
      marginVertical: 4,
      color: 'black',
      maxWidth: '60%',
    },

    msgTime: {
      fontSize: 8,
      opacity: 0.6,
    },

    inputField: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#111111',
      borderRadius: 6,
      marginVertical: 10,
      paddingHorizontal: 16,
      color: '#111111',
      textTransform: 'capitalize',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },

    inputFieldWrapper: {
      flex: 1,
    },

    logoutBtn: {
      backgroundColor: 'red',
      padding: 12,
      borderRadius: 8,
      alignSelf: 'center',
      color: 'white',
      marginTop: 10,
      paddingVertical: 8,
      paddingHorizontal: 35,
    },

    sendBtn: {
      backgroundColor: 'green',
      padding: 12,
      borderRadius: 8,
      alignSelf: 'center',
      color: 'white',
      marginTop: 10,
      paddingVertical: 8,
      paddingHorizontal: 35,
    },
  });
};

export default styleheet;
