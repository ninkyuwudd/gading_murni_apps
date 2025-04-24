/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Theme} from '../../../../@types/theme';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {SubmitServiceScheduleScreenProps} from '../../../../@types/navigation';
import {InfoCard as InfoCardMachine} from '../../machine/components';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {Formik} from 'formik';
import i18n from '../../../../i18n/i18n.config';
import {ObjectSchema} from 'yup';
import {
  requestScheduleInitialForm,
  requestScheduleValidationSchema,
} from '../constants/ValidationSchema';
import {RequestScheduleForm} from '../../../../@types/service';
import {
  Button,
  FormClockInput,
  FormDateInput,
  FormInput,
  FormInputLocation,
  FormUploadMultipleImages,
} from '../../../../components';
import {errorFormValidation} from '../../../../utils/Validations';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {ConfirmationModal} from '../components';
import {useBookingRequest} from '../../../../api/hooks/useBooking';
import {
  BookingRequestPayload,
  BookingRequestResponse,
} from '../../../../@types/booking';
import {SegmentedServiceType} from '../../../technicians/booking/components';

const SubmitServiceSchedule: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const navigation =
    useNavigation<SubmitServiceScheduleScreenProps['navigation']>();
  const route = useRoute<SubmitServiceScheduleScreenProps['route']>();
  const styles = createStyles(theme);
  const {machineId} = route.params;
  const {mutate, status} = useBookingRequest();
  const isLoading = status === 'pending';

  const [initialValues, setInitialValues] = useState<RequestScheduleForm>(
    requestScheduleInitialForm,
  );

  const [formValidationSchema, setFormValidationSchema] = useState<
    ObjectSchema<RequestScheduleForm>
  >(requestScheduleValidationSchema());

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormValidationSchema(requestScheduleValidationSchema);

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const onFieldSubmit = (values: RequestScheduleForm) => {
    setInitialValues(values);
    actionSheetRef.current?.show();
  };

  const handleConfirmation = () => {
    const bookingTime = initialValues.time.split(':');
    let payloan: BookingRequestPayload = {
      booking_date: initialValues.date,
      booking_time: `${bookingTime[0]}:${bookingTime[1]}:00`,
      location: initialValues.location,
      machine_id: machineId,
      service_type: initialValues.service_type,
    };

    if (initialValues.service_type === 'SERVICES') {
      payloan.problem = initialValues.issue;
      payloan.photos = initialValues.photos!.map(item => item.image_path);
    }

    mutate(payloan, {
      onSuccess: dataBookingRequestSuccess => {
        const response =
          dataBookingRequestSuccess as unknown as BookingRequestResponse;
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'ServiceRequestCreated',
              params: {
                bookingId: response.data_body.service.id,
              },
            },
          ],
        });
      },
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.screenContiner}>
      <InfoCardMachine machineId={machineId} />
      <Text style={styles.textTitle}>{t('ServiceModule.RequestSchedule')}</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={requestScheduleValidationSchema}
        enableReinitialize={true}
        onSubmit={onFieldSubmit}>
        {({handleSubmit, values, setFieldValue}) => (
          <>
            <View style={styles.formRowContainer}>
              <View style={styles.formItemRowRightContainer}>
                <FormDateInput
                  name="date"
                  label={`*${t(
                    'ServiceModule.RequestScheduleForm.ScheduleFields.Date',
                  )}`}
                />
              </View>
              <View style={styles.formItemRowLeftContainer}>
                <FormClockInput
                  name="time"
                  label={`*${t(
                    'ServiceModule.RequestScheduleForm.ScheduleFields.Time',
                  )}`}
                />
              </View>
            </View>
            <FormInputLocation
              name="location"
              label={`*${t(
                'ServiceModule.RequestScheduleForm.ScheduleFields.Location',
              )}`}
            />
            <SegmentedServiceType
              selectedValue={values.service_type}
              onChange={value => setFieldValue('service_type', value, false)}
            />
            {values.service_type === 'SERVICES' && (
              <FormInput
                name="issue"
                label={`*${t(
                  'ServiceModule.RequestScheduleForm.ScheduleFields.Issue',
                )}`}
                placeholder={t(
                  'ServiceModule.RequestScheduleForm.ScheduleFields.IssuePlaceHolder',
                )}
                multiline
              />
            )}
            {values.service_type === 'SERVICES' && (
              <FormUploadMultipleImages
                name="photos"
                label={`*${t(
                  'ServiceModule.RequestScheduleForm.ScheduleFields.Photos',
                )}`}
              />
            )}
            <Button
              title={t('Actions.Save')}
              onPress={() => {
                handleSubmit();
                errorFormValidation(values, formValidationSchema);
              }}
              style={{marginTop: 40}}
            />
          </>
        )}
      </Formik>
      <ConfirmationModal
        actionSheetRef={actionSheetRef}
        onConfirm={() => handleConfirmation()}
        loading={isLoading}
      />
    </ScrollView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screenContiner: {
      flexGrow: 1,
      padding: 20,
    },
    textTitle: {
      fontFamily: FONTS_FAMILIES.semiBold,
      color: theme.colors.headerText,
      fontSize: SIZES.h5,
      marginVertical: 20,
    },
    formRowContainer: {
      flexDirection: 'row',
    },
    formItemRowLeftContainer: {
      flex: 0.5,
      marginLeft: 10,
    },
    formItemRowRightContainer: {
      flex: 0.5,
      marginRight: 10,
    },
  });

export default SubmitServiceSchedule;
