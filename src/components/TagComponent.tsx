import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import TextCus from './TextCus';
import {globalStyles} from '../styles/globalStyle';
import {appColor} from '../constants/appColor';

interface Props {
  onPress: () => void;
  label: string;
  icon?: ReactNode;
  textColor?: string;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}
const TagComponent = (props: Props) => {
  const {onPress, label, icon, textColor, styles, bgColor} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.row,
        globalStyles.tag,
        {
          backgroundColor: bgColor ?? appColor.white,
        },
        styles,
      ]}>
      {icon && icon}
      <TextCus
        text={label}
        styles={{marginLeft: icon ? 8 : 0}}
        color={textColor ? textColor : bgColor ? appColor.white : appColor.gray}
      />
    </TouchableOpacity>
  );
};

export default TagComponent;
