import {Alert} from 'react-native';
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
import authenticationApi from '../../api/authApi';
import {appColor} from '../../constants/appColor';
import {LoadingModal} from '../../modal';
import {Validate} from '../../utils/Validate';

const ForgotPassWord = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckEmail = () => {
    const isValidEmail = Validate.email(email);
    setIsDisable(!isValidEmail);
  };

  const handleForgotPassWord = async () => {
    const api = `/forgotPassword`;
    setIsLoading(true);
    try {
      const res: any = await authenticationApi.HandleAuthentication(
        api,
        {email},
        'post',
      );

      console.log(res);

      Alert.alert('Send mail', 'We sended a email includes new password!!!');
      navigation.navigate('LoginScreen');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(`Can not create new password api forgot password, ${error}`);
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
      </SectionComponent>
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonCus
          onPress={handleForgotPassWord}
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
