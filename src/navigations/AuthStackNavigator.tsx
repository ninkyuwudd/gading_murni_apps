import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackNavigatorParamList} from '../@types/navigation';
import {useTranslation} from 'react-i18next';

import {
  LoginScreen,
  ForgetPasswordScreen,
  OtpScreen,
  RegisterScreen,
  AccountCreatedScreen,
  ResetPasswordScreen,
  VerificationMethodScreen,
} from '../features/auth';
import useGlobalScreenOptions from '../hooks/useGlobalScreenOptions';

const Stack = createNativeStackNavigator<AuthStackNavigatorParamList>();

const StackNavigator: React.FC = () => {
  const {t} = useTranslation();
  const globalScreenOptions = useGlobalScreenOptions();

  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={{
          title: t('headerForgetPasswordLabel'),
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{
          title: t('headerConfirmationOtpLabel'),
        }}
      />
      <Stack.Screen
        name="AccountCreated"
        component={AccountCreatedScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          title: t('AuthModule.ResetPassword.Header'),
        }}
      />
      <Stack.Screen
        name="VerificationMethod"
        component={VerificationMethodScreen}
        options={{
          title: t('registration'),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
