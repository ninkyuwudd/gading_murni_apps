/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import {useField} from 'formik';
import {SvgXml} from 'react-native-svg';
import {FONTS_FAMILIES, ICONS, SIZES} from '../constants/theme';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../@types/theme';

type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  multiline?: boolean;
  editable?: boolean;
  forceUppercase?: boolean;
  formatSeparator?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  secureTextEntry,
  multiline,
  keyboardType = 'default',
  editable = true,
  formatSeparator = false,
  forceUppercase,
  ...rest
}) => {
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const [field, meta, helpers] = useField<string>(name);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const {value} = field;

  const formatWithThousandSeparator = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleChange = (val: string) => {
    const rawValue = val.replace(/,/g, '');
    helpers.setValue(forceUppercase ? rawValue.toUpperCase() : rawValue, false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: meta?.error
              ? theme.colors.errorText
              : theme.colors.border,
            backgroundColor: editable
              ? theme.colors.background
              : theme.colors.border,
          },
        ]}>
        <TextInput
          value={
            value.length && formatSeparator
              ? formatWithThousandSeparator(value)
              : value
          }
          keyboardType={keyboardType}
          onChangeText={handleChange}
          editable={editable}
          style={[
            styles.input,
            {
              height: multiline ? 170 : 40,
              ...(multiline
                ? {
                    textAlignVertical: 'top',
                    textAlign: 'left',
                  }
                : {}),
            },
          ]}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={theme.colors.placeHolder}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.icon}>
            <SvgXml
              xml={isPasswordVisible ? ICONS.icnOpenEye : ICONS.icnCloseEye}
              height={16}
              width={16}
            />
          </TouchableOpacity>
        )}
      </View>
      {meta?.error && <Text style={styles.errorText}>{meta?.error}</Text>}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
      marginBottom: 8,
      color: theme.colors.text,
    },
    inputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 10,
      alignItems: 'center',
    },
    input: {
      flex: 1,
      paddingHorizontal: 15,
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
      color: theme.colors.text,
    },
    icon: {
      padding: 12,
    },
    errorText: {
      fontSize: 14,
      marginTop: 4,
      fontFamily: FONTS_FAMILIES.medium,
      color: theme.colors.errorText,
    },
  });

export default FormInput;
