import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {globalStyles} from '../../styles/globalStyle';
import Swiper from 'react-native-swiper';
import {appInfor} from '../../constants/appInfor';
import {appColor} from '../../constants/appColor';
import {TextCus} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';

const Onboarding = ({navigation}: any) => {
  const [index, setIndex] = React.useState(0);
  const [checkintro, setcheckintro] = useState('');
  return (
    <View style={[globalStyles.container]}>
      <Swiper
        activeDotColor={appColor.gray2}
        onIndexChanged={num => setIndex(num)}
        index={index}
        loop={false}>
        <Image
          style={{
            width: appInfor.size.WIDTH,
            height: appInfor.size.HEIGHT,
            resizeMode: 'cover',
          }}
          source={require('../../assets/images/onboarding-1.png')}
        />
        <Image
          style={{
            flex: 1,
            width: appInfor.size.WIDTH,
            height: appInfor.size.HEIGHT,
            resizeMode: 'cover',
          }}
          source={require('../../assets/images/onboarding-2.png')}
        />
        <Image
          style={{
            flex: 1,
            width: appInfor.size.WIDTH,
            height: appInfor.size.HEIGHT,
            resizeMode: 'cover',
          }}
          source={require('../../assets/images/onboarding-3.png')}
        />
      </Swiper>
      <View
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: 20,
            position: 'absolute',
            bottom: 0,
            right: 20,
            left: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <TextCus
            text="Skip"
            font={fontFamilies.medium}
            color={appColor.gray2}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')
          }>
          <TextCus
            font={fontFamilies.medium}
            color={appColor.white}
            text="Next"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;
