import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';

interface IProps {
  selectedValue: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SegmentedServiceType: React.FC<IProps> = ({
  selectedValue,
  onChange,
  disabled = false,
}) => {
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);

  const values: {value: string; label: string}[] = [
    {
      value: 'SERVICES',
      label: 'Servis',
    },
    {
      value: 'NEW_INSTALL',
      label: 'Install Baru',
    },
  ];

  return (
    <View style={styles.container}>
      {values.map(({value, label}, index) => (
        <TouchableOpacity
          key={index}
          disabled={disabled}
          activeOpacity={0.8}
          style={[
            styles.button,
            value === selectedValue && styles.selectedButton,
          ]}
          onPress={() => onChange(value)}>
          <Text
            style={[
              styles.buttonText,
              value === selectedValue && styles.selectedButtonText,
            ]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.colors.placeHolder,
      borderRadius: 10,
      padding: 2,
      marginBottom: 16,
    },
    button: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    selectedButton: {
      backgroundColor: theme.colors.background,
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.semiBold,
    },
    selectedButtonText: {
      color: theme.colors.primary,
    },
  });

export default SegmentedServiceType;
