import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonCus,
  ContainerComponent,
  InputCus,
  SectionComponent,
  SpaceComponent,
  TextCus,
} from '../../components';
import {ArrowRight, Sms} from 'iconsax-react-native';
import {appColor} from '../../constants/appColor';

const ForgotPassWord = () => {
  const [email, setEmail] = useState('');
  return (
    <ContainerComponent isImageBackground back>
      <SectionComponent>
        <TextCus title text="Reset PassWord" />
        <SpaceComponent height={15} />

        <TextCus text="Please enter your email address to request a password reset" />
        <SpaceComponent height={30} />
        <InputCus
          alowClear
          placeholder="Email Address"
          value={email}
          onChange={val => setEmail(val)}
          affix={<Sms size={22} color={appColor.gray} />}
        />
        <SpaceComponent height={20} />

        <ButtonCus
          text="Send"
          type="primary"
          textColor={appColor.white}
          iconFlex="right"
          icon={<ArrowRight size={22} color={appColor.white} />}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ForgotPassWord;
