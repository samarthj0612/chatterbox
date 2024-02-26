import {StyleSheet} from 'react-native';

const styleheet = () => {
  return StyleSheet.create({
    containerWrapper: {flex: 1},

    container: {flex: 1, alignItems: 'center', padding: 12},

    heading: {fontSize: 18},

    scrollContainer: {
      width: '100%',
      marginTop: 16,
    },

    chatRow: {
      padding: 14,
      backgroundColor: '#F0E8F3',
      marginTop: 16,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: 'black',
    },
  });
};

export default styleheet;
