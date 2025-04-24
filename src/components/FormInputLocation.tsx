/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useField} from 'formik';
import {FONTS_FAMILIES, SIZES} from '../constants/theme';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../@types/theme';
import {navigationRef} from '../navigations/navigationService';
import {useCustomerDetail} from '../api/hooks/useCustomer';
import {useTranslation} from 'react-i18next';

type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  editable?: boolean;
};

const FormInputLocation: React.FC<FormInputProps> = ({
  name,
  label,
  editable = true,
  ...rest
}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const [field, meta, helpers] = useField<string>(name);
  const {value, onChange} = field;
  const {data, refetch} = useCustomerDetail();

  useFocusEffect(
    useCallback(() => {
      if (data) {
        helpers.setValue(
          data.data_body.user.profile?.address_detail || '',
          false,
        );
      }
    }, [data]),
  );

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  const locationHandle = () => {
    const navigationState = navigationRef.getState();
    navigationRef.navigate('CustomerHome', {
      state: {
        routes: [
          {
            name: 'ProfileTab',
            state: {
              routes: [
                {
                  name: 'Profile',
                },
                {
                  name: 'Location',
                  params: {
                    resetState: navigationState,
                  },
                },
              ],
            },
          },
        ],
      },
    });
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
              ? theme.colors.border
              : theme.colors.border,
          },
        ]}>
        <TextInput
          value={value}
          onChangeText={onChange(name)}
          style={[
            styles.input,
            {
              color: theme.colors.text,
            },
          ]}
          editable={false}
          placeholderTextColor={theme.colors.placeHolder}
          {...rest}
        />
        <TouchableOpacity
          disabled={!editable}
          onPress={locationHandle}
          style={styles.icon}>
          <Text style={styles.select}>{t('Actions.Select')}</Text>
        </TouchableOpacity>
      </View>
      {meta?.error && (
        <Text
          style={[
            styles.errorText,
            {
              color: theme.colors.errorText,
            },
          ]}>
          {meta?.error}
        </Text>
      )}
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
      height: 40,
      paddingHorizontal: 15,
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
    },
    select: {
      color: theme.colors.primary,
      fontFamily: FONTS_FAMILIES.medium,
      fontSize: SIZES.fontXs,
    },
    icon: {
      padding: 12,
    },
    errorText: {
      fontSize: 14,
      marginTop: 4,
      fontFamily: FONTS_FAMILIES.medium,
    },
  });

export default FormInputLocation;
