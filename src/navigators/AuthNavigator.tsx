import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgotPassWord,
  LoginScreen,
  SignUpScreen,
  Verification,
} from '../screens';
import Onboarding from '../screens/auth/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthNavigator = () => {
  const [isExistingUser, setExistingUser] = useState(false);
  useEffect(() => {
    checkUserExists();
  }, []);

  const Stack = createNativeStackNavigator();
  const checkUserExists = async () => {
    const res = await AsyncStorage.getItem('auth');
    res && setExistingUser(true);
  };
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isExistingUser && (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}

      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
