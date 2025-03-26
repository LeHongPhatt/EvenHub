import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import { appColor } from '../constants/appColor';
import { globalStyles } from '../styles/globalStyle';

interface Props {
  onPress?: () => void;
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  isShadow?: boolean;
  color?: string;
}

const CardCus = (props: Props) => {
  const {onPress, children, styles, isShadow, color} = props;

  const localStyles: StyleProp<ViewStyle>[] = [
    globalStyles.card,
    isShadow ? globalStyles.shadow : undefined,
    {backgroundColor: color ?? appColor.white},
    styles,
  ];

  return (
    <TouchableOpacity style={localStyles} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default CardCus;
