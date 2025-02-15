import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {appInfor} from '../constants/appInfor';
import {appColor} from '../constants/appColor';

import {SpaceComponent} from '../components';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/splash-img.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{flex: 1}}>
      <Image
        source={require('../assets/images/logo.png')}
        style={{width: appInfor.size.WIDTH * 0.7, resizeMode: 'center'}}
      />
      <SpaceComponent height={16} />
      <ActivityIndicator color={appColor.gray} size={20} />
    </ImageBackground>
  );
};

export default SplashScreen;
