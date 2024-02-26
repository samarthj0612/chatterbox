import React from 'react';
import { List } from 'react-native-paper';
import { Image, ScrollView, View } from 'react-native';

import { EmptyBoxImg } from 'assets/Images';
import { useNotif } from 'rn/contexts/notifContext';

import stylesheet from './style';
const styles = stylesheet();

const Notifications = () => {
  const { notifState } = useNotif();
  return (
    <>
      {!notifState.notifications.length ? (
        <View style={styles.emptyContainer}>
          <Image style={styles.emptyBoxImg} source={EmptyBoxImg} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {notifState.notifications.map((notification, idx) => {
            return (
              <List.Item
                key={idx}
                title={notification.username}
                description={notification.message}
                style={styles.row}
              />
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

export default Notifications;
