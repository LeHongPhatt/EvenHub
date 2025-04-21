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
import {LoadingModal} from '../../modal';
import {Validate} from '../../utils/Validate';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import authenticationAPI from '../../api/authApi';

interface ErrorMessage {
  email: string;
  password: string;
  confirmPassword: string;
}

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
  const [registerValue, setRegisterValue] = useState(initValue);

  const [isLoading, setIsLoading] = useState(false);
  const [errMes, setErrMes] = useState<any>();
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !errMes ||
      (errMes && (errMes.email || errMes.password || errMes.confirmPassword)) ||
      !registerValue.email ||
      !registerValue.password ||
      !registerValue.confirmPassword
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [errMes, registerValue]);

  // useEffect(() => {
  //   if (registerValue.email || registerValue.password) {
  //     setErrMes('');
  //   }
  // }, [registerValue.email, registerValue.password]);
  const handleRegister = (key: string, value: string) => {
    const data: any = {...registerValue};
    data[`${key}`] = value;
    setRegisterValue(data);
  };

  const formValidator = (key: string) => {
    const data: any = {...errMes};
    let message = '';
    switch (key) {
      case 'email':
        if (!registerValue.email) {
          message = 'Email is required';
        } else if (!Validate.email(registerValue.email)) {
          message = 'Email không đúng định dạng !!!';
        } else {
          message = '';
        }
        break;

      case 'password':
        message = !registerValue.password ? 'Password is required' : '';
        break;
      case 'confirmPassword':
        if (!registerValue.confirmPassword) {
          message = 'Please password is confirmation';
        } else if (registerValue.password !== registerValue.confirmPassword) {
          message = 'Passwords do not match !!!';
        } else message = '';

        break;
    }
    // data[`{key}`] = message;
    data[`${key}`] = message;
    setErrMes(data);
  };

  const handleSubmit = async () => {
    const api = '/verification';
    setIsLoading(true);
    try {
      const res = await authenticationAPI.handleAuthentication(
        api,
        {email: registerValue.email},
        'post',
      );
      console.log('===handleSubmit===', res);
      setIsLoading(false);
      navigation.navigate('Verification', {
        code: res.code,
        ...registerValue,
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
            onEnd={() => formValidator('email')}
          />
          <InputCus
            isPassword
            placeholder="Password"
            affix={<Lock size={22} color={appColor.gray2} />}
            alowClear
            value={registerValue.password}
            onChange={val => handleRegister('password', val)}
            onEnd={() => formValidator('password')}
          />
          <InputCus
            isPassword
            placeholder="Confirm Password"
            affix={<Lock size={22} color={appColor.gray2} />}
            alowClear
            value={registerValue.confirmPassword}
            onChange={val => handleRegister('confirmPassword', val)}
            onEnd={() => formValidator('confirmPassword')}
          />
        </SectionComponent>
        {errMes && (
          <SectionComponent>
            {Object.keys(errMes).map((error, index) => (
              <TextCus
                text={errMes[`${error}`]}
                key={`error${index}`}
                color={appColor.danger}
              />
            ))}
          </SectionComponent>
        )}

        <SectionComponent styles={{alignItems: 'center'}}>
          <ButtonCus
            disabled={isDisabled}
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
        <SectionComponent styles={{alignItems: 'center'}}>
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
