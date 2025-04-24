import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import {SegmentDataType} from '../constants/SegmentData';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {GlobalStyleSheet} from '../../../../constants/StyleSheet';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';

interface SegmentedControlProps {
  segments: SegmentDataType[];
  initialActiveIndex?: number;
  onChangeSegment?: (status: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  segments,
  initialActiveIndex = 0,
  onChangeSegment,
}) => {
  const theme = useTheme() as Theme;
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
                borderColor: theme.colors.border,
              },
              GlobalStyleSheet.shadow,
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

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: SIZES.fontLg,
    fontFamily: FONTS_FAMILIES.regular,
  },
  textActive: {
    color: 'white',
  },
});

export default SegmentedControl;
