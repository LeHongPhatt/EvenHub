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

const HomeScreens = ({navigation}: any) => {
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      if (position.coords) {
        reversGeoCode({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    });
  }, []);
  const reversGeoCode = async ({long, lat}: {long: number; lat: number}) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at${lat},long=${long}&lang=vi-VI&apiKey=XyX6wuUbf0PdDVgpQfxEo9DUrYfmQG4UnfOBo2NKTRo`;
    try {
      const res = await axios(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        setCurrentLocation(items[0]);
      }

      console.log(res);
    } catch (error) {
      console.error('Error fetching location', error);
    }
  };
  const itemEvent = {
    title: 'International Band Music Concert',
    description:
      'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
    location: {
      title: 'Gala Convention Center',
      address: '36 Guild Street London, UK',
    },
    imageUrl: '',
    users: [''],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  };

  return (
    <View style={[{backgroundColor: '#FFF', flex: 1}]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColor.primary,
          height: 178 + (Platform.OS === 'ios' ? 16 : 0),
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? 52 : StatusBar.currentHeight,
        }}>
        <View style={{paddingHorizontal: 16}}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColor.white} />
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center'}}>
              <RowComponent>
                <TextCus text="Curren Location" color={appColor.white} />
                <ArrowDown2 size={20} color={appColor.white} />
              </RowComponent>
              {currentLocation && (
                <TextCus
                  text={`${currentLocation?.address.city}, ${currentLocation?.address.countryCode}`}
                  color={appColor.white}
                  flex={0}
                  font={fontFamilies.medium}
                  size={13}
                />
              )}
            </View>
            <CircleCus color="#524CE0" size={36}>
              <TouchableOpacity>
                <Notification size={18} color={appColor.white} />
                <View
                  style={{
                    backgroundColor: appColor.danger,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderStartColor: appColor.gray,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                />
              </TouchableOpacity>
            </CircleCus>
          </RowComponent>
          <SpaceComponent height={20} />
          <RowComponent>
            <RowComponent
              styles={{flex: 1}}
              onPress={() =>
                navigation.navigate('SearchEvent', {
                  isFilter: false,
                })
              }>
              <SearchNormal
                size={16}
                variant="TwoTone"
                color={appColor.white}
              />
              <View
                style={{
                  width: 2,
                  height: 20,
                  backgroundColor: appColor.gray,
                  marginHorizontal: 10,
                }}
              />
              <TextCus color={appColor.white} text="Search..." />
            </RowComponent>
            <TagComponent
              bgColor="#5d56f3"
              onPress={() =>
                navigation.navigate('SearchEvent', {
                  isFilter: true,
                })
              }
              label="Filter"
              icon={
                <CircleCus size={20} color="#b1aefa">
                  <Sort size={16} />
                </CircleCus>
              }
            />
          </RowComponent>
        </View>
        <SpaceComponent height={5} />
        <View style={{marginTop: 10}}>
          <CategoriesList isColor />
        </View>
      </View>
      <ScrollView
        style={[
          {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 22 : 28,
          },
        ]}>
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 24}}>
          <TabBarComponent title="Upcoming Events" onPress={() => {}} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={itemEvent} type="card" />
            )}
          />
        </SectionComponent>
        <SectionComponent>
          <ImageBackground
            source={require('../../assets/images/invite-image.png')}
            style={{flex: 1, padding: 16, minHeight: 127}}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
            }}>
            <TextCus text="Invite your friends" title />
            <TextCus text="Get $20 for ticket" />

            <RowComponent justify="flex-start">
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    marginTop: 12,
                    backgroundColor: '#00F8FF',
                    paddingHorizontal: 28,
                  },
                ]}>
                <TextCus
                  text="INVITE"
                  font={fontFamilies.bold}
                  color={appColor.white}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 24}}>
          <TabBarComponent title="Nearby You" onPress={() => {}} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={itemEvent} type="card" />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreens;
