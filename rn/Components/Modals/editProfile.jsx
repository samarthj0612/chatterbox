import React, { useState } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import { Button, HelperText } from 'react-native-paper';

import { updateProfile } from 'rn/API';
import { useAuth } from 'rn/contexts/AuthContext';
import TextInputBox from 'atoms/TextInputBox';

import styleheet from './style';
const styles = styleheet();

const EditProfileModal = ({ close }) => {
  const { state, dispatch } = useAuth();

  const [name, setName] = useState(state.user.nm);
  const [mobile, setMobile] = useState(state.user.mob);

  const [error, setError] = useState('');

  const clearInputField = () => {
    setName('');
    setMobile('');
  };

  const editProfileHandler = () => {
    setError('');
    let data = {};
    if (name) {
      data.nm = name;
    }
    if (mobile) {
      data.mob = mobile;
    }
    if (Object.keys(data).length) {
      updateProfile(data, state.user.eml, (err, resp) => {
        if (err) {
          setError(err);
        } else {
          ToastAndroid.show(resp.message, 2);
          dispatch({ type: 'LOGIN', payload: resp.data });
          close(false);
          clearInputField();
        }
      });
    } else {
      setError('Fields are empty to update');
    }
  };

  return (
    <View style={styles.modalBody}>
      <Text style={styles.modalHead}>Edit Profile</Text>

      <TextInputBox
        label={'Name'}
        mode="flat"
        value={name}
        placeholder={'Enter your name'}
        onChange={setName}
      />

      <TextInputBox
        value={mobile}
        mode="flat"
        label={'Contact'}
        placeholder={'Enter your contact'}
        onChange={setMobile}
      />

      <HelperText type="error" visible={error}>
        {error}
      </HelperText>

      <Button
        mode="contained"
        style={styles.chngPwdBtn}
        onPress={editProfileHandler}
        buttonColor="green">
        Submit
      </Button>
    </View>
  );
};

export default EditProfileModal;
