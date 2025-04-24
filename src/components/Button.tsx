/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  TextProps,
  ActivityIndicator,
} from 'react-native';
import {FONTS_FAMILIES, SIZES} from '../constants/theme';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../@types/theme';

type TButtonProps = TouchableOpacityProps & {
  title: string;
  outline?: boolean;
  style?: TouchableOpacityProps['style'];
  textStyle?: TextProps['style'];
  danger?: boolean;
  loading?: boolean;
};

const Button: React.FC<TButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  outline,
  danger,
  loading,
  ...rest
}) => {
  const theme = useTheme() as Theme;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        outline
          ? {
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: danger
                ? theme.colors.errorText
                : theme.colors.primary,
            }
          : {
              backgroundColor: theme.colors.primary,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
        rest.disabled ? {backgroundColor: theme.colors.border} : {},
        style,
      ]}
      {...rest}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.background} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: outline
                ? danger
                  ? theme.colors.errorText
                  : theme.colors.primary
                : theme.colors.buttonText,
            },
            textStyle,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    height: 45,
  },
  text: {
    fontSize: SIZES.fontLg,
    fontFamily: FONTS_FAMILIES.bold,
  },
});

export default Button;
