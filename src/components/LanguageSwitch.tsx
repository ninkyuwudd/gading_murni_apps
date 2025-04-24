/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import {useTheme as useThemeSwitch} from '../constants/ThemeContext';
import {SvgXml} from 'react-native-svg';
import {ICONS} from '../constants/theme';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../@types/theme';

const LanguageSwitch: React.FC = () => {
  const {language, setLanguage} = useThemeSwitch();
  const theme = useTheme() as Theme;

  const animateSwitch = new Animated.Value(language === 'en' ? 0 : 1);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'id' : 'en';
    setLanguage(newLanguage);
    Animated.timing(animateSwitch, {
      toValue: newLanguage === 'en' ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const knobPosition = animateSwitch.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 38],
  });

  return (
    <TouchableOpacity onPress={toggleLanguage} activeOpacity={0.7}>
      <View
        style={{
          width: 70,
          height: 34,
          backgroundColor: '#E9E9E9',
          borderRadius: 17,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 6,
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: theme.colors.primary,
            transform: [{translateX: knobPosition}],
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <SvgXml xml={ICONS.icnEnglish} width={22} height={22} />
        <SvgXml xml={ICONS.icnIndonesia} width={22} height={22} />
      </View>
    </TouchableOpacity>
  );
};

export default LanguageSwitch;
