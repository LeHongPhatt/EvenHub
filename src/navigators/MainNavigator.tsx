import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import { DrawerCustom } from '../components';
import TabNavigator from './TabNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';

const MainNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName="HomeNavigator"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
      }}
      drawerContent={props => <DrawerCustom {...props} />}>
      <Drawer.Screen name="TabMain" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
