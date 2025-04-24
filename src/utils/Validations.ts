import {AnyObjectSchema} from 'yup';
import Toast from 'react-native-simple-toast';
import i18n from '../i18n/i18n.config';

export const errorFormValidation = async <T>(
  values: T,
  validationSchema: AnyObjectSchema,
): Promise<void> => {
  try {
    await validationSchema.validate(values);
  } catch (_) {
    Toast.show(i18n.t('errorMessageForm'), Toast.SHORT);
  }
};
