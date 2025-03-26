import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {ButtonCus, SectionComponent, TextCus} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {appColor} from '../../../constants/appColor';
import {Facebook, Google} from '../../../assets/svgs';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useTheme} from '@react-navigation/native';
import authenticationApi from '../../../api/authApi';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Settings,
  LoginButton,
  LoginManager,
  Profile,
  AccessToken,
} from 'react-native-fbsdk-next';
import {LoadingModal} from '../../../modal';
GoogleSignin.configure({
  webClientId:
    '943189562687-8b09tm07ler7umj2o6spkchpo4e8s0uj.apps.googleusercontent.com',
});

Settings.setAppID('657021930151703');

const LoginSocial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const api = `/google-signin`;
  const dispatch = useDispatch();
  const LoginGoogle = async () => {
    setIsLoading(true);
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.data?.user;
      const res: any = await authenticationApi.HandleAuthentication(
        api,
        user,
        'post',
      );

      dispatch(addAuth(res.data));
      console.log('=====api======', res.data);

      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
      console.log('======GoogleSignin====', res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // const LoginFacebook = async () => {
  //   try {
  //     const result = await LoginManager.logInWithPermissions([
  //       'public_profile',
  //     ]);
  //     if (result.isCancelled) {
  //       console.log('=====login cancel=====');
  //     } else {
  //       const profile = await Profile.getCurrentProfile();
  //       console.log('=======profile====', profile);
  //       if (profile) {
  //         setIsLoading(true);
  //         const data = {
  //           name: profile.name,
  //           givenName: profile.firstName,
  //           familyName: profile.lastName,
  //           email: profile.userID,
  //           photoUrl: profile?.imageURL,
  //         };
  //         const res: any = await authenticationApi.HandleAuthentication(
  //           api,
  //           data,
  //           'post',
  //         );

  //         dispatch(addAuth(res));
  //         console.log('=====api======', res);

  //         await AsyncStorage.setItem('auth', JSON.stringify(res));
  //         setIsLoading(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLoginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);

      if (result.isCancelled) {
        console.log('Login cancel');
      } else {
        const profile = await Profile.getCurrentProfile();

        if (profile) {
          setIsLoading(true);
          const data = {
            name: profile.name,
            givenName: profile.firstName,
            familyName: profile.lastName,
            email: profile.userID,
            photo: profile.imageURL,
          };

          const res: any = await authenticationApi.HandleAuthentication(
            api,
            data,
            'post',
          );
          console.log('=========res=========', res);
          dispatch(addAuth(res));

          await AsyncStorage.setItem('auth', JSON.stringify(res));

          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SectionComponent styles={{alignItems: 'center'}}>
      <TextCus
        styles={{textAlign: 'center'}}
        text="OR"
        size={16}
        font={fontFamilies.medium}
        color={appColor.gray4}
      />
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log(error);
          } else if (result.isCancelled) {
            console.log('User Cancelled the Login Flow');
          } else {
            console.log('======addAuth=========', result);
          }
        }}
      />
      <ButtonCus
        onPress={LoginGoogle}
        textFont={fontFamilies.regular}
        // textColor={appColor.text}
        text="Login With Google"
        type="primary"
        color={appColor.white}
        iconFlex="Left"
        icon={<Google />}
      />
      <ButtonCus
        onPress={handleLoginWithFacebook}
        textFont={fontFamilies.regular}
        text="Login With Facebook"
        type="primary"
        color={appColor.white}
        iconFlex="Left"
        icon={<Facebook />}
      />
      <LoadingModal visible={isLoading} />
    </SectionComponent>
  );
};

export default LoginSocial;
