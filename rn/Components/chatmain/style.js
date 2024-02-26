import { StyleSheet } from 'react-native';

const styleheet = () => {
  return StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },

    iconImage: { height: 120, width: 120 },

    iconWrapper: {
      alignItems: 'center',
      marginBottom: 50,
    },

    iconLabel: {
      borderWidth: 1,
      borderColor: '#111111',
      padding: 12,
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: 10,
      paddingVertical: 8,
      paddingHorizontal: 35,
      backgroundColor: '#F0E8F390',
    },

    offlineBtn: {
      position: 'absolute',
      right: 30,
      bottom: 30,
      width: 120,
    },
  });
};

export default styleheet;
