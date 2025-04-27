import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import {SplashScreen} from '../screens';
import DrawerNavigator from './DrawerNavigator';
import TabNavigator from './TabNavigator';

const AppRouter = ({navigation}:any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const auth = useSelector(authSelector);

  useEffect(() => {
    const init = async () => {
      const seen = await AsyncStorage.getItem('hasSeenIntro');
      setHasSeenIntro(!!seen);
      setIsLoading(false);
    };
    init();
  }, []);
  if (isLoading) return <SplashScreen />;

  if (auth?.accesstoken) {
    // Nếu đã đăng nhập, điều hướng đến DrawerNavigator
    return <TabNavigator />;
  }

  return <AuthNavigator hasSeenIntro={hasSeenIntro} />;
};

export default AppRouter;
