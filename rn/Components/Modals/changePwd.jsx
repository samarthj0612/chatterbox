import React, { useState } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import { Button, HelperText } from 'react-native-paper';

import Icon from 'atoms/Icon';
import TextInputBox from 'atoms/TextInputBox';

const { useAuth } = require('rn/contexts/AuthContext');
const { changePassword } = require('rn/API');

import styleheet from './style';
const styles = styleheet();

const ChangePwdModal = ({ close }) => {
  const { state } = useAuth();

  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [cnfrmNewPwd, setCnfrmNewPwd] = useState('');

  const [error, setError] = useState('');

  const clearInputField = () => {
    setOldPwd('');
    setNewPwd('');
    setCnfrmNewPwd('');
  };

  const changePwdHandler = () => {
    if (!oldPwd || !newPwd || !cnfrmNewPwd) {
      setError('All fields are mandatory');
      return;
    } else if (newPwd !== cnfrmNewPwd) {
      setError('Password must be same');
      return;
    }
    setError('');
    let data = {
      eml: state.user.eml,
      oldPwd: oldPwd,
      newPwd: newPwd,
    };
    changePassword(data, (err, msg) => {
      if (err) {
        setError(err);
      } else {
        ToastAndroid.show(msg, 2);
        clearInputField();
        close(false);
      }
    });
  };

  return (
    <View style={styles.modalBody}>
      <View style={styles.flexCenter}>
        <Text style={styles.modalHead}>Change password</Text>
        <Icon name="key" color="white" />
      </View>

      <TextInputBox
        label={'Old Password'}
        mode="flat"
        secureEntry={true}
        placeholder={'Enter your old password'}
        value={oldPwd}
        onChange={setOldPwd}
      />

      <TextInputBox
        label={'New Password'}
        mode="flat"
        secureEntry={true}
        placeholder={'Enter your new password'}
        value={newPwd}
        onChange={setNewPwd}
      />

      <TextInputBox
        label={'Confirm Password'}
        mode="flat"
        secureEntry={true}
        placeholder={'Confirm new password'}
        value={cnfrmNewPwd}
        onChange={setCnfrmNewPwd}
      />

      <HelperText type="error" visible={error}>
        {error}
      </HelperText>

      <Button
        mode="contained"
        style={styles.chngPwdBtn}
        onPress={changePwdHandler}
        buttonColor="green">
        Submit
      </Button>
    </View>
  );
};

export default ChangePwdModal;
