/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {Formik} from 'formik';
import {
  requestScheduleInitialForm,
  requestScheduleValidationSchema,
} from '../../service/constants/ValidationSchema';
import {ObjectSchema} from 'yup';
import i18n from '../../../../i18n/i18n.config';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {
  FormDateInput,
  FormClockInput,
  Button,
  FormInputLocation,
  FormInput,
  FormUploadMultipleImages,
} from '../../../../components';
import {
  BookingDetailResponse,
  BookingRequestPayload,
  ServiceStatus,
} from '../../../../@types/booking';
import {errorFormValidation} from '../../../../utils/Validations';
import {useUpdateBookingRequest} from '../../../../api/hooks/useBooking';
import Toast from 'react-native-simple-toast';
import {
  ConfirmationCancelModal,
  CustomerCare,
  ServiceDetail,
  ServiceReview,
  StartAndAfterService,
} from '.';
import {RequestScheduleForm} from '../../../../@types/service';
import {SegmentedServiceType} from '../../../technicians/booking/components';

type FormValues = {
  date: string;
  time: string;
  location: string;
  issue: string;
  service_type: string;
  photos: {image_path: string; image_url: string}[];
};

interface IProps {
  data: BookingDetailResponse;
  refetch: () => void;
}

const BookingInformation: React.FC<IProps> = ({data, refetch}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const {mutate: mutateUpdateBookingRequest, status} =
    useUpdateBookingRequest();
  const isLoadingUpdateBooking = status === 'pending';

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

  useFocusEffect(
    useCallback(() => {
      if (data) {
        setInitialValues({
          date:
            data?.data_body?.service?.detail?.schedule_datetime?.split(
              ' ',
            )[0] ||
            data?.data_body?.service?.booking_datetime?.split(' ')[0] ||
            '',
          time:
            data?.data_body?.service?.detail?.schedule_datetime?.split(
              ' ',
            )[1] ||
            data?.data_body?.service?.booking_datetime?.split(' ')[1] ||
            '00:00:00',
          service_type: data.data_body.service.service_type,
          location:
            data?.data_body?.service?.detail?.location ||
            data?.data_body?.service?.customer?.address_detail ||
            '',
          issue: data?.data_body?.service?.detail?.problem || '',
          photos:
            data?.data_body?.service?.status_photos?.pending?.map(item => ({
              image_path: item.image_path || '',
              image_url: item.image_path_full || '',
            })) || [],
        });
      }
    }, [data]),
  );

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  const onFieldSubmit = (values: FormValues) => {
    const bookingTime = values.time.split(':');
    let payload: BookingRequestPayload = {
      booking_date: values.date,
      booking_time: `${bookingTime[0]}:${bookingTime[1]}:00`,
      location: values.location,
      machine_id: data.data_body.service.machine_id || '',
      service_type: values.service_type,
    };

    if (initialValues.service_type === 'SERVICES') {
      payload.problem = values.issue;
      payload.photos = values.photos.map(item => item.image_path) || [];
    }

    mutateUpdateBookingRequest(
      {
        id: data.data_body.service.id,
        data: {
          booking_date: payload.booking_date,
          booking_time: payload.booking_time,
          location: payload.location,
          problem: payload.problem,
        },
      },
      {
        onSuccess: () => {
          refetch();
          setEditable(false);
          Toast.show(t('toastSuccessUpdate'), Toast.SHORT);
        },
      },
    );
  };

  const serviceReview = () =>
    data.data_body.service.status === ServiceStatus.Finish && (
      <ServiceReview data={data} />
    );

  const serviceDetail = () =>
    data.data_body.service.status === ServiceStatus.WaitingApproval && (
      <ServiceDetail data={data} />
    );

  const startAndAfterService = () => <StartAndAfterService data={data} />;

  const technicianCustomerCare = () =>
    data.data_body.service.technician && (
      <CustomerCare
        user={data.data_body.service.technician}
        containerStyle={{marginBottom: 20}}
        disabled={data.data_body.service.status === ServiceStatus.Finish}
      />
    );

  const adminCustomerCare = () =>
    data.data_body.service.approved_by_user && (
      <CustomerCare
        user={data.data_body.service.approved_by_user}
        containerStyle={{marginBottom: 20}}
        disabled={data.data_body.service.status === ServiceStatus.Finish}
      />
    );

  const onCancelBooking = () => actionSheetRef.current?.show();

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20}}>
        <View style={styles.bookingCodeContainer}>
          <Text style={styles.bookingCodeText}>{`${t(
            'BookingModule.Item.BookingCode',
          )}: #${data.data_body.service.booking_code}`}</Text>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={requestScheduleValidationSchema}
          enableReinitialize={true}
          onSubmit={onFieldSubmit}>
          {({handleSubmit, values, setFieldValue}) => (
            <>
              <View style={styles.infoContainer}>
                <Text style={styles.title}>
                  {t('ServiceModule.RequestSchedule')}
                </Text>
                {/* {data.data_body.service.status === ServiceStatus.Pending && (
                  <Button
                    title={t(editable ? 'Actions.Cancel' : 'Actions.Change')}
                    style={{height: 35}}
                    onPress={() => setEditable(!editable)}
                    textStyle={{fontSize: SIZES.fontXs}}
                    outline
                    {...(editable ? {danger: true} : {})}
                  />
                )} */}
              </View>
              <View style={styles.formRowContainer}>
                <View style={styles.formItemRowRightContainer}>
                  <FormDateInput
                    name="date"
                    label={`*${t(
                      'ServiceModule.RequestScheduleForm.ScheduleFields.Date',
                    )}`}
                    editable={editable && !isLoadingUpdateBooking}
                  />
                </View>
                <View style={styles.formItemRowLeftContainer}>
                  <FormClockInput
                    name="time"
                    label={`*${t(
                      'ServiceModule.RequestScheduleForm.ScheduleFields.Time',
                    )}`}
                    editable={editable && !isLoadingUpdateBooking}
                  />
                </View>
              </View>
              <FormInputLocation
                name="location"
                label={`*${t(
                  'ServiceModule.RequestScheduleForm.ScheduleFields.Location',
                )}`}
                editable={editable && !isLoadingUpdateBooking}
              />
              <SegmentedServiceType
                disabled
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
                  editable={editable && !isLoadingUpdateBooking}
                />
              )}
              {values.service_type === 'SERVICES' && (
                <FormUploadMultipleImages
                  name="photos"
                  label={`*${t(
                    'ServiceModule.RequestScheduleForm.ScheduleFields.Photos',
                  )}`}
                  canAddImage={false}
                />
              )}
              {editable && (
                <Button
                  title={t('Actions.Save')}
                  disabled={isLoadingUpdateBooking}
                  onPress={() => {
                    handleSubmit();
                    errorFormValidation(values, formValidationSchema);
                  }}
                  style={{marginBottom: 20}}
                />
              )}
            </>
          )}
        </Formik>
        {data.data_body.service.status === ServiceStatus.Pending &&
          !editable && (
            <Button
              title={t('BookingModule.BookingDetail.CancelConfirmation.Header')}
              onPress={onCancelBooking}
              outline
              danger
              style={{marginBottom: 20}}
            />
          )}
        {adminCustomerCare()}
        {technicianCustomerCare()}
        {startAndAfterService()}
      </View>
      {serviceDetail()}
      {serviceReview()}
      <ConfirmationCancelModal
        actionSheetRef={actionSheetRef}
        refetch={refetch}
        bookingData={data}
      />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    bookingCodeContainer: {
      backgroundColor: theme.colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: SIZES.radiusSm,
      paddingVertical: 10,
      marginBottom: 20,
    },
    bookingCodeText: {
      color: theme.colors.headerText,
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.h5,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.h5,
      color: theme.colors.headerText,
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
    label: {
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
      color: theme.colors.text,
    },
  });

export default BookingInformation;
