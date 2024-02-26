import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, ToastAndroid } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import { signup } from 'rn/API';
import { Background } from 'assets/Images';

import styleheet from './style';
const styles = styleheet();

const Signup = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const [isValid, setIsValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const signupHandler = () => {
    if (!name || !email || !mobile || !password) {
      setIsValid(true);
      return;
    }
    let userData = {
      nm: name,
      eml: email,
      mob: mobile,
      pwd: password,
    };
    setIsLoading(true);
    signup(userData, (err, data) => {
      if (err) {
        ToastAndroid.show(err, 2);
      } else {
        navigation.navigate('login', { eml: data.eml });
      }
      setIsLoading(false);
    });
  };

  return (
    <FastImage source={Background} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.heading}>Signup</Text>

        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

        <TextInput
          style={styles.inputField}
          label="Name"
          value={name}
          mode="outlined"
          onChangeText={text => setName(text)}
          placeholder="Enter your name"
          error={isValid && !name}
        />

        <TextInput
          style={styles.inputField}
          label="Email"
          value={email}
          mode="outlined"
          onChangeText={text => setEmail(text)}
          placeholder="Enter your email"
          error={isValid && !email}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.inputField}
          label="Mobile"
          value={mobile}
          mode="outlined"
          onChangeText={text => setMobile(text)}
          placeholder="Enter your mobile"
          error={isValid && !mobile}
        />

        <TextInput
          style={styles.inputField}
          label="Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          mode="outlined"
          onChangeText={text => setPassword(text)}
          placeholder="Enter your password"
          error={isValid && !password}
          right={
            <TextInput.Icon
              style={styles.eyeBtn}
              source="eye"
              size={10}
              color={'black'}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          }
        />

        <HelperText type="error" visible={isValid}>
          All fields are mandatory*
        </HelperText>

        <Text style={styles.text1} onPress={() => navigation.navigate('login')}>
          Already have an account?
        </Text>

        <Text style={styles.signupBtn} onPress={signupHandler}>
          Next
        </Text>
      </View>
    </FastImage>
  );
};

export default Signup;
