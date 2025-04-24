/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import {FONTS_FAMILIES, IMAGES, SIZES} from '../../../constants/theme';
import {useTranslation} from 'react-i18next';
import {useNavigation, useTheme, useRoute} from '@react-navigation/native';
import {Theme} from '../../../@types/theme';
import {FormInput, Button} from '../../../components';
import {Formik} from 'formik';
import {forgetValidationSchema} from '../constants/ValidationSchema';
import i18n from '../../../i18n/i18n.config';
import {ObjectSchema} from 'yup';
import {
  ForgetPasswordNavigationProp,
  ForgetPasswordScreenProps,
} from '../../../@types/navigation';
import {useResetPassowrd} from '../../../api/hooks/useAuth';

type FormValues = {
  account: string;
};

const ForgetPassword: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const navigation = useNavigation<ForgetPasswordNavigationProp>();
  const route = useRoute<ForgetPasswordScreenProps['route']>();
  const {otpType} = route.params;
  const {mutate, status} = useResetPassowrd();
  const isEmail = otpType === 'Email';
  const isLoading = status === 'pending';
  const initialValues: FormValues = {
    account: '',
  };
  const [formForgetValidationSchema, setFormForgetValidationSchema] = useState<
    ObjectSchema<FormValues>
  >(forgetValidationSchema(otpType));

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormForgetValidationSchema(forgetValidationSchema(otpType));

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const onFieldSubmit = (values: FormValues) => {
    mutate(
      {
        account: values.account,
        otp_type: otpType.toUpperCase(),
      },
      {
        onSuccess: () => {
          navigation.navigate('ResetPassword', {
            account: values.account,
            otp_type: otpType,
          });
        },
      },
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Image
          source={IMAGES.forgetPassword}
          resizeMode="contain"
          style={{
            width: 164,
            height: 164,
          }}
        />
        <Text style={[styles.title, {color: theme.colors.headerText}]}>
          {t('headerForgetPasswordLabel')}
        </Text>
        <Text style={[styles.description, {color: theme.colors.text}]}>
          {isEmail
            ? t('descriptionForgetPasswordByEmail')
            : t('descriptionForgetPasswordByWhatsapp')}
        </Text>
        <View style={styles.centerCard}>
          <Formik
            initialValues={initialValues}
            validationSchema={formForgetValidationSchema}
            onSubmit={onFieldSubmit}>
            {({handleSubmit}) => (
              <View>
                <FormInput
                  name="account"
                  label={
                    isEmail
                      ? t('forgetFieldFields.email')
                      : t('forgetFieldFields.phoneNumber')
                  }
                  placeholder={
                    isEmail
                      ? t('forgetFieldFields.emailPlaceHolder')
                      : t('forgetFieldFields.phoneNumberPlaceHolder')
                  }
                  keyboardType={isEmail ? 'email-address' : 'number-pad'}
                  editable={!isLoading}
                />
                <Button
                  title={t('sendLabel')}
                  onPress={() => handleSubmit()}
                  style={{marginTop: 20}}
                  disabled={isLoading}
                  loading={isLoading}
                />
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: FONTS_FAMILIES.bold,
    fontSize: SIZES.h4,
    marginVertical: 20,
  },
  description: {
    fontFamily: FONTS_FAMILIES.regular,
    fontSize: SIZES.font,
    textAlign: 'center',
  },
  centerCard: {
    width: '100%',
    marginVertical: 20,
  },
});

export default ForgetPassword;
