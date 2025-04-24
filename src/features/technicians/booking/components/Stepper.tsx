import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Theme} from '../../../../@types/theme';
import {useTheme} from '@react-navigation/native';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {
  getSegmentDataIndex,
  SegmentDataType,
  getSegmentData,
} from '../constants/SegmentData';
import i18n from '../../../../i18n/i18n.config';

type StepperProps = {
  steps: number;
  currentStatus: number;
};

const Stepper: React.FC<StepperProps> = ({steps, currentStatus}) => {
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const currentIndex = getSegmentDataIndex(currentStatus);

  const [segmentData, setSegmentData] = useState<SegmentDataType[]>(
    getSegmentData(),
  );

  useEffect(() => {
    const handleLanguageChange = () => {
      setSegmentData(getSegmentData());
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const renderSteps = () => {
    let stepElements = [];

    for (let i = 1; i <= steps; i++) {
      stepElements.push(
        <View
          key={i}
          style={[
            styles.stepCircle,
            currentIndex >= i && styles.activeStepCircle,
          ]}>
          <Text
            style={[
              styles.stepText,
              currentIndex >= i && styles.activeStepText,
            ]}>
            {i}
          </Text>
        </View>,
      );

      if (i < steps) {
        stepElements.push(<View key={`line-${i}`} style={styles.line} />);
      }
    }

    return stepElements;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{segmentData[currentIndex].title}</Text>
      <View style={styles.stepContainer}>{renderSteps()}</View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 20,
      shadowColor: '#000',
      backgroundColor: theme.colors.background,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3.5,
      elevation: 4,
    },
    header: {
      color: theme.colors.primary,
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontLg,
      marginBottom: 10,
    },
    stepContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stepCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: theme.colors.placeHolder,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeStepCircle: {
      borderColor: theme.colors.primary,
    },
    stepText: {
      fontSize: SIZES.fontLg,
      fontFamily: FONTS_FAMILIES.semiBold,
    },
    activeStepText: {
      color: theme.colors.primary,
    },
    line: {
      height: 2,
      flex: 1,
      backgroundColor: theme.colors.placeHolder,
      marginHorizontal: 10,
    },
  });

export default Stepper;
