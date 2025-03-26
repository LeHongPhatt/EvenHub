import {ArrowRight2} from 'iconsax-react-native';
import React from 'react';
import {appColor} from '../constants/appColor';
import RowComponent from './RowComponent';
import TextCus from './TextCus';

interface Props {
  title: string;
  onPress: () => void;
}

const TagBarComponent = (props: Props) => {
  const {title, onPress} = props;

  return (
    <RowComponent
      onPress={onPress}
      styles={{marginBottom: 12, paddingHorizontal: 16}}>
      <TextCus numberOfLine={1} size={18} title text={title} flex={1} />
      <RowComponent>
        <TextCus text="See All " color={appColor.gray} />
        <ArrowRight2 variant="Bold" size={14} color={appColor.gray} />
      </RowComponent>
    </RowComponent>
  );
};

export default TagBarComponent;
