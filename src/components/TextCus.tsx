import {View, Text, StyleProp, TextStyle, Platform} from 'react-native';
import React from 'react';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyle';
import {appColor} from '../constants/appColor';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
  numOfLine?: number;
}

const TextCus = (props: Props) => {
  const {text, size, flex, font, color, styles, title, numOfLine} = props;

  const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14;

  return (
    <Text
      numberOfLines={numOfLine}
      style={[
        globalStyles.text,
        {
          color: color ?? appColor.text,
          flex: flex ?? 0,
          fontSize: size ? size : title ? 24 : fontSizeDefault,
          fontFamily: font
            ? font
            : title
            ? fontFamilies.medium
            : fontFamilies.regular,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextCus;
