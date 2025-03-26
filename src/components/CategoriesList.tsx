import {View, Text, FlatList} from 'react-native';
import React, {ReactNode} from 'react';
import {appColor} from '../constants/appColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Ionicons from 'react-native-vector-icons/Ionicons';
import TagComponent from './TagComponent';
import TextCus from './TextCus';
import RowComponent from './RowComponent';
import {globalStyles} from '../styles/globalStyle';
import SpaceComponent from './SpaceComponent';
import {ChefFork} from '../assets/svgs';
interface Props {
  isColor?: boolean;
}
interface Category {
  key: string;
  title: string;
  icon: ReactNode;
  iconColor: string;
}
const CategoriesList = (props: Props) => {
  const {isColor} = props;

  const categories: {}[] = [
    {
      key: '1',
      icon: (
        <Ionicons
          name="basketball"
          size={22}
          color={isColor ? appColor.white : '#EE544A'}
        />
      ),
      iconColor: '#EE544A',
      title: 'Sports',
    },
    {
      key: '2',
      icon: (
        <FontAwesome
          name="music"
          size={22}
          color={isColor ? appColor.white : '#F59762'}
        />
      ),
      iconColor: '#F59762',
      title: 'Music',
    },
    {
      key: '3',
      icon: <ChefFork color={isColor ? appColor.white : '#29D697'} />,
      iconColor: '#29D697',
      title: 'Food',
    },
    {
      key: '4',
      icon: (
        <Ionicons
          name="color-palette-sharp"
          size={22}
          color={isColor ? appColor.white : '#46CDFB'}
        />
      ),
      iconColor: '#46CDFB',
      title: 'Art',
    },
    {
      key: '5',
      icon: (
        <Ionicons
          name="color-palette-sharp"
          size={22}
          color={isColor ? appColor.white : '#46CDFB'}
        />
      ),
      iconColor: '#46CDFB',
      title: 'Art',
    },
    {
      key: '6',
      icon: (
        <Ionicons
          name="color-palette-sharp"
          size={22}
          color={isColor ? appColor.white : '#46CDFB'}
        />
      ),
      iconColor: '#46CDFB',
      title: 'Art',
    },
  ];

  const renderCategory = (item: Category, index) => {
    return (
      <RowComponent
        onPress={() => {}}
        styles={[
          globalStyles.tag,
          {
            backgroundColor: isColor ? item.iconColor : appColor.white,
            justifyContent: 'space-between',
            marginLeft: 10,
            marginRight: index === categories.length - 1 ? 20 : 10,
          },
        ]}>
        {item.icon}
        <SpaceComponent width={8} />
        <TextCus
          text={item.title}
          color={isColor ? appColor.white : appColor.gray}
        />
      </RowComponent>
    );
  };
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={categories}
      renderItem={({item, index}) => renderCategory(item, index)}
    />
  );
};

export default CategoriesList;
