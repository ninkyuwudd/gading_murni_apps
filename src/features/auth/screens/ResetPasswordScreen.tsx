/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useChangePassword} from '../../../api/hooks/useAuth';
import {ObjectSchema} from 'yup';
import {
  ChangePasswordForm,
  ChangePasswordPayloadType,
} from '../../../@types/auth';
import {
  changePasswordInitialForm,
  changePasswordValidationSchema,
} from '../constants/ValidationSchema';
import i18n from '../../../i18n/i18n.config';
import {Formik} from 'formik';
import {Button, FormInput} from '../../../components';
import {errorFormValidation} from '../../../utils/Validations';
import {useTranslation} from 'react-i18next';
import {ResetPasswordScreenProps} from '../../../@types/navigation';
import Toast from 'react-native-simple-toast';

const ResetPassword = () => {
  const styles = createStyles();
  const {t} = useTranslation();
  const {mutate, status} = useChangePassword();
  const isLoading = status === 'pending';
  const navigation = useNavigation<ResetPasswordScreenProps['navigation']>();
  const route = useRoute<ResetPasswordScreenProps['route']>();
  const {account, otp_type} = route.params;
  const isEmail = otp_type === 'Email';

  const [initialValues, setInitialValues] = useState<ChangePasswordForm>(
    changePasswordInitialForm,
  );

  const [formValidationSchema, setFormValidationSchema] = useState<
    ObjectSchema<ChangePasswordForm>
  >(changePasswordValidationSchema(otp_type));

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormValidationSchema(changePasswordValidationSchema(otp_type));

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    setInitialValues({
      ...initialValues,
      account,
    });
  }, []);

  const onFieldSubmit = (values: ChangePasswordForm) => {
    const payload: ChangePasswordPayloadType = {
      account: values.account,
      otp_type: otp_type.toUpperCase(),
      otp: values.otp,
      new_password: values.password,
      confirm_password: values.confirmPassword,
    };
    mutate(payload, {
      onSuccess: () => {
        Toast.show(
          t('AuthModule.ResetPassword.SuccessfullyChanged'),
          Toast.SHORT,
        );
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      },
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        enableReinitialize={true}
        onSubmit={onFieldSubmit}>
        {({handleSubmit, values}) => (
          <View>
            <FormInput
              name="account"
              editable={false}
              label={`*${
                isEmail
                  ? t('AuthModule.ResetPassword.Form.Fields.Email')
                  : t('AuthModule.ResetPassword.Form.Fields.PhoneNumber')
              }`}
              placeholder={
                isEmail
                  ? t('AuthModule.ResetPassword.Form.Fields.EmailPlaceHolder')
                  : t(
                      'AuthModule.ResetPassword.Form.Fields.PhoneNumberPlaceHolder',
                    )
              }
            />
            <FormInput
              name="otp"
              editable={!isLoading}
              label={`*${t('AuthModule.ResetPassword.Form.Fields.Otp')}`}
              placeholder={t(
                'AuthModule.ResetPassword.Form.Fields.OtpPlaceHolder',
              )}
              keyboardType="phone-pad"
            />
            <FormInput
              name="password"
              label={`*${t('AuthModule.ResetPassword.Form.Fields.Password')}`}
              placeholder={t(
                'AuthModule.ResetPassword.Form.Fields.PasswordPlaceHolder',
              )}
              secureTextEntry={true}
              editable={!isLoading}
            />
            <FormInput
              name="confirmPassword"
              label={`*${t(
                'AuthModule.ResetPassword.Form.Fields.ConfirmPassword',
              )}`}
              placeholder={t(
                'AuthModule.ResetPassword.Form.Fields.ConfirmPasswordPlaceHolder',
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
    </ScrollView>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
    },
  });

export default ResetPassword;
