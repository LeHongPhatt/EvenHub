import {View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {TextCus} from '../components';

interface Props {
  visible?: boolean;
  mess?: string;
}

const LoadingModal = (props: Props) => {
  const {visible, mess} = props;
  return (
    <Modal visible={visible} style={{flex: 1}} transparent statusBarTranslucent>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0, 0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <ActivityIndicator color={'#ffffff'} size={32} />
        <TextCus flex={0} text={mess} color={'#ffffff'} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
