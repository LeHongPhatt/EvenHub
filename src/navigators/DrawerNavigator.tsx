import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerCustom} from '../components';
import TabNavigator from './TabNavigator';
const DrawerNavigator = ({navigation}:any) => {
  console.log(navigation.getState()) 
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator 
    initialRouteName="HomeNavigator"

      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
      }}
      drawerContent={props => <DrawerCustom {...props} />}>
      <Drawer.Screen name="HomeNavigator" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
