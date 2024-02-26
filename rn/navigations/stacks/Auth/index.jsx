import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Initial from './initial';
import Login from './login';
import Signup from './signup';
import ResetPassword from 'components/resetPassword';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="initial" component={Initial} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="resetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default Auth;
