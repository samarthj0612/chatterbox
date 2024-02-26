import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MainStack from 'navigations/stacks';
import { AuthProvider } from 'rn/contexts/AuthContext';
import { NotifProvider } from 'rn/contexts/notifContext';

const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={styles.parent}>
      <AuthProvider>
        <NotifProvider>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </NotifProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  parent: { flex: 1 },
});

export default AppNavigator;
