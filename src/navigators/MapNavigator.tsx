import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MapsScreen, ProfileScreen} from '../screens';

const MapNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Map" component={MapsScreen} />
    </Stack.Navigator>
  );
};

export default MapNavigator;
