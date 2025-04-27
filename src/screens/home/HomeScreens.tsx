import {
  View,
  Text,
  Button,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../../redux/reducers/authReducer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {globalStyles} from '../../styles/globalStyle';
import {appColor} from '../../constants/appColor';
import {
  CategoriesList,
  CircleCus,
  EventItem,
  InputCus,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextCus,
} from '../../components';
import {
  ArrowDown2,
  HambergerMenu,
  Notification,
  SearchNormal,
  Sms,
  Sort,
} from 'iconsax-react-native';
import {fontFamilies} from '../../constants/fontFamilies';
// import GeoLocation from "@react-native-community/geolocation"
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {AddressModel} from '../../Model/AddressModel';
import KYC from '../auth/KYC/KYC';

const HomeScreens = ({navigation}: any) => {
  return (
    <View style={{flex: 1}}>
      <Text>sdasdasdasd</Text>
    </View>
  );
};

export default HomeScreens;
