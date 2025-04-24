/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacityProps,
  TextInputProps,
} from 'react-native';
import {FONTS_FAMILIES, ICONS, SIZES} from '../constants/theme';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../@types/theme';
import {SvgXml} from 'react-native-svg';

interface SearchBarProps {
  placeholder?: string;
  containerStyle?: TouchableOpacityProps['style'];
  onChangeText?: TextInputProps['onChangeText'];
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  containerStyle,
  onChangeText,
}) => {
  const theme = useTheme() as Theme;
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.colors.background},
        containerStyle,
      ]}>
      <View
        style={[
          styles.textInputContainer,
          {backgroundColor: theme.colors.border},
        ]}>
        <SvgXml
          xml={ICONS.icnSearch}
          width={16}
          height={16}
          style={{
            marginRight: 10,
          }}
        />
        <TextInput
          placeholder={placeholder}
          style={[styles.textInput, {color: theme.colors.text}]}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 4,
  },
  textInputContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: SIZES.font,
    fontFamily: FONTS_FAMILIES.medium,
    height: 40,
  },
});

export default SearchBar;
