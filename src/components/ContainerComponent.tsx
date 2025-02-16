import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React, {ReactNode} from 'react';
import {ImageBackground} from 'react-native';
import {globalStyles} from '../styles/globalStyle';

interface Props {
  isImageBackground?: boolean;
  isScrollable?: boolean;
  title?: string;
  children?: ReactNode;
}
const ContainerComponent = (props: Props) => {
  const {isImageBackground, isScrollable, title, children} = props;
  const returnContainer = isScrollable ? (
    <ScrollView style={{flex: 1}}>{children}</ScrollView>
  ) : (
    <View style={{flex: 1}}>{children}</View>
  );
  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/images/splash-img.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>{returnContainer}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View>
        <Text>{returnContainer}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
