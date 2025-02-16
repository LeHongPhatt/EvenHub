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
import {Lock, Sms} from 'iconsax-react-native';
import {appColor} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import LoginSocial from './component/LoginSocial';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');

  const [isRemember, setIsRemember] = useState(true);

  return (
    <ContainerComponent isImageBackground isScrollable>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
          marginBottom: 30,
        }}>
        <Image
          source={require('../../assets/images/text-logo.png')}
          style={{width: 162, height: 114, resizeMode: 'contain'}}
        />
      </SectionComponent>

      <SectionComponent>
        <TextCus size={20} font={fontFamilies.bold} text="Sign In" />
        <SpaceComponent height={20} />

        <InputCus
          placeholder="Email"
          affix={<Sms size={22} color={appColor.gray2} />}
          alowClear
          value={email}
          onChange={val => setEmail(val)}
        />
        <InputCus
          affix={<Lock size={22} color={appColor.gray2} />}
          isPassword
          placeholder="Password"
          alowClear
          value={passWord}
          onChange={pass => setPassWord(pass)}
        />
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{true: appColor.primary}}
              thumbColor={appColor.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextCus text="Remember Me" />
          </RowComponent>
          <ButtonCus text="Forgot PassWord" type="text" />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonCus textColor={appColor.white} text="Login" type="primary" />
      </SectionComponent>
      <LoginSocial />
      <SectionComponent>
        <RowComponent justify="center">
          <TextCus text='Don"t have an account? ' />
          <ButtonCus text="Sign Up" type="link" color="" />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
