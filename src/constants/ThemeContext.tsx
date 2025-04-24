import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance} from 'react-native';
import * as RNLocalize from 'react-native-localize';

export type Language = 'en' | 'id' | null;

type ThemeContextType = {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  language: Language;
  setLanguage: (language: Language) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  setIsDarkMode: () => {},
  language: null,
  setLanguage: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>(null);

  useEffect(() => {
    const loadThemeAndLanguage = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');

      setIsDarkMode(
        storedTheme === 'true' ||
          (storedTheme === null && Appearance.getColorScheme() === 'dark'),
      );

      const storedLanguage = await AsyncStorage.getItem('language');
      const defaultLanguage: Language =
        RNLocalize.getLocales()[0].languageCode === 'id' ? 'id' : 'en';
      const newLanguage =
        storedLanguage === null
          ? defaultLanguage
          : (storedLanguage as unknown as Language);
      setLanguage(newLanguage);
    };

    loadThemeAndLanguage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    if (language) {
      AsyncStorage.setItem('language', language as string);
    }
  }, [language]);

  return (
    <ThemeContext.Provider
      value={{isDarkMode, setIsDarkMode, language, setLanguage}}>
      {children}
    </ThemeContext.Provider>
  );
};
