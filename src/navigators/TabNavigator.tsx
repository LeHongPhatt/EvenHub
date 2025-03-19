import {View, Text, Platform} from 'react-native';
import React, {ReactNode} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AddNewScreen} from '../screens';
import {
  AddSquare,
  Calendar,
  ExportCircle,
  Location,
  User,
} from 'iconsax-react-native';
import {appColor} from '../constants/appColor';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CircleCus, TextCus} from '../components';
import ExploreNavigator from './ExploreNavigator';
import EventNavigator from './EventNavigator';
import MapNavigator from './MapNavigator';
import ProfileNavigator from './ProfileNavigator';
import {globalStyles} from '../styles/globalStyle';
import DrawerNavigator from './DrawerNavigator';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 68,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: appColor.white,
        },
        tabBarIcon: ({focused, color, size}) => {
          let icon: ReactNode;
          color = focused ? appColor.primary : appColor.gray5;
          size = 24;
          switch (route.name) {
            case 'Explore':
              icon = <MaterialIcons name="explore" color={color} size={size} />;
              break;
            case 'Events':
              icon = <Calendar color={color} size={size} />;
              break;
            case 'Map':
              icon = <Location color={color} size={size} />;
              break;
            case 'Profile':
              icon = <User color={color} size={size} />;
              break;
            case 'Add':
              icon = (
                <CircleCus
                  size={52}
                  styles={[
                    globalStyles.shadow,
                    {
                      marginTop: Platform.OS === 'android' ? -50 : -60,
                    },
                  ]}>
                  <AddSquare size={24} color={appColor.white} variant="Bold" />
                </CircleCus>
              );
          }
          return icon;
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarLabel({focused}) {
          return route.name === 'Add' ? null : (
            <TextCus
              text={route.name}
              flex={0}
              size={12}
              color={focused ? appColor.primary : appColor.gray5}
              styles={{marginBottom: Platform.OS === 'android' ? 12 : 0}}
            />
          );
        },
      })}>
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Events" component={EventNavigator} />
      <Tab.Screen name="Add" component={AddNewScreen} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />

    </Tab.Navigator>
  );
};

export default TabNavigator;
