const { StyleSheet } = require('react-native');

const stylesheet = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },

    headinh: {
      fontSize: 20,
    },

    otpInputContainer: {
      alignSelf: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      borderStyle: 'dashed',
      marginVertical: 34,
    },

    inputActive: {
      borderBottomColor: 'red',
    },

    errorActive: {
      borderBottomColor: 'white',
    },

    emlInputField: {
      width: '100%',
      borderRadius: 8,
      paddingHorizontal: 8,
    },

    helperText: { paddingHorizontal: 0 },

    otpInputField: {
      width: 32 * 8,
      letterSpacing: 22,
      color: 'blue',
      fontSize: 28,
    },

    verifyBtn: {
      paddingHorizontal: 18,
      marginTop: 20,
    },

    errMsg: {
      alignSelf: 'flex-start',
    },

    flexBetween: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginVertical: 12,
    },
  });
};

module.exports = stylesheet;
