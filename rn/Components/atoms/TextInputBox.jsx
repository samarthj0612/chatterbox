import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const TextInputBox = ({
  label,
  style,
  mode = 'outlined',
  placeholder,
  value,
  onChange = () => {},
  autoCapitalize,
  errMessage,
  secureEntry,
}) => {
  return (
    <>
      <TextInput
        style={{ ...styles.inputField, ...style }}
        label={label}
        value={value}
        mode={mode}
        onChangeText={text => onChange(text)}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        error={errMessage}
        secureTextEntry={secureEntry}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },

  inputField: {
    width: '100%',
    borderRadius: 8,
    marginVertical: 12,
    paddingHorizontal: 8,
  },

  errMsg: {
    alignSelf: 'flex-start',
  },
});

export default TextInputBox;
