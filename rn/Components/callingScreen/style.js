const { StyleSheet } = require('react-native');

const stylesheet = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      alignItems: 'center',
    },

    contactView: {
      flex: 1,
      width: '100%',
    },

    callBtn: {
      backgroundColor: 'green',
      padding: 14,
      borderRadius: 50,
      marginTop: 10,
    },

    dialPad: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 4,
    },

    key: {
      width: '25%',
      height: 50,
      backgroundColor: 'white',
      margin: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },

    keyText: {
      textTransform: 'capitalize',
      fontWeight: 'bold',
      fontSize: 30,
    },

    inpBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      width: '100%',
    },

    inpBoxTextWrapper: {
      height: 60,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },

    inpBoxText: {
      textAlign: 'center',
    },
  });
};

module.exports = stylesheet;
