/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Image,
} from 'react-native';
import i18n from '../../../../i18n/i18n.config';
import {useRoute, useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, IMAGES, SIZES} from '../../../../constants/theme';
import {ServiceRatingScreenProps} from '../../../../@types/navigation';
import {Button, FormInput} from '../../../../components';
import {
  useBookingDetail,
  useServiceRating,
} from '../../../../api/hooks/useBooking';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';
import {ServiceRatingTypes} from '../../../../@types/service';
import {
  ratingDefaultValue,
  ratingValidationSchema,
} from '../constants/ValidationSchema';
import {ObjectSchema} from 'yup';
import {Formik} from 'formik';
import {Rating} from '@kolking/react-native-rating';
import Toast from 'react-native-simple-toast';
import {navigationRef} from '../../../../navigations/navigationService';

const ServiceRating: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const defaultStyleSheet = DefaultStyleSheet(theme);
  const styles = createStyles(theme);
  const route = useRoute<ServiceRatingScreenProps['route']>();
  const {serviceId} = route.params;

  const {data, refetch, isLoading} = useBookingDetail(serviceId!);
  const {mutate, status} = useServiceRating();
  const isLoadingServiceRating = status === 'pending';

  const [formValidationSchema, setFormValidationSchema] = useState<
    ObjectSchema<ServiceRatingTypes>
  >(ratingValidationSchema());

  const initialValues: ServiceRatingTypes = ratingDefaultValue;

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormValidationSchema(ratingValidationSchema);

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const onFieldSubmit = (values: ServiceRatingTypes) => {
    mutate(
      {
        id: serviceId,
        data: {
          review: values,
        },
      },
      {
        onSuccess: () => {
          navigationRef.reset({
            index: 0,
            routes: [{name: 'CustomerHome'}],
          });
          Toast.show(t('Messages.SubmitRatingSuccessfully'), Toast.SHORT);
        },
      },
    );
  };

  return (
    <View style={{flex: 1}}>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        enableReinitialize={true}
        onSubmit={onFieldSubmit}>
        {({handleSubmit, values, errors, setFieldValue, touched}) => (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                defaultStyleSheet.scrollScreenContainer,
                isLoading && defaultStyleSheet.scrollScreenCenterContent,
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
                <View style={defaultStyleSheet.paddingCardContainer}>
                  <View style={{alignItems: 'center', marginVertical: 20}}>
                    <Image
                      source={IMAGES.serviceCreated}
                      resizeMode="contain"
                      style={{
                        height: 164,
                      }}
                    />
                    <Text style={styles.title}>
                      {t('ServiceModule.Rating.Title')}
                    </Text>
                    <Text style={styles.description}>
                      {t('ServiceModule.Rating.Desc')}
                    </Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.technician}>
                      {data?.data_body.service.technician?.name}
                    </Text>
                    <Text style={styles.branch}>
                      {`${t('ServiceModule.Rating.Form.Fields.Technician')} - ${
                        data?.data_body.service.customer.branches[0].name
                      }`}
                    </Text>
                    <Rating
                      size={30}
                      disabled={isLoadingServiceRating}
                      baseColor={theme.colors.border}
                      rating={values.rating}
                      fillColor={theme.colors.rating}
                      touchColor={theme.colors.rating}
                      onChange={value => setFieldValue('rating', value)}
                      spacing={25}
                      style={styles.rating}
                    />
                    {touched.rating && errors.rating && (
                      <Text style={styles.error}>
                        {errors.rating as unknown as string}
                      </Text>
                    )}
                  </View>
                  <FormInput
                    name="review"
                    label={t('ServiceModule.Rating.Form.Fields.Review')}
                    placeholder={t(
                      'ServiceModule.Rating.Form.Fields.ReviewPlaceholder',
                    )}
                    multiline
                    editable={!isLoadingServiceRating}
                  />
                </View>
              )}
            </ScrollView>

            {data && (
              <View style={styles.footer}>
                <Button
                  title={t('ServiceModule.Rating.ActionSubmit')}
                  onPress={() => handleSubmit()}
                  disabled={!values.rating && !isLoadingServiceRating}
                />
              </View>
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    spaceBottom: {
      marginBottom: 5,
    },
    title: {
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.h4,
      marginTop: 40,
      color: theme.colors.headerText,
    },
    description: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      textAlign: 'center',
      marginTop: 10,
      color: theme.colors.text,
    },
    ratingContainer: {
      padding: 20,
      borderRadius: SIZES.radiusXs,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.colors.border,
      marginBottom: 16,
    },
    technician: {
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
      color: theme.colors.text,
      marginBottom: 8,
    },
    branch: {
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
      color: theme.colors.text,
      marginBottom: 8,
    },
    rating: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
      borderRadius: 70,
      height: 60,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3.5,
      elevation: 4,
      marginTop: 20,
    },
    error: {
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
      color: theme.colors.errorText,
      marginTop: 10,
    },
    footer: {
      backgroundColor: theme.colors.background,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3.5,
      elevation: 4,
      padding: 20,
      marginTop: 20,
    },
  });

export default ServiceRating;
