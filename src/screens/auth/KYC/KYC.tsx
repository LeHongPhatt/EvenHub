import {View, Text} from 'react-native';
import React from 'react';
import {ContainerComponent, SectionComponent} from '../../../components';
import { ImagePicker } from './components';

const KYC = () => {
  return (
    <ContainerComponent
      isImageBackground
      isScrollable
      title="Create new profile ">
      <SectionComponent center>
        <ImagePicker />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default KYC;
