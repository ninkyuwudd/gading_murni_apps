import {ImageSourcePropType} from 'react-native';
import {IMAGES} from '../../../constants/theme';
import i18n from '../../../i18n/i18n.config';

export type OnboardingDataType = {
  title: string;
  description: string;
  image: ImageSourcePropType;
};

export const getOnboardingData = (): OnboardingDataType[] => [
  {
    title: i18n.t('onboardingSlideTitle1'),
    description: i18n.t('onboardingSlideDescription1'),
    image: IMAGES.onboardingSlide1,
  },
  {
    title: i18n.t('onboardingSlideTitle2'),
    description: i18n.t('onboardingSlideDescription2'),
    image: IMAGES.onboardingSlide2,
  },
  {
    title: i18n.t('onboardingSlideTitle3'),
    description: i18n.t('onboardingSlideDescription3'),
    image: IMAGES.onboardingSlide3,
  },
];
