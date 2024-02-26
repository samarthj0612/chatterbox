import { StyleSheet } from 'react-native';

const styleheet = () => {
  return StyleSheet.create({
    container: { flex: 1, alignItems: 'center', padding: 14 },

    heading: { marginVertical: 20 },

    row: {
      padding: 12,
      width: '100%',
      backgroundColor: '#fffced',
      marginVertical: 10,
      borderTopWidth: 0.6,
      borderBottomStartRadius: 30,
      borderBottomEndRadius: 30,
      borderColor: 'black',
    },
  });
};

export default styleheet;
