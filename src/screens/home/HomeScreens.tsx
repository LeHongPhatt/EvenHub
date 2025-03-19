import {
  View,
  Text,
  Button,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../../redux/reducers/authReducer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {globalStyles} from '../../styles/globalStyle';
import {appColor} from '../../constants/appColor';
import {
  CircleCus,
  InputCus,
  RowComponent,
  SpaceComponent,
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

const HomeScreens = ({navigation}: any) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />

      <View
        style={{
          backgroundColor: appColor.primary,
          height: 179,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          padding: StatusBar.currentHeight,
        }}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <HambergerMenu size={24} color={appColor.white} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <RowComponent>
              <TextCus text="Curren Location" color={appColor.white} />
              <ArrowDown2 size={20} color={appColor.white} />
            </RowComponent>
            <TextCus
              text="New York"
              color={appColor.white}
              flex={0}
              font={fontFamilies.medium}
            />
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
          <RowComponent styles={{flex: 1}}>
            <SearchNormal size={16} variant="TwoTone" color={appColor.white} />
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
            onPress={() => {}}
            label="Filter"
            icon={
              <CircleCus size={20} color="#b1aefa">
                <Sort size={16} />
              </CircleCus>
            }
          />
        </RowComponent>
      </View>
      <View style={{flex: 1, backgroundColor: appColor.white}}></View>
    </View>
  );
};

export default HomeScreens;
