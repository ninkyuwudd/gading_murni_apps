import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootNavigatorParamList} from '../@types/navigation';
import {OnboardingScreen} from '../features/onboarding';
import AuthStackNavigator from './AuthStackNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

import {useTheme} from '@react-navigation/native';
import useGlobalScreenOptions from '../hooks/useGlobalScreenOptions';
import CustomerBottomTabNavigator from './customers/CustomerBottomTabNavigator';
import TechnicianBottomTabNavigator from './technicians/TechnicianBottomTabNavigator';
import MachineStackNavigator from './customers/MachineStackNavigator';
import {UserType} from '../@types/auth';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const StackNavigator: React.FC = () => {
  const theme = useTheme();
  const globalScreenOptions = useGlobalScreenOptions();
  const isOnboarded = useSelector((state: RootState) => state.user.onboarded);
  const userType = useSelector((state: RootState) => state.user.userType);
  const token = useSelector((state: RootState) => state.user.token);

  const initialRoute = token
    ? userType === UserType.CUSTOMER
      ? 'CustomerHome'
      : 'TechnicianHome'
    : isOnboarded
    ? 'Auth'
    : 'Onboarding';

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          ...globalScreenOptions,
          headerShown: false,
        }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
        <Stack.Screen
          name="CustomerHome"
          component={CustomerBottomTabNavigator}
        />
        <Stack.Screen
          name="TechnicianHome"
          component={TechnicianBottomTabNavigator}
        />
        <Stack.Screen name="Machine" component={MachineStackNavigator} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
