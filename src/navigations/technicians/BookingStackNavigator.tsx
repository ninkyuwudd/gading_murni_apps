import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TechnicianBookingStackNavigatorParamList} from '../../@types/navigation';
import {useTranslation} from 'react-i18next';

import {
  BookingScreen,
  BookingDetailScreen,
  EditCustomerDataScreen,
} from '../../features/technicians/booking';
import useGlobalScreenOptions from '../../hooks/useGlobalScreenOptions';

const Stack =
  createNativeStackNavigator<TechnicianBookingStackNavigatorParamList>();

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
          title: t('tabBarBookingLabel'),
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="BookingDetail"
        component={BookingDetailScreen}
        options={({route}) => ({
          title: `${t('itemBoookingCodeLabel')} ${route.params.bookingCode}`,
        })}
      />
      <Stack.Screen
        name="EditCustomerData"
        component={EditCustomerDataScreen}
        options={{
          title: t('changeCustomerDataLabel'),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
