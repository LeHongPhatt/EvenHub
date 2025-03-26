import {View, Text} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../../redux/reducers/authReducer';
import {ButtonCus, ContainerComponent} from '../../components';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  return (
    <ContainerComponent back>
      <Text>ProfileScreen</Text>

      <ButtonCus
        type="primary"
        text="Logout"
        onPress={async () => {
          await GoogleSignin.signOut();
          await LoginManager.logOut();
          dispatch(removeAuth({}));
        }}
      />
    </ContainerComponent>
  );
};

export default ProfileScreen;
