import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';

interface IProps {
  values: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

const SegmentedDetail: React.FC<IProps> = ({
  values,
  selectedIndex,
  onChange,
}) => {
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {values.map((value, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          style={[
            styles.button,
            index === selectedIndex && styles.selectedButton,
          ]}
          onPress={() => onChange(index)}>
          <Text
            style={[
              styles.buttonText,
              index === selectedIndex && styles.selectedButtonText,
            ]}>
            {value}
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
      borderRadius: 5,
      padding: 2,
      marginVertical: 20,
    },
    button: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
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

export default SegmentedDetail;
