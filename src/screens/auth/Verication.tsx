import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ButtonCus,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextCus,
} from '../../components';
import {appColor} from '../../constants/appColor';
import {fontFamilies} from '../../constants/fontFamilies';
import {ArrowRight} from 'iconsax-react-native';
import {globalStyles} from '../../styles/globalStyle';
import {useDispatch} from 'react-redux';
import authenticationApi from '../../api/authApi';
// import {AsyncStorage} from 'react-native';
import {addAuth} from '../../redux/reducers/authReducer';
import {LoadingModal} from '../../modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Verification = ({navigation, route}: any) => {
  const {token, email, password, fullname} = route.params;
  console.log("=====token=====", token)
  const [currentCode, setCurrentCode] = useState<string>(token);
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

    const api = `/verification`;
    setIsLoading(true);
    try {
      const res: any = await authenticationApi.HandleAuthentication(
        api,
        {email},
        // {email},
        'post',
      );

      setLimit(120);
      setCurrentCode(res.token);
      setIsLoading(false);

      console.log('==handleResendVerification====', res);
    } catch (error) {
      setIsLoading(false);
      console.log(`Can not send verification code ${error}`);
    }
  };
  const handleVerification = async () => {
    if (limit > 0) {
      if (parseInt(newCode) !== parseInt(currentCode)) {
        setErrorMessage('Invalid code!!!');
      } else {
        setErrorMessage('');

        const api = `/register`;
        const data = {
          email,
          password,
          fullname: fullname ?? '',
        };

        try {
          const res: any = await authenticationApi.HandleAuthentication(
            api,
            data,
            'post',
          );
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        } catch (error) {
          setErrorMessage('User has already exist!!!');
          console.log(`Can not create new user ${error}`);
        }
      }
    } else {
      setErrorMessage('Time out verification code, please resend new code!!!');
    }
  };
  return (
    <>
      <ContainerComponent isImageBackground title="" back>
        <SectionComponent>
          <TextCus title text="Verification" />
          <SpaceComponent height={15} />
          <TextCus
            text={`We’ve send you the verification code on ${email.replace(
              /.{1,5}/,
              (m: any) => '*'.repeat(m.length),
            )}`}
          />
          <SpaceComponent height={30} />
        </SectionComponent>
        <RowComponent justify="space-around">
          <TextInput
            keyboardType="number-pad"
            ref={ref1}
            value={codeValues[0]}
            style={[Styles.input]}
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
            style={[Styles.input]}
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
            style={[Styles.input]}
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
            style={[Styles.input]}
            maxLength={1}
            placeholder="-"
          />
        </RowComponent>
        <SectionComponent styles={{marginTop: 40}}>
          <ButtonCus
            disable={newCode.length !== 4}
            onPress={handleVerification}
            text="Continue"
            type="primary"
            iconFlex="right"
            icon={
              <View
                style={[
                  globalStyles.iconContainer,
                  {
                    backgroundColor:
                      newCode.length !== 4 ? appColor.gray : appColor.primary,
                  },
                ]}>
                <ArrowRight size={18} color={appColor.white} />
              </View>
            }
          />
        </SectionComponent>
        {errorMessage && (
          <SectionComponent>
            <TextCus
              styles={{textAlign: 'center'}}
              text={errorMessage}
              color={appColor.danger}
            />
          </SectionComponent>
        )}
        <SectionComponent>
          {limit > 0 ? (
            <RowComponent justify="center">
              <TextCus text="Re-send code in  " flex={0} />
              <TextCus
                text={`${(limit - (limit % 60)) / 60}:${
                  limit - (limit - (limit % 60))
                }`}
                flex={0}
                color={appColor.link}
              />
            </RowComponent>
          ) : (
            <RowComponent>
              <ButtonCus
                type="link"
                text="Resend email verification"
                onPress={handleResendVerification}
              />
            </RowComponent>
          )}
        </SectionComponent>
        <LoadingModal visible={isLoading} />
      </ContainerComponent>
    </>
  );
};
const Styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColor.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
  },
});
export default Verification;
