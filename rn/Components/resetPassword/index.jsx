import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { Button, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, ToastAndroid, Alert } from 'react-native';

import { Background } from 'assets/Images';
import TextInputBox from 'atoms/TextInputBox';

import { useAuth } from 'rn/contexts/AuthContext';
import { resetPassword, verifyOtp, changePasswordUsingOtp } from 'rn/API';

import stylesheet from './style';
const styles = stylesheet();

const ResetPassword = ({ navigation }) => {
  const { dispatch } = useAuth();

  const [eml, setEml] = useState('');
  const [errmsg, setErrmsg] = useState('');
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emlHandler = () => {
    setErrmsg('');
    if (!eml) {
      setErrmsg('*All fields are mandatory');
      return;
    }
    var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!validRegex.test(eml)) {
      setErrmsg('Invalid Email Address');
      return;
    }
    setIsVerifyingEmail(true);
    Alert.alert(
      'Hang On a Sec!!',
      `A verification code will be sent to ${eml} to help you reset your password.\n\nAre the details given correct?`,
      [
        {
          text: 'No',
          onPress: () => ToastAndroid.show('Operation cancelled', 2),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            resetPassword(eml, (err, data) => {
              if (err) {
                setErrmsg(err);
              } else {
                ToastAndroid.show('OTP Successfully Sent', 1);
                setShowOtp(true);
              }
              setIsVerifyingEmail(false);
            });
          },
        },
      ],
    );
  };

  const verifyOtpHandler = () => {
    setIsLoading(true);
    verifyOtp({ eml: eml, otp: otp }, (err, data) => {
      if (err) {
        ToastAndroid.show(err, 2);
      } else {
        console.log(data);
        setIsOtpVerified(true);
      }
      setIsLoading(false);
    });
  };

  const resendOtpHandler = () => {
    let temp = 14;
    setCanResend(false);
    setResendTimer(temp);
    let func;
    func = setInterval(() => {
      if (temp <= 0) {
        setCanResend(true);
        clearInterval(func);
        return;
      } else {
        temp--;
        setResendTimer(temp);
      }
    }, 1000);
    console.log(otp);
  };

  const setNewPwdHandler = () => {
    setErrmsg('');
    if (!newPassword || !confirmPassword) {
      setErrmsg('*Mandatory fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrmsg('Password must be same');
      return;
    }

    let data = {
      eml: eml,
      otp: otp,
      newPwd: newPassword,
    };
    setIsLoading(true);
    changePasswordUsingOtp(data, async (err, resp) => {
      if (err) {
        ToastAndroid.show(err, 2);
      } else {
        console.log(resp);
        await AsyncStorage.setItem('user-token', resp.token);
        dispatch({ type: 'LOGIN', payload: resp.user });
      }
      setIsLoading(false);
    });
  };

  return (
    <FastImage source={Background} style={styles.container}>
      <View style={styles.container}>
        {!showOtp ? (
          <>
            <HelperText type="info" style={styles.helperText}>
              Please enter your email to receive a verification code.
            </HelperText>

            <TextInputBox
              style={styles.emlInputField}
              label="Email"
              mode="outlined"
              value={eml}
              onChange={setEml}
              placeholder="Enter your email"
              autoCapitalize="none"
              errMessage={errmsg}
            />

            <Button
              style={styles.verifyBtn}
              mode="contained"
              loading={isVerifyingEmail}
              onPress={emlHandler}>
              Continue
            </Button>
          </>
        ) : !isOtpVerified ? (
          <>
            <Text style={styles.headinh}>Verify OTP</Text>

            <View style={styles.otpInputContainer}>
              <TextInput
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                style={styles.otpInputField}
              />
            </View>

            <Button
              style={styles.verifyBtn}
              mode="contained"
              disabled={otp.length !== 6}
              onPress={verifyOtpHandler}
              loading={isLoading}>
              Verify
            </Button>

            <Button
              style={styles.resendOtpBtn}
              onPress={resendOtpHandler}
              disabled={!canResend}>
              Resend{resendTimer ? ` (${resendTimer})` : ''}
            </Button>
          </>
        ) : (
          <>
            <HelperText type="info" style={styles.helperText}>
              Set new password for your account with email id - {eml}
            </HelperText>

            <TextInputBox
              style={styles.emlInputField}
              label="New password"
              mode="outlined"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="New password"
              autoCapitalize="none"
              errMessage={errmsg && !newPassword}
            />

            <TextInputBox
              style={styles.emlInputField}
              label="Confirm password"
              mode="outlined"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm password"
              autoCapitalize="none"
              errMessage={errmsg && !confirmPassword}
            />

            <HelperText type="error" style={styles.errMsg} visible>
              {errmsg}
            </HelperText>

            <Button
              style={styles.verifyBtn}
              mode="contained"
              loading={isLoading}
              onPress={setNewPwdHandler}>
              Submit
            </Button>
          </>
        )}
      </View>
    </FastImage>
  );
};

export default ResetPassword;
