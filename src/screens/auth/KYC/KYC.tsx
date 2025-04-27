import {View, Text} from 'react-native';
import React from 'react';
import {ContainerComponent, SectionComponent} from '../../../components';
import {ImagePicker} from './components';

const KYC = ({route}: any) => {
  const {accesstoken} = route.params;
  const handleSubmit = () => {};
  return (
    <ContainerComponent
      isImageBackground
      isScrollable
      title="Create new profile ">
      <SectionComponent center>
        <ImagePicker accesstoken={accesstoken} />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default KYC;
