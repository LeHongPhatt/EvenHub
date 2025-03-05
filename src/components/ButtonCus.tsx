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
  textFont?: string;
  onPress?: () => void;
  iconFlex?: 'right' | 'Left';
  disabled?: boolean;
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
    textFont,
    onPress,
    iconFlex,
    disabled,
  } = props;
  return type === 'primary' ? (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        globalStyles.button,
        globalStyles.shadow,
        {
          backgroundColor: color
            ? color
            : disabled
            ? appColor.gray4
            : appColor.primary,
          marginBottom: 17,
          width: '90%',
        },
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
            fontSize: 16,
            textAlign: 'center',
          },
        ]}
        font={textFont ?? fontFamilies.semiBold}
        flex={icon && iconFlex === 'right' ? 1 : 0}
      />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextCus
        color={type === 'link' ? appColor.primary : appColor.text}
        text={text}
      />
    </TouchableOpacity>
  );
};

export default ButtonCus;
