import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, ToastAndroid } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, HelperText, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from 'rn/API';
import { useAuth } from 'rn/contexts/AuthContext';

import { Background } from 'assets/Images';
import DividerWithLabel from 'atoms/DividerWithLabel';

import styleheet from './style';
const styles = styleheet();

const Login = ({ navigation, route }) => {
  const { dispatch } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [email, setEmail] = useState(() => {
    if (route && route.params && route.params.eml) {
      return route.params.eml;
    } else {
      return '';
    }
  });

  const loginHandler = () => {
    if (!email || !password) {
      setIsValid(true);
      setErrorMessage('All fields are mandatory*');
      return;
    } else {
      setIsValid(false);
      setErrorMessage('');
    }
    let userData = {
      eml: email,
      pwd: password,
    };
    setIsLoading(true);
    login(userData, async (err, data) => {
      if (err) {
        setIsValid(true);
        setErrorMessage(err);
        ToastAndroid.show(err, 2);
      } else {
        await AsyncStorage.setItem('user-token', data.token);
        dispatch({ type: 'LOGIN', payload: data.user });
      }
      setIsLoading(false);
    });
  };

  const passwordVisibilityHandler = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <FastImage source={Background} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>

        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

        <TextInput
          style={styles.inputField}
          label="Email"
          value={email}
          mode="outlined"
          onChangeText={text => setEmail(text)}
          placeholder="Enter your email"
          autoCapitalize="none"
          error={isValid && !email}
        />

        <TextInput
          style={styles.inputField}
          label="Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          mode="outlined"
          onChangeText={text => setPassword(text)}
          placeholder="Enter your Password"
          right={
            <TextInput.Icon
              style={styles.eyeBtn}
              source="eye"
              size={16}
              color={'black'}
              onPress={passwordVisibilityHandler}
            />
          }
          error={isValid && !password}
        />

        <View style={styles.flexBetween}>
          <HelperText type="error" visible={isValid}>
            {errorMessage}
          </HelperText>
          <Text
            style={styles.text1}
            onPress={() => navigation.navigate('resetPassword')}>
            Forgot password?
          </Text>
        </View>

        <Text style={styles.loginBtn} onPress={loginHandler}>
          Next
        </Text>

        <DividerWithLabel
          title={'New to Chatterbox?'}
          isLableCentered={true}
          containerStyle={styles.labelStyle}
        />
        <Button mode="outlined" onPress={() => navigation.navigate('signup')}>
          Create your account
        </Button>
      </View>
    </FastImage>
  );
};

export default Login;
