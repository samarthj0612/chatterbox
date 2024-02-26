import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';

import { checkSession } from 'rn/API';
import { useAuth } from 'rn/contexts/AuthContext';

import landingBg from 'assets/Images/landing.png';
import { RightArrowIcon } from 'assets/Icons';

import stylesheet from './style';
const styles = stylesheet();

const Initial = ({ navigation }) => {
  const { dispatch } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  const continueHandler = () => {
    navigation.navigate('login');
  };

  const checkSessionHandler = useCallback(async () => {
    setIsLoading(true);
    let token = await AsyncStorage.getItem('user-token');
    checkSession(token, (err, data) => {
      if (err) {
        ToastAndroid.show(err, 1);
      } else {
        dispatch({ type: 'LOGIN', payload: data });
      }
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    checkSessionHandler();
  }, [checkSessionHandler]);

  return (
    <FastImage source={landingBg} style={styles.background}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <View style={styles.container}>
        <Text style={styles.welcmText}>Welcome!!</Text>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={continueHandler}
          activeOpacity={0.8}>
          <Text style={styles.continueBtnTxt}>Continue</Text>
          <RightArrowIcon />
        </TouchableOpacity>
      </View>
    </FastImage>
  );
};

export default Initial;
