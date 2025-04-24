/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {ObjectSchema} from 'yup';
import {FormInput, Button} from '../../../../components';
import {Formik} from 'formik';
import i18n from '../../../../i18n/i18n.config';
import {editProfileValidationSchema} from './constans/ValidationSchema';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {errorFormValidation} from '../../../../utils/Validations';
import {
  useAdminProfile,
  useAdminProfileDetail,
} from '../../../../api/hooks/useAdminServices';
import {AdminProfilePayload} from '../../../../@types/adminUser';

type FormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
};

const EditProfile: React.FC = () => {
  const {t} = useTranslation();
  const {data, isLoading, refetch} = useAdminProfileDetail();
  const {mutate, status} = useAdminProfile();
  const updateLoading = status === 'pending';
  const defaultValues: FormValues = {
    fullName: '',
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
          fullName: data?.data_body?.user?.name || '',
          email: data?.data_body?.user?.email || '',
          phoneNumber: data?.data_body?.user?.mobile_number || '',
        });
      }
    }, [isLoading, data]),
  );

  const onFieldSubmit = (values: FormValues) => {
    const payload: AdminProfilePayload = {
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
