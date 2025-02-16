import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import TextCus from './TextCus';
import {globalStyles} from '../styles/globalStyle';
import {appColor} from '../constants/appColor';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  icon?: ReactNode;
  text?: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  iconFlex?: 'right' | 'Left';
}

const ButtonCus = (props: Props) => {
  const {
    icon,
    text,
    type,
    color,
    styles,
    textColor,
    textStyle,
    onPress,
    iconFlex,
  } = props;
  return type === 'primary' ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.button,
        {backgroundColor: color ?? appColor.primary},
        styles,
      ]}>
      {icon && iconFlex === 'Left' && icon}
      <TextCus
        text={text}
        color={textColor && appColor.white}
        styles={[
          textStyle,
          {
            marginLeft: icon ? 12 : 0,
            fontSize:16
          },
        ]}
        font={fontFamilies.semiBold}
        flex={icon && iconFlex === 'right' ? 1 : 0}
      />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity>
      <TextCus
        color={type === 'link' ? appColor.primary : appColor.text}
        text={text}
      />
    </TouchableOpacity>
  );
};

export default ButtonCus;
