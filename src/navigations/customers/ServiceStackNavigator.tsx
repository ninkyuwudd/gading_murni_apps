import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ServiceStackNavigatorParamList} from '../../@types/navigation';
import {useTranslation} from 'react-i18next';

import {
  ServiceScreen,
  ServiceRequestCreatedScreen,
  ServiceRatingScreen,
  SubmitServiceScheduleScreen,
  ServiceDetailScreen,
  ServiceReviewScreen,
} from '../../features/customers/service';
import useGlobalScreenOptions from '../../hooks/useGlobalScreenOptions';

const Stack = createNativeStackNavigator<ServiceStackNavigatorParamList>();

const StackNavigator: React.FC = () => {
  const {t} = useTranslation();
  const globalScreenOptions = useGlobalScreenOptions();

  return (
    <Stack.Navigator
      initialRouteName="Service"
      screenOptions={{
        ...globalScreenOptions,
      }}>
      <Stack.Screen
        name="Service"
        component={ServiceScreen}
        options={{
          title: t('ServiceModule.TabBarService'),
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="SubmitServiceSchedule"
        component={SubmitServiceScheduleScreen}
        options={{
          title: t('ServiceModule.HeaderSubmitServiceSchedule'),
        }}
      />
      <Stack.Screen
        name="ServiceRequestCreated"
        component={ServiceRequestCreatedScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{
          title: t('ServiceModule.ServiceDetail.Header'),
        }}
      />
      <Stack.Screen
        name="ServiceRating"
        component={ServiceRatingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ServiceReview"
        component={ServiceReviewScreen}
        options={{
          title: t('ServiceModule.Review.Header'),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
