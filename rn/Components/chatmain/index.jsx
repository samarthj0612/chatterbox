import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ToastAndroid,
} from 'react-native';

import { wsDisconnect } from 'rn/API/ws';
import { useNotif } from 'rn/contexts/notifContext';

import Icon from 'atoms/Icon';
import { Background } from 'assets/Images';

import styleheet from './style';
const styles = styleheet();

const ChatMain = ({ navigation }) => {
  const { notifDispatch } = useNotif();

  const [isLoading, setIsLoading] = useState(false);

  const offlineHandler = () => {
    setIsLoading(true);
    wsDisconnect(data => {
      ToastAndroid.show(data, 2);
      notifDispatch({ type: 'WSDISCONNECTED' });
      setIsLoading(false);
    });
  };

  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => navigation.navigate('chatusers')}>
          <Image
            style={styles.iconImage}
            source={require('assets/Images/personal-chat.png')}
          />
          <Text style={styles.iconLabel}>One-To-One</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => navigation.navigate('chatwindow')}>
          <Image
            style={styles.iconImage}
            source={require('assets/Images/public-chat.png')}
          />
          <Text
            style={styles.iconLabel}
            onPress={() => navigation.navigate('chatwindow')}>
            Public Chat
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        buttonColor="#7864B0"
        textColor="white"
        icon={getRight}
        loading={isLoading}
        style={styles.offlineBtn}
        onPress={offlineHandler}>
        Offline
      </Button>
    </ImageBackground>
  );
};

const getRight = () => {
  return <Icon name={'offline'} size={18} color="white" />;
};

export default ChatMain;
