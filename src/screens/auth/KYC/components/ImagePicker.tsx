import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonCus,
  ContainerComponent,
  InputCus,
  SectionComponent,
  TextCus,
} from '../../../../components';
import {Camera} from 'iconsax-react-native';
import {appColor} from '../../../../constants/appColor';
import DropDownPicker from 'react-native-dropdown-picker';
import authenticationAPI from '../../../../api/authApi';
import {LoadingModal} from '../../../../modal';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../../../redux/reducers/authReducer';
import {useNavigation} from '@react-navigation/native';

const ImagePicker = ({route}: any) => {
  const navigation = useNavigation();
  const {accesstoken} = route.params;
  console.log('======accesstoken====', accesstoken);
  const [isLoading, setLoading] = useState(false);
  const [useName, setUseName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isBio, setBio] = useState('');
  const [interest, setInterest] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setError('');
    if (!useName || !displayName) {
      setError('Vui lòng nhập đầy đủ Username và DisplayName!');
      return;
    }
    setLoading(true);
    try {
      const res = await authenticationAPI.handleAuthentication(
        '/kyc/profile',
        {
          username: useName,
          displayName: displayName,
          bio: isBio,
          interests: interest ? interest.split(',').map(i => i.trim()) : [],
        },
        'put',
        accesstoken,
      );
      console.log('======res====', res);
      if (res.data) {
        dispatch(addAuth(res.data));
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'Vui lòng thử lại!';
        setError(errorMessage);
      } else {
        setError('Lỗi mạng, vui lòng thử lại!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerComponent isImageBackground isScrollable back>
      <SectionComponent center>
        <TouchableOpacity
          style={{
            paddingHorizontal: 60,
            paddingVertical: 60,
            borderRadius: 100,
            backgroundColor: appColor.gray3,
          }}>
          <Camera size={50} color={appColor.gray} />
        </TouchableOpacity>
        <SectionComponent ph={20} mt={20}>
          <TextCus styles={{marginBottom: 10}} text="Name" />
          <InputCus value={useName} onChange={val => setUseName(val)} />
          <TextCus styles={{marginBottom: 10}} text="DisplayName" />
          <InputCus value={displayName} onChange={val => setDisplayName(val)} />
          <TextCus styles={{marginBottom: 10}} text="Bio" />
          <InputCus value={isBio} onChange={val => setBio(val)} />
          <TextCus styles={{marginBottom: 10}} text="Interest" />
          <InputCus value={interest} onChange={val => setInterest(val)} />
        </SectionComponent>
        {error ? (
          <TextCus
            text={error}
            color={appColor.danger}
            styles={{marginTop: 10}}
          />
        ) : null}
      </SectionComponent>
      <SectionComponent center>
        <ButtonCus
          iconFlex="right"
          textColor={appColor.white}
          text="Submit"
          type="primary"
          onPress={handleSubmit}
        />
        <LoadingModal visible={isLoading} />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ImagePicker;
