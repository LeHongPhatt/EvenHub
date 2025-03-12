import {
  View,
  Text,
  Button,
  Image,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import authenticationApi from '../../api/authApi';
import {Validate} from '../../utils/Validate';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');

  const [isRemember, setIsRemember] = useState(true);

  const dispatch = useDispatch();

  const loginSubmit = async () => {
    const emailValidate = Validate.email(email);
    if (emailValidate) {
      try {
        const res = await authenticationApi.HandleAuthentication(
          '/login',
          {email, password},
          'post',
        );
        dispatch(addAuth(res.data));

        await AsyncStorage.setItem(
          'auth',
          isRemember ? JSON.stringify(res.data) : email,
        );

        console.log('===login emailValidate==', res);
      } catch (error) {
        console.log('=====error=====', error);
        Alert.alert('Tài khoản hoặc mật khẩu không đúng!');
      }
    } else {
      Alert.alert('vui long nhap day du thong tin !!!');
    }
  };

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
          value={password}
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
          <ButtonCus
            text="Forgot PassWord"
            type="text"
            onPress={() => navigation.navigate('ForgotPassWord')}
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonCus
          textColor={appColor.white}
          text="Login"
          type="primary"
          onPress={loginSubmit}
        />
      </SectionComponent>
      <LoginSocial />
      <SectionComponent>
        <RowComponent justify="center">
          <TextCus text='Don"t have an account? ' />
          <ButtonCus
            text="Sign Up"
            type="link"
            color=""
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
