import { StyleSheet } from 'react-native';

const stylesheet = () => {
  return StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },

    container: {
      flex: 1,
      padding: 16,
    },

    emptyBoxImg: {
      height: 160,
      width: 210,
    },

    row: {
      padding: 12,
      width: '100%',
      backgroundColor: '#EDE1FE80',
      marginVertical: 10,
      borderBottomWidth: 0.8,
      borderColor: '#6650A4',
    },
  });
};

export default stylesheet;
