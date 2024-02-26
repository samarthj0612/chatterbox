import React from 'react';
import BottomTabs from 'navigations/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllUsers from 'components/allUsers';
import Notifications from 'components/notifications';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={BottomTabs} />
      <Stack.Screen name="notifications" component={Notifications} />
      <Stack.Screen name="allusers" component={AllUsers} />
    </Stack.Navigator>
  );
};

export default App;
