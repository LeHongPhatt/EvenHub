import React from 'react';
import {View, ViewStyle, StyleSheet, ViewProps} from 'react-native';
import {globalStyles} from '../styles/globalStyle';

interface ViewCusProps extends ViewProps {
  flex?: number;
  row?: boolean; // Hiển thị ngang
  center?: boolean; // Căn giữa
  spaceBetween?: boolean; // Cách đều giữa các item
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'; // Căn theo chiều dọc
  padding?: number; // Padding mặc định
  margin?: number; // Margin mặc định
  bg?: string; // Màu nền
  style?: ViewStyle; // Style bổ sung nếu cần
  mh?: number; // margin horizontal
  mv?: number; // margin vertical
  ph?: number; // padding horizontal
  pv?: number; // padding vertical
  mt?: number; // margin top
}

const SectionComponent: React.FC<ViewCusProps> = ({
  flex,
  row = false,
  center = false,
  spaceBetween = false,
  align = 'flex-start',
  padding,
  margin,
  bg = 'transparent',
  style,
  children,
  mh,
  mv,
  pv,
  ph,
  mt,
  ...rest
}) => {
  return (
    <View
      style={[
        globalStyles.section,
        {
          flex,
          flexDirection: row ? 'row' : 'column',
          justifyContent: center
            ? 'center'
            : spaceBetween
            ? 'space-between'
            : 'flex-start',
          alignItems: center ? 'center' : align,
          padding: padding ?? undefined, // Tránh đè lên paddingVertical/paddingHorizontal
          margin: margin ?? undefined, // Tránh đè lên marginVertical/marginHorizontal
          backgroundColor: bg,
          paddingVertical: pv ?? padding ?? undefined, // Dùng `pv` nếu có, nếu không dùng padding mặc định
          paddingHorizontal: ph ?? padding ?? undefined, // Dùng `ph` nếu có, nếu không dùng padding mặc định
          marginVertical: mv ?? margin ?? undefined, // Dùng `mv` nếu có, nếu không dùng margin mặc định
          marginHorizontal: mh ?? margin ?? undefined, // Dùng `mh` nếu có, nếu không dùng margin mặc định
          borderBottomWidth: 0, // Bỏ dấu gạch dưới
          marginTop: mt ?? margin ?? undefined, // Dùng `mt` nếu có, nếu không dùng margin mặc định
        },
        style, // Bổ sung style nếu có
      ]}
      {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default SectionComponent;
