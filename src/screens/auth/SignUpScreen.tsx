import {View, Text, Button, Image, Switch} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ButtonCus,
  ContainerComponent,
  InputCus,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextCus,
} from '../../components';
import {globalStyles} from '../../styles/globalStyle';
import {ArrowRight, Lock, Sms, User} from 'iconsax-react-native';
import {appColor} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import LoginSocial from './component/LoginSocial';

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [registerValue, setRegisterValue] = useState(initValue);

  const handleRegister = (key: string, value: string) => {
    const data: any = {...registerValue};
    data[`${key}`] = value;
    setRegisterValue(data);
  };

  return (
    <ContainerComponent isImageBackground isScrollable back>
      <SectionComponent>
        <TextCus size={20} font={fontFamilies.bold} text={'Sign Up'} title />
        <SpaceComponent height={20} />
        <InputCus
          placeholder="Full Name"
          affix={<User size={22} color={appColor.gray2} />}
          alowClear
          value={registerValue.username}
          onChange={val => handleRegister('username', val)}
        />
        <InputCus
          placeholder="Email"
          affix={<Sms size={22} color={appColor.gray2} />}
          alowClear
          value={registerValue.email}
          onChange={val => handleRegister('email', val)}
        />
        <InputCus
          isPassword
          placeholder="Password"
          affix={<Lock size={22} color={appColor.gray2} />}
          alowClear
          value={registerValue.password}
          onChange={val => handleRegister('password', val)}
        />
        <InputCus
          isPassword
          placeholder="Confirm Password"
          affix={<Lock size={22} color={appColor.gray2} />}
          alowClear
          value={registerValue.confirmPassword}
          onChange={val => handleRegister('confirmPassword', val)}
        />
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonCus
          textStyle={{alignContent: 'center'}}
          textColor={appColor.white}
          text="Sign Up"
          type="primary"
          // iconFlex="right"
          icon={<ArrowRight size={22} />}
        />
      </SectionComponent>
      <LoginSocial />
      <SectionComponent>
        <RowComponent justify="center">
          <TextCus text='Don"t have an account? ' />
          <ButtonCus
            text="Sign In"
            type="link"
            color=""
            onPress={() => navigation.goBack()}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SignUpScreen;
