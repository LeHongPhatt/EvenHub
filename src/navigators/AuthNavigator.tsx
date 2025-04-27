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
import {useDispatch} from 'react-redux';
import {addAuth} from '../redux/reducers/authReducer';
import KYC from '../screens/auth/KYC/KYC';
import { ImagePicker } from '../screens/auth/KYC/components';
import TabNavigator from './TabNavigator';
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const [isLoading, setLoading] = useState(true);
  const [hadIntro, setHadIntro] = useState(false);

  useEffect(() => {
    const checkIntro = async () => {
      const seen = await AsyncStorage.getItem('hasSeenIntro');
      setHadIntro(!!seen); // Nếu có => true
      setLoading(false);
    };
    checkIntro();
  }, []);

  if (isLoading) return null;
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!hadIntro && <Stack.Screen name="Onboarding" component={Onboarding} />}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
      <Stack.Screen name="KYC" component={ImagePicker} />
      {/* <Stack.Screen name="ImagePicker" component={ImagePicker} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
