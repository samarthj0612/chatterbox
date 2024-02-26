import React, { useState } from 'react';
// import RNBeep from 'react-native-a-beep';
import { View, StyleSheet, Linking } from 'react-native';
import { Button, Headline, Snackbar } from 'react-native-paper';

const Testing = () => {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <Headline>Testing</Headline>

        <Button
          buttonColor="#EDE1FE"
          style={styles.actionBtn}
          onPress={() => {
            // RNBeep.beep();
          }}>
          Beep Success
        </Button>

        <Button
          buttonColor="#EDE1FE"
          style={styles.actionBtn}
          onPress={() => {
            // RNBeep.beep(false);
          }}>
          Beep Fail
        </Button>

        <Button
          buttonColor="#EDE1FE"
          style={styles.actionBtn}
          onPress={() => {
            // // RNBeep.PlaySysSound(RNBeep.AndroidSoundIDs.TONE_PROP_BEEP);
          }}>
          Beep Android Custom
        </Button>

        <Button
          buttonColor="#EDE1FE"
          style={styles.actionBtn}
          onPress={() => {
            // RNBeep.PlaySysSound(41);
          }}>
          Beep Something
        </Button>

        <Button
          buttonColor="#EDE1FE"
          style={styles.actionBtn}
          onPress={() => {
            // // RNBeep.PlaySysSound(RNBeep.iOSSoundIDs.AudioToneBusy);
          }}>
          Beep iOS Custom
        </Button>

        <Button
          buttonColor="#EDE1FE"
          style={styles.actionBtn}
          onPress={() => {
            Linking.openURL('tel:7869157972');
          }}>
          Make calls
        </Button>

        <>
          <Button
            buttonColor="#EDE1FE"
            style={styles.actionBtn}
            onPress={() => setIsSnackbarVisible(!isSnackbarVisible)}>
            {isSnackbarVisible ? 'Hide' : 'Show'}
          </Button>
        </>
      </View>

      <Snackbar
        visible={isSnackbarVisible}
        action={{
          label: 'Dismiss',
          onPress: () => {
            setIsSnackbarVisible(!isSnackbarVisible);
          },
        }}
        onDismiss={() => {
          console.log('dismissed');
        }}>
        This tab is for developer
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },

  actionBtn: { margin: 8 },
});

export default Testing;
