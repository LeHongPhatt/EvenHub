import {View, Text, Button, Image, Switch} from 'react-native';
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
import {ArrowRight, Lock, Sms, User} from 'iconsax-react-native';
import {appColor} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import LoginSocial from './component/LoginSocial';
import authenticationApi from '../../api/authApi';
import {LoadingModal} from '../../modal';
import {Validate} from '../../utils/Validate';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [registerValue, setRegisterValue] = useState(initValue);

  const [isLoading, setIsLoading] = useState(false);

  const [errMes, setErrMes] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (registerValue.email || registerValue.password) {
      setErrMes('');
    }
  }, [registerValue.email, registerValue.password]);
  const handleRegister = (key: string, value: string) => {
    const data: any = {...registerValue};
    data[`${key}`] = value;
    setRegisterValue(data);
  };

  const handleSubmit = async () => {
    const {email, password, confirmPassword} = registerValue;
    const emailValidate = Validate.email(email);
    const passwordValidate = Validate.Password(password);
    if (email && password && confirmPassword) {
      if (emailValidate && passwordValidate) {
        setErrMes('');
        setIsLoading(true);
        try {
          const res = await authenticationApi.HandleAuthentication(
            '/register',
            {
              email,
              fullname: registerValue.username,
              password,
            },
            'post',
          );
          console.log('=====register===', res);
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
          setIsLoading(false);
        } catch (error) {
          console.log('===error==register===', error);
          setIsLoading(false);
        }
      } else {
        setErrMes('Email không đúng định dạng !!!');
      }
    } else {
      setErrMes('Vui lòng nhập đúng password !!!');
    }
  };
  return (
    <>
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
        {errMes && (
          <SectionComponent>
            <TextCus text={errMes} color={appColor.danger} />
          </SectionComponent>
        )}

        <SectionComponent>
          <ButtonCus
            onPress={handleSubmit}
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
      <LoadingModal visible={isLoading} mess="loading" />
    </>
  );
};

export default SignUpScreen;
