import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreens, SearchEvent} from '../screens';
import EventDetail from '../screens/events/EventDetail';

const ExploreNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreens" component={HomeScreens} />
      <Stack.Screen name="SearchEvent" component={SearchEvent} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
    </Stack.Navigator>
  );
};

export default ExploreNavigator;
