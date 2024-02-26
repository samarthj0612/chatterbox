import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import ChatStack from 'navigations/stacks/Chat';
import { useAuth } from 'rn/contexts/AuthContext';

import Icon from 'components/atoms/Icon';
import Testing from 'components/testing';
import Settings from 'components/settings';
import CallingScreen from 'components/callingScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  const { state } = useAuth();
  return (
    <Tab.Navigator
      barStyle={styles.barStyle}
      screenOptions={{ tabBarLabel: false }}>
      <Tab.Screen
        name="Call"
        component={CallingScreen}
        options={{ tabBarIcon: () => getIcon('phone') }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{ tabBarIcon: () => getIcon('chat') }}
      />
      {state.developerMode ? (
        <Tab.Screen
          name="Testing"
          component={Testing}
          options={{ tabBarIcon: () => getIcon('debug') }}
        />
      ) : null}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarIcon: () => getIcon('setting') }}
      />
    </Tab.Navigator>
  );
};

const getIcon = icon => {
  return <Icon name={icon} />;
};

const styles = StyleSheet.create({
  barStyle: { height: 60 },
});

export default BottomTabs;
