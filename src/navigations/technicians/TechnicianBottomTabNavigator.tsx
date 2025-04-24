/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useRef} from 'react';
import {Animated, Keyboard, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/native';
import {TechnicianBottomTabNavigatorParamList} from '../../@types/navigation';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../@types/theme';
import {DashboardScreen} from '../../features/technicians/dashboard';
import {ChatScreen} from '../../features/technicians/chat';
import {SvgXml} from 'react-native-svg';
import {FONTS_FAMILIES, ICONS, SIZES} from '../../constants/theme';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BookingStackNavigator from './BookingStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import {DefaultStyleSheet} from '../../constants/DefaultStyleSheet';
import {Notifications} from '../../features/notifications';
import {useNotificationCount} from '../../api/hooks/useNotifications';

const Tab = createBottomTabNavigator<TechnicianBottomTabNavigatorParamList>();

const TechnicianBottomTabNavigator = () => {
  const theme = useTheme() as Theme;
  const {t} = useTranslation();
  const defaultStyle = DefaultStyleSheet(theme);
  const translateY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const {data, refetch} = useNotificationCount();

  const baseTabBarHeight = 50;
  const bottomTabBarHeight = baseTabBarHeight + insets.bottom;

  const showTabBarForScreens = (
    route: RouteProp<Record<string, object | undefined>, string>,
  ): boolean => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    const showOnScreens: string[] = [
      'Dashboard',
      'Booking',
      'Service',
      'ChatTab',
      'Notifications',
      'Profile',
      '',
    ];

    return showOnScreens.includes(routeName);
  };

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(translateY, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [translateY]);

  return (
    <Animated.View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: true,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.placeHolder,
          tabBarLabelStyle: {
            fontSize: SIZES.fontXs,
            fontFamily: FONTS_FAMILIES.medium,
          },
          tabBarStyle: {
            ...(showTabBarForScreens(route) ? {} : {display: 'none'}),
            paddingBottom: 5,
            position: 'absolute',
            height: bottomTabBarHeight,
            bottom: 0,
            left: 0,
            right: 0,
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, bottomTabBarHeight],
                }),
              },
            ],
          },
        })}>
        <Tab.Screen
          name="DashboardTab"
          component={DashboardScreen}
          listeners={() => ({
            tabPress: () => {
              refetch();
            },
          })}
          options={{
            tabBarLabel: t('tabBarDashboardLabel'),
            headerShown: false,
            headerShadowVisible: true,
            headerStyle: defaultStyle.shadow,
            tabBarIcon: ({color, size}) => (
              <SvgXml
                xml={ICONS.navIcnDashboard(color)}
                color={color}
                width={size}
                height={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="BookingTab"
          component={BookingStackNavigator}
          listeners={() => ({
            tabPress: () => {
              refetch();
            },
          })}
          options={{
            tabBarLabel: t('tabBarBookingLabel'),
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <SvgXml
                xml={ICONS.navIcnBooking(color)}
                color={color}
                width={size}
                height={size}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="ChatTab"
          component={ChatScreen}
          options={{
            tabBarLabel: t('tabBarChatLabel'),
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <SvgXml
                xml={ICONS.navIcnChat(color)}
                color={color}
                width={size}
                height={size}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="NotificationsTab"
          component={Notifications}
          listeners={({}) => ({
            tabPress: () => {
              refetch();
            },
          })}
          options={{
            title: t('tabBarNotificationLabel'),
            headerShown: true,
            headerShadowVisible: true,
            headerTitleAlign: 'center',
            headerStyle: defaultStyle.shadow,
            tabBarLabel: t('tabBarNotificationLabel'),
            tabBarIcon: ({color, size}) => (
              <View>
                <SvgXml
                  xml={ICONS.navIcnNotification(color)}
                  color={color}
                  width={size}
                  height={size}
                />
                {data?.data_body.inbox_unread ? (
                  <View
                    style={{
                      position: 'absolute',
                      right: data?.data_body.inbox_unread > 99 ? -8 : 0,
                      top: -1,
                      backgroundColor: 'red',
                      borderRadius: size,
                      height: size - 10,
                      width:
                        data?.data_body.inbox_unread > 99 ? size : size - 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 9,
                        fontFamily: FONTS_FAMILIES.bold,
                        color: 'white',
                      }}>
                      {data?.data_body.inbox_unread < 99
                        ? data?.data_body.inbox_unread
                        : '99+'}
                    </Text>
                  </View>
                ) : null}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackNavigator}
          listeners={() => ({
            tabPress: () => {
              refetch();
            },
          })}
          options={{
            headerShown: false,
            tabBarLabel: t('tabBarProfileLabel'),
            tabBarIcon: ({color, size}) => (
              <SvgXml
                xml={ICONS.navIcnProfile(color)}
                color={color}
                width={size}
                height={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </Animated.View>
  );
};

export default TechnicianBottomTabNavigator;
