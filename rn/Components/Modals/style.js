import { StyleSheet } from 'react-native';

const styleheet = () => {
  return StyleSheet.create({
    modalBody: {
      textAlign: 'center',
      width: '100%',
      padding: 16,
      paddingVertical: 28,
      backgroundColor: '#11111199',
      borderRadius: 6,
    },

    modalHead: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white',
      textTransform: 'capitalize',
      marginBottom: 14,
    },

    chngPwdBtn: {
      borderRadius: 20,
      marginVertical: 16,
      paddingHorizontal: 24,
      alignSelf: 'center',
    },

    flexCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 4,
    },
  });
};

export default styleheet;
