import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgotPassWord,
  LoginScreen,
  SignUpScreen,
  Verification,
} from '../screens';
import Onboarding from '../screens/auth/Onboarding';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
