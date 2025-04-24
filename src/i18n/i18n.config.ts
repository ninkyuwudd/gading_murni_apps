import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import {id, en} from './translations';

interface Resources {
  [key: string]: {
    translation: {
      [key: string]: string;
    };
  };
}

const resources: Resources = {
  id: {translation: id},
  en: {translation: en},
};

i18next.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v3',
  lng: getLocales()[0].languageCode || 'id',
  fallbackLng: 'id',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
