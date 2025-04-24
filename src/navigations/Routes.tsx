/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useTheme} from '../constants/ThemeContext';
import {MyDarkTheme, MyLightTheme} from '../constants/theme';
import {useTranslation} from 'react-i18next';
import {navigationRef} from './navigationService';

const Routes: React.FC = () => {
  const {isDarkMode, language} = useTheme();
  const {i18n} = useTranslation();
  const theme = isDarkMode ? MyDarkTheme : MyLightTheme;

  useEffect(() => {
    i18n.changeLanguage(language as string);
  }, [language]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer ref={navigationRef} theme={theme}>
          <StackNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Routes;
