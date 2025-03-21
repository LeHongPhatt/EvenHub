import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SplashScreen} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppRouter from './src/navigators/AppRouter';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />

      <Provider store={store}>
        <NavigationContainer>
          <AppRouter />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
