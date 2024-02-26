import { View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';

import { CoffeeChatBg1 } from 'assets/Images';
import { ChatSmileIcon } from 'assets/Icons';

import { connection } from 'rn/API/ws';
import { useAuth } from 'rn/contexts/AuthContext';
import { useNotif } from 'rn/contexts/notifContext';

import styleheet from './style';
const styles = styleheet();

const StartChat = () => {
  const { state } = useAuth();
  const { notifDispatch } = useNotif();

  const [isLoading, setIsLoading] = useState(false);

  const startChatHandler = () => {
    setIsLoading(true);
    connection(state.user.eml, connectionData => {
      console.log(connectionData);
      notifDispatch({ type: 'WSCONNECTED' });
      setIsLoading(false);
    });
  };
  return (
    <FastImage source={CoffeeChatBg1} style={styles.containerWrapper}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.container}>
        <Button icon={getSendIcon} mode="contained" onPress={startChatHandler}>
          Start Chat
        </Button>
      </View>
    </FastImage>
  );
};

const getSendIcon = () => <ChatSmileIcon />;

export default StartChat;
