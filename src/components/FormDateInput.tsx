import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useField} from 'formik';
import {SvgXml} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';
import {FONTS_FAMILIES, ICONS, SIZES} from '../constants/theme';
import {Theme} from '../@types/theme';
import {useTranslation} from 'react-i18next';

type FormDateInputProps = {
  name: string;
  label: string;
  editable?: boolean;
  minimumDate?: boolean;
};

const FormDateInput: React.FC<FormDateInputProps> = ({
  name,
  label,
  editable = true,
  minimumDate = true,
}) => {
  const {t} = useTranslation();
  const [show, setShow] = useState(false);
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const [field, meta, helpers] = useField<Date>(name);
  const {value} = field;

  const onChange = (event: unknown, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');
    const day = `0${selectedDate!!.getDate()}`.slice(-2);
    const month = `0${selectedDate!!.getMonth() + 1}`.slice(-2);
    const year = selectedDate!!.getFullYear();
    const newDate = `${year}-${month}-${day}` as unknown as Date;
    helpers.setValue(newDate, false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!editable}
        onPress={() => setShow(true)}
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
        <Text
          style={[
            styles.input,
            {
              color: String(value).length
                ? theme.colors.text
                : theme.colors.placeHolder,
            },
          ]}>
          {String(value).length ? String(value) : t('Actions.Select')}
        </Text>
        <SvgXml
          xml={ICONS.icnCalendarForm(theme.colors.text)}
          width={16}
          height={16}
          style={styles.icon}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={String(value).length ? new Date(value) : new Date()}
          mode="date"
          display="calendar"
          onChange={onChange}
          minimumDate={minimumDate ? new Date() : undefined}
        />
      )}
      {meta?.error && <Text style={styles.errorText}>{meta.error}</Text>}
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
      height: 40,
      paddingHorizontal: 10,
    },
    input: {
      flex: 1,
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
      justifyContent: 'center',
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

export default FormDateInput;
