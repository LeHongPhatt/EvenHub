import {View, Text} from 'react-native';
import React from 'react';
import {ButtonCus, SectionComponent, TextCus} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {appColor} from '../../../constants/appColor';

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
        // textColor={appColor.text}
        text="Login With Google"
        type="primary"
        color={appColor.white}
        iconFlex="Left"
        icon={''}
      />
    </SectionComponent>
  );
};

export default LoginSocial;
