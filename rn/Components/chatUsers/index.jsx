import React, { useEffect, useState } from 'react';
import { List, Searchbar } from 'react-native-paper';
import { View, ImageBackground, ScrollView } from 'react-native';

import { getConnectedUsers } from 'rn/API/ws';
import { EventEmitter } from 'rn/bl/EventEmitter';

import Icon from 'atoms/Icon';
import { CoffeeChatBg3 } from 'assets/Images';

import styleheet from './style';
const styles = styleheet();

const ChatUsers = ({ navigation }) => {
  const [connectedUsers, setConnectedUsers] = useState({});
  const [filteredUsers, setFilteredUsers] = useState({});

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => {
    setSearchQuery(query);
    if (!query) {
      setFilteredUsers({ ...connectedUsers });
      return;
    }
    let temp = {};
    Object.keys(connectedUsers).forEach(userId => {
      if (connectedUsers[userId].includes(query)) {
        temp[userId] = connectedUsers[userId];
      }
    });
    setFilteredUsers(temp);
  };

  useEffect(() => {
    getConnectedUsers();
  }, []);

  useEffect(() => {
    EventEmitter.subscribe('totalUsers', data => {
      setConnectedUsers(data);
      setFilteredUsers(data);
    });
  }, []);

  const chatHandler = (id, eml) => {
    navigation.navigate('personalchat', { userId: id, userEmail: eml });
  };

  return (
    <ImageBackground source={CoffeeChatBg3} style={styles.containerWrapper}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          icon={() => getIcon('search')}
          clearIcon={searchQuery ? () => getIcon('clear') : ''}
        />

        <ScrollView style={styles.scrollContainer}>
          {filteredUsers && Object.keys(filteredUsers).length
            ? Object.keys(filteredUsers).map((user, idx) => {
                return (
                  <List.Item
                    key={idx}
                    title={filteredUsers[user]}
                    left={() => getIcon('chat')}
                    style={styles.chatRow}
                    onPress={() => chatHandler(user, filteredUsers[user])}
                  />
                );
              })
            : null}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const getIcon = icon => {
  return <Icon name={icon} />;
};

export default ChatUsers;
