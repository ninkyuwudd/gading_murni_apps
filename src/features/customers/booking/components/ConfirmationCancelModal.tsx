/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FONTS_FAMILIES, IMAGES, SIZES} from '../../../../constants/theme';
import {Theme} from '../../../../@types/theme';
import {useTheme} from '@react-navigation/native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {BookingDetailResponse} from '../../../../@types/booking';
import {cancelBookingValidationSchema} from '../constants/ValidationSchema';
import {ObjectSchema} from 'yup';
import i18n from '../../../../i18n/i18n.config';
import {Formik} from 'formik';
import {errorFormValidation} from '../../../../utils/Validations';
import {Button, FormInput} from '../../../../components';
import {useCancelBookingRequest} from '../../../../api/hooks/useBooking';

type FormValues = {
  reasons: string;
};

interface IProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  refetch: () => void;
  bookingData: BookingDetailResponse;
}

const ConfirmationCancelModal: React.FC<IProps> = ({
  actionSheetRef,
  refetch,
  bookingData,
}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const [step, setStep] = useState<'initial' | 'form' | 'confirmed'>('initial');
  const slideAnim = useRef(new Animated.Value(0)).current;
  const {mutate, status} = useCancelBookingRequest();
  const isLoading = status === 'pending';

  const initialValues: FormValues = {
    reasons: '',
  };

  const [formValidationSchema, setFormValidationSchema] = useState<
    ObjectSchema<FormValues>
  >(cancelBookingValidationSchema());

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormValidationSchema(cancelBookingValidationSchema);

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const onFieldSubmit = (values: FormValues) => {
    mutate(
      {
        id: bookingData.data_body.service.id,
        data: {
          reason: values.reasons,
        },
      },
      {
        onSuccess: () => {
          handleChangeStep('confirmed');
        },
      },
    );
  };

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: SIZES.width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleChangeStep = (
    newStep: 'initial' | 'form' | 'confirmed',
  ): void => {
    slideDown();
    setTimeout(() => {
      setStep(newStep);
      slideUp();
    }, 300);
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      onBeforeShow={() => handleChangeStep('initial')}
      closable={!isLoading}
      containerStyle={{
        backgroundColor: theme.colors.background,
        ...styles.actionContainer,
      }}>
      <View style={styles.devider} />
      <Animated.View
        style={{
          transform: [{translateY: step === 'initial' ? 0 : slideAnim}],
        }}>
        {step === 'initial' && (
          <View>
            <Text style={styles.title}>{`${t(
              'BookingModule.BookingDetail.CancelConfirmation.Header',
            )}?`}</Text>
            <Text style={styles.confirmationDesc}>
              {t('BookingModule.BookingDetail.CancelConfirmation.Question')}{' '}
              <Text style={{fontFamily: FONTS_FAMILIES.semiBold}}>
                {bookingData.data_body.service.booking_code}
              </Text>
            </Text>
            <Button
              title={t(
                'BookingModule.BookingDetail.CancelConfirmation.Continue',
              )}
              onPress={() => handleChangeStep('form')}
              outline
              danger
              style={{marginTop: 40}}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => actionSheetRef.current?.hide()}
              style={styles.btnCancel}>
              <Text style={styles.btnCancelLabel}>
                {t('BookingModule.BookingDetail.CancelConfirmation.Back')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {step === 'form' && (
          <View>
            <Text style={styles.title}>{`${t(
              'BookingModule.BookingDetail.CancelConfirmation.Header',
            )}?`}</Text>
            <Formik
              initialValues={initialValues}
              validationSchema={formValidationSchema}
              enableReinitialize={true}
              onSubmit={onFieldSubmit}>
              {({handleSubmit, values}) => (
                <>
                  <FormInput
                    name="reasons"
                    label={`*${t(
                      'BookingModule.BookingDetail.CancelConfirmation.Form.Fields.Reasons',
                    )}`}
                    placeholder={t(
                      'BookingModule.BookingDetail.CancelConfirmation.Form.Fields.ReasonsPlaceHolder',
                    )}
                    multiline
                  />
                  <Button
                    title={t(
                      'BookingModule.BookingDetail.CancelConfirmation.Cancel',
                    )}
                    outline
                    danger
                    disabled={isLoading}
                    loading={isLoading}
                    onPress={() => {
                      handleSubmit();
                      errorFormValidation(values, formValidationSchema);
                    }}
                    style={{marginTop: 40}}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => actionSheetRef.current?.hide()}
                    disabled={isLoading}
                    style={styles.btnCancel}>
                    <Text style={styles.btnCancelLabel}>
                      {t('BookingModule.BookingDetail.CancelConfirmation.Back')}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        )}
        {step === 'confirmed' && (
          <View>
            <Image
              source={IMAGES.bookingCancel}
              resizeMode="contain"
              style={{width: 80, height: 80, alignSelf: 'center'}}
            />
            <Text style={styles.title}>{`${t(
              'BookingModule.BookingDetail.CancelConfirmation.Header',
            )}`}</Text>
            <Text style={styles.confirmationDesc}>
              {t('BookingModule.BookingDetail.CancelConfirmation.Desc')}
            </Text>
            <Button
              title={t('Actions.Close')}
              onPress={() => {
                actionSheetRef.current?.hide();
                refetch();
              }}
              style={{marginTop: 40, marginBottom: 20}}
            />
          </View>
        )}
      </Animated.View>
    </ActionSheet>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    actionContainer: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      padding: 20,
    },
    devider: {
      width: 114,
      height: 8,
      alignSelf: 'center',
      borderRadius: 8 / 2,
      marginBottom: 20,
      backgroundColor: theme.colors.border,
    },
    title: {
      fontFamily: FONTS_FAMILIES.semiBold,
      color: theme.colors.headerText,
      fontSize: SIZES.fontLg,
      textAlign: 'center',
      marginBottom: 20,
    },
    confirmationDesc: {
      fontFamily: FONTS_FAMILIES.regular,
      color: theme.colors.text,
      fontSize: SIZES.font,
      textAlign: 'center',
    },
    btnCancel: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
      marginBottom: 20,
    },
    btnCancelLabel: {
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.font,
      textAlign: 'center',
      color: theme.colors.placeHolder,
    },
  });

export default ConfirmationCancelModal;
