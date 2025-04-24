import React, {useRef, useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import i18n from '../../../i18n/i18n.config';
import {
  getOnboardingData,
  OnboardingDataType,
} from '../constants/OnboardingData';
import {COLORS, FONTS_FAMILIES, SIZES} from '../../../constants/theme';
import {GlobalStyleSheet} from '../../../constants/StyleSheet';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {OnboardingSlides} from '../components';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store';
import {setOnboarded} from '../../../store/userSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigationRef} from '../../../navigations/navigationService';

const Onboarding: React.FC = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const dispatch = useDispatch<AppDispatch>();

  const [onboardingData, setOnboardingData] = useState<OnboardingDataType[]>(
    getOnboardingData(),
  );

  useEffect(() => {
    const handleLanguageChange = () => {
      setOnboardingData(getOnboardingData());
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const handleSlide = (skip: boolean) => {
    const nextSlideIndex: number =
      Math.ceil((scrollX as any)._value / SIZES.width) + 1;
    if (skip || nextSlideIndex === onboardingData.length) {
      dispatch(setOnboarded(true));
      navigationRef.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
    } else {
      const newX = nextSlideIndex * SIZES.width;
      scrollViewRef.current?.scrollTo({
        x: newX,
        animated: true,
      });
    }
  };

  return (
    <View style={[GlobalStyleSheet.centerContainer, {paddingTop: insets.top}]}>
      <TouchableOpacity
        onPress={() => handleSlide(true)}
        style={styles.skipBtn}>
        <Text style={[styles.skipLabel, {color: theme.colors.text}]}>
          {t('skipLabel')}
        </Text>
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}>
        <OnboardingSlides
          onboardingData={onboardingData}
          nextAction={() => handleSlide(false)}
        />
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <View key={index} style={styles.dot} />
        ))}
        <Animated.View
          style={[
            styles.activeDot,
            {
              transform: [
                {
                  translateX: Animated.divide(scrollX, SIZES.width).interpolate(
                    {
                      inputRange: [0, 1],
                      outputRange: [-25, 0],
                    },
                  ),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skipLabel: {
    fontSize: SIZES.fontLg,
    color: COLORS.text,
    fontFamily: FONTS_FAMILIES.semiBold,
  },
  skipBtn: {
    zIndex: 1,
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
  indicatorContainer: {
    position: 'absolute',
    top: SIZES.height / 2 - (Platform.OS === 'ios' ? 40 : 20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    marginHorizontal: 5,
  },
  activeDot: {
    position: 'absolute',
    height: 10,
    width: 20,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
});

export default Onboarding;
