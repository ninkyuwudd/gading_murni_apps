/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import {ObjectSchema} from 'yup';
import i18n from '../../../../i18n/i18n.config';
import {
  customerDataDefaultValue,
  customerDataValidationSchema,
} from '../constants/ValidationSchema';
import {
  CustomerDataFormValues,
  UpdateBookingRequestPayload,
} from '../../../../@types/service';
import {
  useAdminServicesDefaultValuesCustomerData,
  useAcceptAdminServicesDetail,
} from '../../../../api/hooks/useAdminServices';
import {TechnicianEditCustomerDataScreenProps} from '../../../../@types/navigation';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Theme} from '../../../../@types/theme';
import {useTheme} from '@react-navigation/native';
import {
  Button,
  FormBranchesSelector,
  FormClockInput,
  FormDateInput,
  FormDistrictsSelector,
  FormInput,
  FormProvincesSelector,
  FormRegenciesSelector,
  FormVillagesSelector,
  FormMasterMachinesSelector,
} from '../../../../components';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {errorFormValidation} from '../../../../utils/Validations';
import Toast from 'react-native-simple-toast';

const EditCustomerData: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const navigation =
    useNavigation<TechnicianEditCustomerDataScreenProps['navigation']>();
  const route = useRoute<TechnicianEditCustomerDataScreenProps['route']>();
  const {bookingId, disableEdit} = route.params;
  const {data, isLoading, refetch} = useAdminServicesDefaultValuesCustomerData(
    bookingId!,
  );
  const {mutate, status} = useAcceptAdminServicesDetail();
  const loadingUpdate = status === 'pending';

  const [initialValues, setInitialValues] = useState<CustomerDataFormValues>(
    customerDataDefaultValue,
  );

  const [formValidationSchema, setFormValidationSchema] = useState<
    ObjectSchema<CustomerDataFormValues>
  >(customerDataValidationSchema());

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormValidationSchema(customerDataValidationSchema);

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const onFieldSubmit = (values: CustomerDataFormValues) => {
    const payload: UpdateBookingRequestPayload = {
      schedule_datetime: `${values.serviceSchedule} ${values.serviceTimeSchedule}:00`,
      customer: {
        name: values.fullName,
        email: values.email,
        mobile_number: values.phoneNumber,
        address_detail: values.location,
        address_province_id: values.province.code,
        address_city_id: values.regency.code,
        address_district_id: values.district.code,
        address_village_id: values.village.code,
        address_village: values.village.village,
        address_district: values.district.district,
        address_city: values.regency.regency,
        address_province: values.province.province,
        address_postal_code: values.postalCode,
        company_name: values.companyName,
      },
      machine: {
        machine_id: values.machine_id,
        master_machine_id: values.master_machine.id,
        serial_number: values.serialNumber,
        purchased_date: values.purchaseDate,
      },
    };

    mutate(
      {
        id: bookingId,
        data: payload,
        updateOnly: disableEdit,
      },
      {
        onSuccess: () => {
          Toast.show(t('toastAcceptBooking'), Toast.SHORT);
          navigation.goBack();
        },
      },
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (!isLoading && data) {
        setInitialValues(data);
      }
    }, [isLoading, data]),
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.screenContainer,
        isLoading && styles.centerContent,
      ]}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          colors={[theme.colors.primary]}
        />
      }>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={formValidationSchema}
            enableReinitialize={true}
            onSubmit={onFieldSubmit}>
            {({handleSubmit, values, setFieldValue}) => (
              <>
                <View style={{padding: 20}}>
                  <Text style={styles.header}>
                    {t('detailCustomerDataLabel')}
                  </Text>
                  <FormInput
                    name="bookingNumber"
                    editable={false}
                    label={`*${t('itemBoookingCodeLabel')}`}
                  />
                  <FormInput
                    name="fullName"
                    editable={!isLoading && !loadingUpdate && !disableEdit}
                    label={`*${t('registerFieldFields.fullName')}`}
                    placeholder={t('registerFieldFields.fullNamePlaceHolder')}
                  />
                  <FormInput
                    name="companyName"
                    editable={!isLoading && !loadingUpdate && !disableEdit}
                    label={t('registerFieldFields.companyName')}
                    placeholder={t(
                      'registerFieldFields.companyNamePlaceHolder',
                    )}
                  />
                  <FormInput
                    name="email"
                    editable={false}
                    label={`*${t('registerFieldFields.email')}`}
                    placeholder={t('registerFieldFields.emailPlaceHolder')}
                  />
                  <FormInput
                    name="phoneNumber"
                    editable={!isLoading && !loadingUpdate && !disableEdit}
                    label={`*${t('registerFieldFields.phoneNumber')}`}
                    placeholder={t(
                      'registerFieldFields.phoneNumberPlaceHolder',
                    )}
                  />
                  <FormBranchesSelector
                    name="nearestBranch"
                    label={`*${t('dataCompletenessFieldFields.nearestBranch')}`}
                    editable={
                      Boolean(values.regency.code.length) &&
                      !isLoading &&
                      !loadingUpdate &&
                      !disableEdit
                    }
                    cityId={values.regency.code}
                  />
                  <View style={styles.formRowContainer}>
                    <View style={styles.formItemRowRightContainer}>
                      <FormProvincesSelector
                        name="province"
                        label={`*${t('dataCompletenessFieldFields.province')}`}
                        editable={!isLoading && !loadingUpdate && !disableEdit}
                        onProvinceChange={() => {
                          setFieldValue(
                            'regency',
                            customerDataDefaultValue.regency,
                          );
                          setFieldValue(
                            'district',
                            customerDataDefaultValue.district,
                          );
                          setFieldValue(
                            'village',
                            customerDataDefaultValue.village,
                          );
                          setFieldValue(
                            'postalCode',
                            customerDataDefaultValue.postalCode,
                          );
                          setFieldValue(
                            'nearestBranch',
                            initialValues.nearestBranch,
                          );
                        }}
                      />
                    </View>
                    <View style={styles.formItemRowLeftContainer}>
                      <FormRegenciesSelector
                        name="regency"
                        provinceCode={values.province.code}
                        editable={
                          Boolean(values.province.code.length) &&
                          !isLoading &&
                          !loadingUpdate &&
                          !disableEdit
                        }
                        label={`*${t('dataCompletenessFieldFields.regency')}`}
                        onRegencyChange={() => {
                          setFieldValue(
                            'district',
                            customerDataDefaultValue.district,
                          );
                          setFieldValue(
                            'village',
                            customerDataDefaultValue.village,
                          );
                          setFieldValue(
                            'postalCode',
                            customerDataDefaultValue.postalCode,
                          );
                          setFieldValue(
                            'nearestBranch',
                            initialValues.nearestBranch,
                          );
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.formRowContainer}>
                    <View style={styles.formItemRowRightContainer}>
                      <FormDistrictsSelector
                        name="district"
                        label={`*${t('dataCompletenessFieldFields.district')}`}
                        regencyCode={values.regency.code}
                        editable={!isLoading && !loadingUpdate && !disableEdit}
                        onDistrictChange={() => {
                          setFieldValue(
                            'village',
                            customerDataDefaultValue.village,
                          );
                          setFieldValue(
                            'postalCode',
                            customerDataDefaultValue.postalCode,
                          );
                        }}
                      />
                    </View>
                    <View style={styles.formItemRowLeftContainer}>
                      <FormVillagesSelector
                        name="village"
                        label={`*${t('dataCompletenessFieldFields.village')}`}
                        districtCode={values.district.code}
                        editable={
                          Boolean(values.district.code.length) &&
                          !isLoading &&
                          !loadingUpdate &&
                          !disableEdit
                        }
                        onVillageChange={item =>
                          setFieldValue('postalCode', item.postalCode)
                        }
                      />
                    </View>
                  </View>
                  <FormInput
                    name="postalCode"
                    label={`*${t('dataCompletenessFieldFields.postalCode')}`}
                    placeholder={t(
                      'dataCompletenessFieldFields.postalCodePlaceHolder',
                    )}
                    editable={false}
                  />
                  <FormInput
                    name="location"
                    label={`*${t('serviceScheduleFields.location')}`}
                    placeholder={t(
                      'dataCompletenessFieldFields.fullAddressPlaceHolder',
                    )}
                    multiline
                    editable={!isLoading && !loadingUpdate && !disableEdit}
                  />
                </View>
                <View style={styles.divider} />
                <View style={{padding: 20}}>
                  <Text style={styles.header}>
                    {t('detailMachineDataLabel')}
                  </Text>
                  <FormMasterMachinesSelector
                    name="master_machine"
                    label={`*${t('addMachineFieldFields.name')}`}
                    editable={!isLoading && !loadingUpdate && !disableEdit}
                  />
                  <FormInput
                    name="serialNumber"
                    editable={!isLoading && !loadingUpdate && !disableEdit}
                    label={t('dataMachineFieldFields.serialNumber')}
                    placeholder={t(
                      'dataMachineFieldFields.serialNumberPlaceHolder',
                    )}
                  />
                  <FormDateInput
                    name="purchaseDate"
                    label={`*${t('dataMachineFieldFields.purchaseDate')}`}
                    editable={!isLoading && !loadingUpdate && !disableEdit}
                  />
                  <View style={styles.formRowContainer}>
                    <View style={styles.formItemRowRightContainer}>
                      <FormDateInput
                        name="bookingDate"
                        label={`*${t('dataMachineFieldFields.bookingDate')}`}
                        editable={false}
                      />
                    </View>
                    <View style={styles.formItemRowLeftContainer}>
                      <FormClockInput
                        name="bookingTime"
                        label={`*${t('dataMachineFieldFields.bookingTime')}`}
                        editable={false}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={{padding: 20}}>
                  <Text style={styles.header}>{t('serviceScheduleLabel')}</Text>
                  <View style={styles.formRowContainer}>
                    <View style={styles.formItemRowRightContainer}>
                      <FormDateInput
                        name="serviceSchedule"
                        label={`*${t('dataMachineFieldFields.serviceDate')}`}
                        editable={!isLoading || !loadingUpdate}
                      />
                    </View>
                    <View style={styles.formItemRowLeftContainer}>
                      <FormClockInput
                        name="serviceTimeSchedule"
                        label={`*${t(
                          'dataMachineFieldFields.serviceTimeSchedule',
                        )}`}
                        editable={!isLoading || !loadingUpdate}
                      />
                    </View>
                  </View>
                  <Button
                    title={t('saveLabel')}
                    onPress={() => {
                      handleSubmit();
                      errorFormValidation(values, formValidationSchema);
                    }}
                    style={{marginTop: 10}}
                    disabled={isLoading || loadingUpdate}
                    loading={isLoading || loadingUpdate}
                  />
                </View>
              </>
            )}
          </Formik>
        </>
      )}
    </ScrollView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screenContainer: {
      flexGrow: 1,
    },
    centerContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.fontLg,
      color: theme.colors.headerText,
      marginBottom: 20,
    },
    formContainer: {
      flexGrow: 1,
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    formRowContainer: {flexDirection: 'row'},
    formItemRowLeftContainer: {flex: 0.5, marginLeft: 10},
    formItemRowRightContainer: {flex: 0.5, marginRight: 10},
    divider: {
      height: 10,
      width: SIZES.width,
      backgroundColor: theme.colors.border,
    },
  });

export default EditCustomerData;
