import {Bookmark, Bookmark2, Location} from 'iconsax-react-native';
import React from 'react';

import {ImageBackground} from 'react-native';
import {fontFamilies} from '../constants/fontFamilies';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { appInfor } from '../constants/appInfor';
import { globalStyles } from '../styles/globalStyle';
import { appColor } from '../constants/appColor';
import { EventModel } from '../Model/EventModel';
import CardCus from './CardCus';
import RowComponent from './RowComponent';
import TextCus from './TextCus';
import AvatarGroup from './AvatarGroup';
import SpaceComponent from './SpaceComponent';

interface Props {
  item: EventModel;
  type: 'card' | 'list';
}

const EventItem = (props: Props) => {
  const {item, type} = props;

  const navigation: any = useNavigation();

  return (
    <CardCus
      isShadow
      styles={{width: appInfor.size.WIDTH * 0.7}}
      onPress={() => navigation.navigate('EventDetail', {item})}>
      <ImageBackground
        style={{flex: 1, marginBottom: 12, height: 131, padding: 10}}
        source={require('../assets/images/demo-event-image.png')}
        imageStyle={{
          resizeMode: 'cover',
          borderRadius: 12,
        }}>
        <RowComponent justify="space-between">
          <CardCus styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
            <TextCus
              color={appColor.danger2}
              font={fontFamilies.bold}
              size={18}
              text="10"
            />
            <TextCus
              color={appColor.danger2}
              font={fontFamilies.semiBold}
              size={10}
              text="JUNE"
            />
          </CardCus>
          <CardCus styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
            <MaterialIcons
              name="bookmark"
              color={appColor.danger2}
              size={22}
            />
          </CardCus>
        </RowComponent>
      </ImageBackground>
      <TextCus numOfLine={1} text={item.title} title size={18} />
      <AvatarGroup />
      <RowComponent>
        <Location size={18} color={appColor.text3} variant="Bold" />
        <SpaceComponent width={8} />
        <TextCus
          flex={1}
          numOfLine={1}
          text={item.location.address}
          size={12}
          color={appColor.text2}
        />
      </RowComponent>
    </CardCus>
  );
};

export default EventItem;
