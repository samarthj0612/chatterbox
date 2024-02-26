import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from 'rn/contexts/AuthContext';

import Auth from './Auth';
import App from './App';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const { state } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!state.isAuthenticated ? (
        <Stack.Screen name="authStack" component={Auth} />
      ) : (
        <Stack.Screen name="appStack" component={App} />
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
