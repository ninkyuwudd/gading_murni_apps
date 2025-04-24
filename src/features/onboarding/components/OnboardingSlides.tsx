/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  IMAGES,
  ICONS,
  COLORS,
  SIZES,
  FONTS_FAMILIES,
} from '../../../constants/theme';
import {SvgXml} from 'react-native-svg';
import {OnboardingDataType} from '../constants/OnboardingData';
interface IProps {
  onboardingData: OnboardingDataType[];
  nextAction: () => void;
}

const OnboardingSlides: React.FC<IProps> = ({
  onboardingData,
  nextAction,
}: IProps) => {
  return (
    <>
      {onboardingData.map((item, index) => (
        <View style={styles.slide} key={index}>
          <Image source={item.image} style={styles.image} />
          <ImageBackground
            source={IMAGES.onboardingBackgroundContent}
            resizeMode="contain"
            style={styles.onboardingBackgroundContent}>
            <View style={styles.contentContainer}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <TouchableOpacity
                onPress={nextAction}
                activeOpacity={0.8}
                style={styles.nextBtn}>
                <View style={{justifyContent: 'flex-end'}}>
                  <SvgXml xml={ICONS.icnArrowLeft} width={24} height={24} />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: SIZES.width,
    margin: 0,
    padding: 0,
    alignItems: 'center',
    paddingTop: 20,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  onboardingBackgroundContent: {
    marginTop: 25,
    alignItems: 'center',
    width: '100%',
    height: 300,
  },
  contentContainer: {
    width: 300,
    marginTop: 40,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: SIZES.h3,
    color: COLORS.title,
    fontFamily: FONTS_FAMILIES.bold,
  },
  description: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: SIZES.fontLg,
    color: COLORS.text,
    fontFamily: FONTS_FAMILIES.regular,
  },
  nextBtn: {
    backgroundColor: COLORS.primary,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60 / 2,
    marginTop: 60,
    zIndex: 1,
    alignSelf: 'center',
  },
});

export default OnboardingSlides;
