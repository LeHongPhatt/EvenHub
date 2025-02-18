import {View, Text} from 'react-native';
import React from 'react';
import {ButtonCus, SectionComponent, TextCus} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {appColor} from '../../../constants/appColor';
import {Facebook, Google} from '../../../assets/svgs';

const LoginSocial = () => {
  return (
    <SectionComponent>
      <TextCus
        styles={{textAlign: 'center'}}
        text="OR"
        size={16}
        font={fontFamilies.medium}
        color={appColor.gray4}
      />
      <ButtonCus
        textFont={fontFamilies.regular}
        // textColor={appColor.text}
        text="Login With Google"
        type="primary"
        color={appColor.white}
        iconFlex="Left"
        icon={<Google />}
      />
      <ButtonCus
        textFont={fontFamilies.regular}
        text="Login With Facebook"
        type="primary"
        color={appColor.white}
        iconFlex="Left"
        icon={<Facebook />}
      />
    </SectionComponent>
  );
};

export default LoginSocial;
