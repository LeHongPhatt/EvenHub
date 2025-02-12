import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SplashScreen} from './src/screens';
import MainNavigator from './src/navigators/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';

const App = () => {
  const [isShowSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowSplash(false);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, []);
  return isShowSplash ? (
    <SplashScreen />
  ) : (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default App;
