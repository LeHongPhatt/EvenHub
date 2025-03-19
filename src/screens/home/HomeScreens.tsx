import {View, Text, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../../redux/reducers/authReducer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const HomeScreens = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
      }}>
      <Text>HomeScreens</Text>
      <Button
        title="LogOut"
        onPress={async () => {
          await AsyncStorage.clear();
          await GoogleSignin.signOut();
          dispatch(removeAuth({}));
        }}
      />
    </View>
  );
};

export default HomeScreens;
