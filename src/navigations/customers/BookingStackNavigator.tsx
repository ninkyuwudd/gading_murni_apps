import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BookingStackNavigatorParamList} from '../../@types/navigation';
import {useTranslation} from 'react-i18next';

import {
  BookingDetailScreen,
  BookingScreen,
} from '../../features/customers/booking';
import useGlobalScreenOptions from '../../hooks/useGlobalScreenOptions';

const Stack = createNativeStackNavigator<BookingStackNavigatorParamList>();

const StackNavigator: React.FC = () => {
  const {t} = useTranslation();
  const globalScreenOptions = useGlobalScreenOptions();

  return (
    <Stack.Navigator
      initialRouteName="Booking"
      screenOptions={{
        ...globalScreenOptions,
      }}>
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: t('BookingModule.TabBarBooking'),
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="BookingDetail"
        component={BookingDetailScreen}
        options={{
          title: t('BookingModule.BookingDetail.Header'),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
