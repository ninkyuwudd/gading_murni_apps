/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {useTheme as useThemeSwitch} from '../constants/ThemeContext';
import {SvgXml} from 'react-native-svg';
import {ICONS} from '../constants/theme';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../@types/theme';

const ThemeSwitch: React.FC = () => {
  const {isDarkMode, setIsDarkMode} = useThemeSwitch();
  const theme = useTheme() as Theme;

  const toggleAnimation = new Animated.Value(isDarkMode ? 1 : 0);

  const animateSwitch = () => {
    Animated.timing(toggleAnimation, {
      toValue: isDarkMode ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleToggle = () => {
    animateSwitch();
    setIsDarkMode(!isDarkMode);
  };

  const knobColor = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.background, theme.colors.background],
  });

  const knobPosition = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 22],
  });

  return (
    <TouchableOpacity onPress={handleToggle}>
      <View
        style={{
          width: 50,
          height: 26,
          backgroundColor: '#E9E9E9',
          borderRadius: 13,
          padding: 2,
          justifyContent: 'center',
        }}>
        <Animated.View
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: knobColor,
            transform: [{translateX: knobPosition}],
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SvgXml
            xml={ICONS.icnSunny(theme.colors.primary)}
            width={16}
            height={16}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default ThemeSwitch;
