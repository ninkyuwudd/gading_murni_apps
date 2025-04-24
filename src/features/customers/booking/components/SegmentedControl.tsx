import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import {TBookingStatus} from '../constants/BookingStatus';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';

interface IProps {
  segments: TBookingStatus[];
  initialActiveIndex?: number;
  onChangeSegment?: (status: string) => void;
}

const SegmentedControl: React.FC<IProps> = ({
  segments,
  initialActiveIndex = 0,
  onChangeSegment,
}) => {
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const defaultStyle = DefaultStyleSheet(theme);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {segments.map((segment, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={segment.key}
            style={[
              styles.button,
              {
                backgroundColor:
                  index === activeIndex
                    ? theme.colors.primary
                    : theme.colors.background,
              },
              defaultStyle.shadow,
            ]}
            onPress={() => {
              setActiveIndex(index);
              if (onChangeSegment) {
                onChangeSegment(segment.code);
              }
            }}>
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    index === activeIndex
                      ? theme.colors.background
                      : theme.colors.headerText,
                },
              ]}>
              {segment.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    scrollContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 10,
      paddingVertical: 9,
    },
    button: {
      height: 40,
      paddingVertical: 8,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    buttonText: {
      fontSize: SIZES.fontLg,
      fontFamily: FONTS_FAMILIES.regular,
    },
    textActive: {
      color: theme.colors.headerText,
    },
  });

export default SegmentedControl;
