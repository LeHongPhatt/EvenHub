import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import {ImageBackground} from 'react-native';
import {globalStyles} from '../styles/globalStyle';
import {useNavigation} from '@react-navigation/native';
import RowComponent from './RowComponent';
import ButtonCus from './ButtonCus';
import {ArrowLeft} from 'iconsax-react-native';
import {appColor} from '../constants/appColor';
import TextCus from './TextCus';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  isImageBackground?: boolean;
  isScrollable?: boolean;
  title?: string;
  children?: ReactNode;
  back?: boolean;
}
const ContainerComponent = (props: Props) => {
  const {isImageBackground, isScrollable, title, children, back} = props;

  const navigation: any = useNavigation();

  const herderCus = () => {
    return (
      <View style={{flex: 1, paddingTop: 30}}>
        {(title || back) && (
          <RowComponent
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minWidth: 48,
              minHeight: 48,
            }}>
            {back && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{marginRight: 12}}>
                <ArrowLeft size={22} color={appColor.text} />
              </TouchableOpacity>
            )}
            {title ? (
              <TextCus
                text={title}
                size={16}
                flex={1}
                color={appColor.text}
                font={fontFamilies.medium}
              />
            ) : (
              <></>
            )}
          </RowComponent>
        )}
        {returnContainer}
      </View>
    );
  };
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
      <SafeAreaView style={{flex: 1}}>{herderCus()}</SafeAreaView>
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
