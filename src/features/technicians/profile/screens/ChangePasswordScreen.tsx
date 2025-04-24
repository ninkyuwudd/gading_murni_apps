/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ObjectSchema} from 'yup';
import {FormInput, Button} from '../../../../components';
import {Formik} from 'formik';
import i18n from '../../../../i18n/i18n.config';
import {changePasswordValidationSchema} from './constans/ValidationSchema';
import {useTranslation} from 'react-i18next';
import {errorFormValidation} from '../../../../utils/Validations';
import Toast from 'react-native-simple-toast';
import {ChangePasswordNavigationProp} from '../../../../@types/navigation';
import {useNavigation} from '@react-navigation/native';
import {useAdminUpdatePassword} from '../../../../api/hooks/useAdminServices';

type FormValues = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

const ChangePassword: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<ChangePasswordNavigationProp>();
  const {mutate, status} = useAdminUpdatePassword();
  const isLoading = status === 'pending';
  const initialValues: FormValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };
  const [formValidationSchema, setFormValidationSchema] = useState<
    ObjectSchema<FormValues>
  >(changePasswordValidationSchema());

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormValidationSchema(changePasswordValidationSchema);

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const onFieldSubmit = (values: FormValues) => {
    mutate(
      {
        confirm_password: values.confirmPassword,
        new_password: values.password,
        old_password: values.oldPassword,
      },
      {
        onSuccess: () => {
          Toast.show(t('toastSuccessUpdate'), Toast.SHORT);
          navigation.goBack();
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        enableReinitialize={true}
        onSubmit={onFieldSubmit}>
        {({handleSubmit, values}) => (
          <View>
            <FormInput
              name="oldPassword"
              label={`*${t('changePasswordFieldFields.oldPassword')}`}
              placeholder={t(
                'changePasswordFieldFields.oldPasswordPlaceHolder',
              )}
              secureTextEntry={true}
              editable={!isLoading}
            />
            <FormInput
              name="password"
              label={`*${t('changePasswordFieldFields.password')}`}
              placeholder={t('changePasswordFieldFields.passwordPlaceHolder')}
              secureTextEntry={true}
              editable={!isLoading}
            />
            <FormInput
              name="confirmPassword"
              label={`*${t('changePasswordFieldFields.confirmPassword')}`}
              placeholder={t(
                'changePasswordFieldFields.confirmPasswordPlaceHolder',
              )}
              secureTextEntry={true}
              editable={!isLoading}
            />
            <Button
              title={t('saveLabel')}
              onPress={() => {
                handleSubmit();
                errorFormValidation(values, formValidationSchema);
              }}
              style={{marginTop: 10}}
              disabled={isLoading}
              loading={isLoading}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ChangePassword;
