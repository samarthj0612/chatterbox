import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DividerWithLabel = ({
  title,
  containerStyle,
  labelStyle,
  lineStyle,
  isLableCentered,
}) => {
  return (
    <View style={containerStyle}>
      <View style={styles.container}>
        {isLableCentered && (
          <View style={{ ...styles.dividerLine, lineStyle }} />
        )}
        <Text style={labelStyle}>{title}</Text>
        <View style={{ ...styles.dividerLine, lineStyle }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 20,
  },

  dividerLine: { flex: 1, borderWidth: 0.8, borderColor: '#11111166' },
});

export default DividerWithLabel;
