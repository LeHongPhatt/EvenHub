import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SplashScreen} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';

const App = () => {
  const [isShowSplash, setShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const {getItem, setItem} = useAsyncStorage('assetToken');
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await getItem();
    token && setAccessToken(token);
  };

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          {accessToken ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
