import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ButtonCus,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextCus,
} from '../../components';
import authenticationAPI from '../../api/authApi';
import {Arrow, ArrowCircleRight, Sms} from 'iconsax-react-native';
import {appColor} from '../../constants/appColor';
import {LoadingModal} from '../../modal';

const Verification = ({navigation, route}: any) => {
  const {email} = route.params;
  console.log('params:', route.params); // kiểm tra toàn bộ params

  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [limit, setLimit] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  const dispatch = useDispatch();
  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);

  useEffect(() => {
    let item = ``;

    codeValues.forEach(val => (item += val));

    setNewCode(item);
  }, [codeValues]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;

    setCodeValues(data);
  };

  const handleResendVerification = async () => {
    setCodeValues(['', '', '', '']);
    setNewCode('');

    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.handleAuthentication(
        `/resend_otp`,
        {email},
        'post',
      );
      console.log('res:', res);
      setLimit(120);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(`Can not send verification code ${error}`);
    }
  };
  const handleVerification = async () => {
    if (limit > 0) {
      if (newCode.length !== 4) {
        setErrorMessage('Please enter a valid 4-digit OTP.');
        return;
      }

      setIsLoading(true);
      try {
        const api = `/verify_otp_and_update_password`; // API xác thực và đổi mật khẩu
        const data = {
          email,
          otp: newCode, // mã người dùng nhập
          newPassword: route.params.newPassword, // mật khẩu đã nhập ở màn trước
        };

        const res: any = await authenticationAPI.handleAuthentication(
          api,
          data,
          'post',
        );
        console.log('res:', res);

        setIsLoading(false);
        if (res?.status === 'success') {
          // Thành công
          navigation.navigate('LoginScreen');
        } else {
          setErrorMessage(res?.message || 'Invalid code. Please try again.');
        }
      } catch (error) {
        setIsLoading(false);
        console.log('OTP verification failed', error);
        setErrorMessage('Invalid code. Please try again.');
      }
    } else {
      setErrorMessage('Time out verification code, please resend new code.');
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground isScrollable back>
        <SectionComponent>
          <TextCus styles={{marginLeft: 20}} text="Verification" title />
          <SpaceComponent height={12} />
          <TextCus
            styles={{marginLeft: 20}}
            text={`We’ve send you the verification code on ${email.replace(
              /.{1,5}/,
              (m: any) => '*'.repeat(m.length),
            )}`}
          />
          <SpaceComponent height={26} />
          <RowComponent
            justify="space-between"
            styles={{paddingHorizontal: 20}}>
            <TextInput
              keyboardType="number-pad"
              ref={ref1}
              value={codeValues[0]}
              style={[styles.input]}
              maxLength={1}
              onChangeText={val => {
                val.length > 0 && ref2.current.focus();
                handleChangeCode(val, 0);
              }}
              // onChange={() => }
              placeholder="-"
            />
            <TextInput
              ref={ref2}
              value={codeValues[1]}
              keyboardType="number-pad"
              onChangeText={val => {
                handleChangeCode(val, 1);
                val.length > 0 && ref3.current.focus();
              }}
              style={[styles.input]}
              maxLength={1}
              placeholder="-"
            />
            <TextInput
              keyboardType="number-pad"
              value={codeValues[2]}
              ref={ref3}
              onChangeText={val => {
                handleChangeCode(val, 2);
                val.length > 0 && ref4.current.focus();
              }}
              style={[styles.input]}
              maxLength={1}
              placeholder="-"
            />
            <TextInput
              keyboardType="number-pad"
              ref={ref4}
              value={codeValues[3]}
              onChangeText={val => {
                handleChangeCode(val, 3);
              }}
              style={[styles.input]}
              maxLength={1}
              placeholder="-"
            />
          </RowComponent>
        </SectionComponent>
        <SpaceComponent height={20} />
        <SectionComponent styles={{alignItems: 'center'}}>
          <ButtonCus
            onPress={handleVerification}
            disabled={newCode.length !== 4}
            text="Continue"
            type="primary"
            iconFlex="right"
            icon={
              <View
                style={[
                  {
                    backgroundColor: newCode.length !== 4 ? '' : '',
                  },
                ]}>
                <ArrowCircleRight size={20} />
              </View>
            }
          />
        </SectionComponent>
        {errorMessage && (
          <SectionComponent styles={[]}>
            <TextCus
              styles={{textAlign: 'center'}}
              text={errorMessage}
              color={appColor.gray5}
            />
          </SectionComponent>
        )}
        <SectionComponent styles={{alignItems: 'center'}}>
          {limit > 0 ? (
            <SectionComponent styles={{alignItems: 'center'}}>
              <TextCus text="Re-send code in  " flex={0} />
              <TextCus
                text={`${(limit - (limit % 60)) / 60}:${
                  limit - (limit - (limit % 60))
                }`}
                flex={0}
                color={appColor.gray}
              />
            </SectionComponent>
          ) : (
            <SectionComponent>
              <ButtonCus
                type="link"
                text="Resend email verification"
                onPress={handleResendVerification}
              />
            </SectionComponent>
          )}
        </SectionComponent>
        <LoadingModal visible={isLoading} />
      </ContainerComponent>
    </>
  );
};

export default Verification;

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    textAlign: 'center',
  },
});
