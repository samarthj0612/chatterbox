import { StyleSheet } from 'react-native';

const styleheet = () => {
  return StyleSheet.create({
    container: { flex: 1 },

    topCont: { flex: 1, padding: 24, alignItems: 'center' },

    profileImgWrapper: { marginVertical: 16 },

    profileImg: { backgroundColor: 'transparent' },

    editBoxIcon: { position: 'absolute', right: 0, bottom: 0 },

    logoutBtn: {
      borderWidth: 1,
      borderColor: 'red',
      borderRadius: 50,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: 16,
      paddingHorizontal: 12,
    },

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      backgroundColor: '#11111199',
    },

    modalCloseIcon: {
      position: 'absolute',
      right: 0,
      margin: 24,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 50,
      zIndex: 99,
    },

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

    snackbar: { backgroundColor: '#ffffff' },

    flexCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 4,
    },
  });
};

export default styleheet;
