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

const AuthNavigator = () => {
  const [isExistingUser, setExistingUser] = useState(false);
  console.log('===isExistingUser===', isExistingUser);

  const dispatch = useDispatch();
  useEffect(() => {
    checkUserExists();
  }, []);

  const Stack = createNativeStackNavigator();
  const checkUserExists = async () => {
    dispatch(addAuth('auth'));
    const res = await AsyncStorage.getItem('auth');
    console.log('====res===auth==,', res);
    res && setExistingUser(true);
  };
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* {isExistingUser ? (
        // <Stack.Screen name="MainApp" component={MainAppNavigator} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      )} */}
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
