import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileStackNavigatorParamList} from '../../@types/navigation';
import {useTranslation} from 'react-i18next';

import {
  ProfileScreen,
  EditProfileScreen,
  ChangePasswordScreen,
  SettingScreen,
  AboutUsScreen,
  LocationScreen,
} from '../../features/customers/profile';
import useGlobalScreenOptions from '../../hooks/useGlobalScreenOptions';

const Stack = createNativeStackNavigator<ProfileStackNavigatorParamList>();

const StackNavigator: React.FC = () => {
  const {t} = useTranslation();
  const globalScreenOptions = useGlobalScreenOptions();

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        ...globalScreenOptions,
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t('tabBarProfileLabel'),
          headerLeft: () => null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: t('changePersonalDataLabel'),
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: t('changePasswordLabel'),
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: t('settingLabel'),
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          title: t('aboutUsLabel'),
        }}
      />
      <Stack.Screen
        name="Location"
        component={LocationScreen}
        options={{
          title: t('CustomerModule.Location.HeaderLocation'),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
