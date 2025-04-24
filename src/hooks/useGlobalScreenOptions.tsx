import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {FONTS_FAMILIES} from '../constants/theme';
import {Theme} from '../@types/theme';
import {BackButton} from '../components';

const useGlobalScreenOptions = (): NativeStackNavigationOptions => {
  const theme = useTheme() as Theme;
  return {
    headerShown: true,
    gestureEnabled: false,
    headerTitleStyle: {
      fontFamily: FONTS_FAMILIES.bold,
      color: theme.colors.text,
    },
    headerLeft: () => <BackButton />,
  };
};

export default useGlobalScreenOptions;
