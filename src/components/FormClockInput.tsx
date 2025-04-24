import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useField} from 'formik';
import {SvgXml} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';
import {FONTS_FAMILIES, ICONS, SIZES} from '../constants/theme';
import {Theme} from '../@types/theme';

type FormClockInputProps = {
  name: string;
  label: string;
  editable?: boolean;
};

const FormClockInput: React.FC<FormClockInputProps> = ({
  name,
  label,
  editable = true,
}) => {
  const [show, setShow] = useState(false);
  const theme = useTheme() as Theme;
  const [field, meta, helpers] = useField<Date>(name);
  const {value} = field;

  const onChange = (event: unknown, selectedTime?: Date) => {
    setShow(Platform.OS === 'ios');
    const hours = `0${selectedTime!!.getHours()}`.slice(-2);
    const minutes = `0${selectedTime!!.getMinutes()}`.slice(-2);
    const newTime = `${hours}:${minutes}` as unknown as Date;
    helpers.setValue(newTime, false);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: theme.colors.text,
          },
        ]}>
        {label}
      </Text>
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
          {String(value).length ? String(value) : 'Select Date'}
        </Text>
        <SvgXml
          xml={ICONS.icnClockForm(theme.colors.text)}
          width={16}
          height={16}
          style={styles.icon}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value ? new Date(`1970-01-01T${value}:00`) : new Date()}
          mode="time"
          is24Hour={true}
          display="clock"
          onChange={onChange}
        />
      )}
      {meta?.error && (
        <Text
          style={[
            styles.errorText,
            {
              color: theme.colors.errorText,
            },
          ]}>
          {meta.error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: SIZES.font,
    fontFamily: FONTS_FAMILIES.medium,
    marginBottom: 8,
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
  },
});

export default FormClockInput;
