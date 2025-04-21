import {Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {LoadingModal} from '../../modal';
import {Validate} from '../../utils/Validate';
import authenticationAPI from '../../api/authApi';

const ForgotPassWord = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPass] = useState<string>('');
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleCheckEmail = () => {
    const isValidEmail = Validate.email(email);
    setIsDisable(!isValidEmail);
  };

  useEffect(() => {
    setError('');
    if (
      email &&
      newPassword &&
      confirmPassword &&
      newPassword === confirmPassword
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [email, newPassword, confirmPassword]);
  const handleRequestReset = async () => {
    setIsLoading(true);

    try {
      const response = await authenticationAPI.handleAuthentication(
        '/forgot_password',
        {email, newPassword, confirmPassword},
        'post',
      );
      console.log('===response:===', response);
      setIsLoading(false);
      if (response?.message) {
        // navigation.navigate("Verification", { email }); // ⚠️ Nhớ tạo màn này
        navigation.navigate('Verification', {
          email,
          otp: response?.otp || '',
          newPassword,
        });
      }
    } catch (err) {
      setIsLoading(false);
      const message = err.response?.data?.message || 'Đã có lỗi xảy ra';
      setError(message); // Xử lý đúng lỗi trả về từ backend
    }
  };

  return (
    <ContainerComponent back isImageBackground isScrollable>
      <SectionComponent>
        <TextCus text="Resset Password" title />
        <SpaceComponent height={12} />
        <TextCus text="Please enter your email address to request a password reset" />
        <SpaceComponent height={26} />
        <InputCus
          value={email}
          onChange={val => setEmail(val)}
          affix={<Sms size={20} color={appColor.gray} />}
          placeholder="abc@gmail.com"
          onEnd={handleCheckEmail}
        />
        <InputCus
          value={newPassword}
          onChange={val => setNewPassword(val)}
          affix={<Sms size={20} color={appColor.gray} />}
          isPassword
        />
        <InputCus
          value={confirmPassword}
          onChange={val => setConfirmPass(val)}
          affix={<Sms size={20} color={appColor.gray} />}
          isPassword
        />
      </SectionComponent>
      {error && <TextCus text={error} color={appColor.danger} />}
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonCus
          onPress={handleRequestReset}
          disabled={isDisable}
          text="Send"
          type="primary"
          icon={<ArrowRight size={20} color={appColor.white} />}
          iconFlex="right"
        />
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default ForgotPassWord;
