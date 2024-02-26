import React, { useEffect, useState } from 'react';
import EmojiSelector from 'react-native-emoji-selector';
import { TextInput } from 'react-native-gesture-handler';
import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { sendMessage } from 'rn/API/ws';
import { EventEmitter } from 'rn/bl/EventEmitter';
import { useAuth } from 'rn/contexts/AuthContext';

import { EmojiIcon, SendIcon } from 'assets/Icons';
import { CoffeeChatBg2 } from 'assets/Images';

import styleheet from './style';
const styles = styleheet();

const PersonalChat = ({ route }) => {
  const { state } = useAuth();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isEmojiBoxEnabled, setIsEmojiBoxEnabled] = useState(false);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    sendMessage(route.params.userId, message, () => {
      let msg = {
        username: state.user.eml,
        message: message,
        time: Date.now(),
      };
      setMessages([...messages, msg]);
      setMessage('');
      ToastAndroid.show('message sent', 2);
    });
  };

  useEffect(() => {
    EventEmitter.subscribe('newMessage', data => {
      if (data.username === route.params.userEmail) {
        setMessages(old => {
          let msg = data;
          return [...old, msg];
        });
      }
    });
  }, [route.params]);

  const emojiHandler = emoji => {
    console.log('emoji bolte => ', emoji);
    setMessage(message + emoji);
  };

  return (
    <ImageBackground source={CoffeeChatBg2} style={styles.container}>
      <View style={styles.screenContainer}>
        <Text style={styles.chatUsernameHead}>{route.params.userEmail}</Text>

        <ScrollView style={styles.chatWindow}>
          {messages && messages.length
            ? messages.map((m, idx) => {
                return (
                  <View
                    key={idx}
                    style={{
                      ...styles.message,
                      ...(m.username !== state.user.eml
                        ? styles.lmsgs
                        : styles.rmsgs),
                    }}>
                    <Text style={styles.msgText}>{m.message}</Text>
                    <Text style={styles.msgTime}>
                      {new Date(m.time).toLocaleTimeString()}
                    </Text>
                  </View>
                );
              })
            : null}
        </ScrollView>

        <View style={styles.inputField}>
          <TouchableOpacity
            onPress={() => setIsEmojiBoxEnabled(!isEmojiBoxEnabled)}>
            <EmojiIcon />
          </TouchableOpacity>

          <View style={styles.inputFieldWrapper}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Enter your message here..."
              placeholderTextColor={'#111111'}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity onPress={sendMessageHandler}>
            <SendIcon />
          </TouchableOpacity>
        </View>

        {isEmojiBoxEnabled && (
          <EmojiSelector columns={10} onEmojiSelected={e => emojiHandler(e)} />
        )}
      </View>
    </ImageBackground>
  );
};

export default PersonalChat;
