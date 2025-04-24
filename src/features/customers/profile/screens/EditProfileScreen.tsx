/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {ObjectSchema} from 'yup';
import {FormInput, Button} from '../../../../components';
import {Formik} from 'formik';
import i18n from '../../../../i18n/i18n.config';
import {editProfileValidationSchema} from '../constans/ValidationSchema';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {SvgXml} from 'react-native-svg';
import {FONTS_FAMILIES, ICONS, SIZES} from '../../../../constants/theme';
import {EditProfileNavigationProp} from '../../../../@types/navigation';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  useCustomer,
  useCustomerProfile,
} from '../../../../api/hooks/useCustomer';
import {CustomerProfilePayload} from '../../../../@types/customer';
import Toast from 'react-native-simple-toast';
import {errorFormValidation} from '../../../../utils/Validations';

type FormValues = {
  fullName: string;
  companyName?: string;
  email: string;
  phoneNumber: string;
};

const EditProfile: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const navigation = useNavigation<EditProfileNavigationProp>();
  const {data, isLoading, refetch} = useCustomer();
  const {mutate, status} = useCustomerProfile();
  const updateLoading = status === 'pending';
  const defaultValues: FormValues = {
    fullName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
  };
  const [initialValues, setInitialValues] = useState<FormValues>(defaultValues);
  const [formValidationSchema, setFormValidationSchema] = useState<
    ObjectSchema<FormValues>
  >(editProfileValidationSchema());

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormValidationSchema(editProfileValidationSchema);

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!isLoading && data) {
        setInitialValues({
          fullName: data?.data_body?.user?.profile?.full_name || '',
          email: data?.data_body?.user?.email || '',
          phoneNumber: data?.data_body?.user?.mobile_number || '',
          companyName: data?.data_body?.user?.customer?.company_name || '',
        });
      }
    }, [isLoading, data]),
  );

  const locationHandle = () => {
    navigation.navigate('Location');
  };

  const onFieldSubmit = (values: FormValues) => {
    const payload: CustomerProfilePayload = {
      company_name: values.companyName || '',
      email: values.email || '',
      full_name: values.fullName || '',
      mobile_number: values.phoneNumber || '',
    };
    mutate(payload, {
      onSuccess: () => {
        refetch();
        Toast.show(t('toastSuccessUpdate'), Toast.SHORT);
      },
    });
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
              name="fullName"
              label={`*${t('registerFieldFields.fullName')}`}
              placeholder={t('registerFieldFields.fullNamePlaceHolder')}
              editable={!isLoading || !updateLoading}
            />
            <FormInput
              name="companyName"
              label={t('registerFieldFields.companyName')}
              placeholder={t('registerFieldFields.companyNamePlaceHolder')}
              editable={!isLoading || !updateLoading}
            />
            <FormInput
              name="email"
              label={`*${t('registerFieldFields.email')}`}
              placeholder={t('registerFieldFields.emailPlaceHolder')}
              editable={false}
            />
            <FormInput
              name="phoneNumber"
              label={`*${t('registerFieldFields.phoneNumber')}`}
              placeholder={t('registerFieldFields.phoneNumberPlaceHolder')}
              editable={!isLoading || !updateLoading}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={locationHandle}
              style={[
                styles.itemContainer,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.primary,
                },
              ]}>
              <SvgXml
                xml={ICONS.icnLocation(theme.colors.primary)}
                width={24}
                height={24}
              />
              <Text
                style={[
                  styles.itemTitle,
                  {
                    color: theme.colors.headerText,
                    fontFamily: FONTS_FAMILIES.medium,
                    fontSize: SIZES.font,
                  },
                ]}>
                {t('headerDataCompletenessLabel')}
              </Text>
              <SvgXml
                xml={ICONS.icnArrowNarrowRight(theme.colors.headerText)}
                width={24}
                height={24}
              />
            </TouchableOpacity>
            <Button
              title={t('saveLabel')}
              onPress={() => {
                handleSubmit();
                errorFormValidation(values, formValidationSchema);
              }}
              style={{marginTop: 10}}
              disabled={isLoading || updateLoading}
              loading={isLoading || updateLoading}
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default EditProfile;
