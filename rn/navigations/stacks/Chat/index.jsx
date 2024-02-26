import React, { useEffect } from 'react';
import { Badge } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from 'rn/contexts/AuthContext';
import { useNotif } from 'rn/contexts/notifContext';

import ChatMain from 'components/chatmain';
import StartChat from 'components/startchat';
import ChatUsers from 'components/chatUsers';
import ChatWindow from 'components/chatWindow';
import PersonalChat from 'components/personalChat';

import { NotificationIcon } from 'assets/Icons';
import { EventEmitter } from 'rn/bl/EventEmitter';

const Stack = createNativeStackNavigator();

const ChatStack = ({ navigation }) => {
  const { state } = useAuth();
  const { notifState, notifDispatch } = useNotif();

  useEffect(() => {
    EventEmitter.subscribe('newMessage', data => {
      console.log('New broadcast', data);
      notifDispatch({ type: 'MESSAGE', payload: data });
    });
  }, [notifDispatch]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: true,
        title: `Hello, ${state.user.nm}`,
        headerShadowVisible: true,
        headerStyle: { backgroundColor: '#F0E8F3' },
      }}>
      {!notifState.isWsConnected ? (
        <Stack.Screen name="startchat" component={StartChat} />
      ) : (
        <>
          <Stack.Screen
            name="chatmain"
            component={ChatMain}
            options={{
              headerRight: () => getHeaderRight(navigation, notifState.count),
            }}
          />
          <Stack.Screen
            name="chatwindow"
            component={ChatWindow}
            options={{ headerTitle: 'Public Chat' }}
          />
          <Stack.Screen
            name="chatusers"
            component={ChatUsers}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="personalchat"
            component={PersonalChat}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const getHeaderRight = (navigation, count) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('notifications');
      }}>
      {count ? (
        <Badge size={16} style={styles.badgeContainer}>
          {count}
        </Badge>
      ) : null}
      <NotificationIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -2,
    zIndex: 99,
  },
});

export default ChatStack;
