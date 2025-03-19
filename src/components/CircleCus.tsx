import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {appColor} from '../constants/appColor';

interface Props {
  size?: number;
  children: ReactNode;
  color?: string;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
}

const CircleCus = (props: Props) => {
  const {size, color, onPress, children, styles} = props;

  const localStyle: any = {
    width: size ?? 40,
    height: size ?? 40,
    backgroundColor: color ?? appColor.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  };

  return onPress ? (
    <TouchableOpacity style={[localStyle, styles]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[localStyle, styles]}>{children}</View>
  );
};

export default CircleCus;
