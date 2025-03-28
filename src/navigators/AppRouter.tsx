import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import {SplashScreen} from '../screens';

const AppRouter = () => {
  const [isShowSplash, setShowSplash] = useState(true);
  const {getItem} = useAsyncStorage('auth');
  const auth = useSelector(authSelector);

  const dispatch = useDispatch();
  console.log('====accesstoken=', auth);
  useEffect(() => {
    checkLogin();
    const timeOut = setTimeout(() => {
      setShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeOut);
  }, []);

  const checkLogin = async () => {
    const res = await getItem();

    res && dispatch(addAuth(JSON.parse(res)));
  };

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : auth?.accesstoken ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppRouter;
