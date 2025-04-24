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
import {ServiceReviewScreenProps} from '../../../../@types/navigation';
import {useFocusEffect, useRoute, useTheme} from '@react-navigation/native';
import {FormInput} from '../../../../components';
import {useBookingDetail} from '../../../../api/hooks/useBooking';
import {ServiceRatingTypes} from '../../../../@types/service';
import {
  ratingDefaultValue,
  ratingValidationSchema,
} from '../constants/ValidationSchema';
import {ObjectSchema} from 'yup';
import i18n from '../../../../i18n/i18n.config';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {useTranslation} from 'react-i18next';
import {Theme} from '../../../../@types/theme';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';
import {Rating} from '@kolking/react-native-rating';
import {Formik} from 'formik';

const ServiceReview: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const defaultStyleSheet = DefaultStyleSheet(theme);
  const styles = createStyles(theme);
  const route = useRoute<ServiceReviewScreenProps['route']>();
  const {serviceId} = route.params;
  const {data, refetch, isLoading} = useBookingDetail(serviceId!);

  const [initialValues, setInitialValues] =
    useState<ServiceRatingTypes>(ratingDefaultValue);

  const [formValidationSchema, setFormValidationSchema] = useState<
    ObjectSchema<ServiceRatingTypes>
  >(ratingValidationSchema());

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormValidationSchema(ratingValidationSchema);

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (data) {
        setInitialValues({
          rating: data.data_body.service.reviews[0].rating,
          review: data.data_body.service.reviews[0].review || '',
        });
      }
    }, [data]),
  );

  return (
    <View style={{flex: 1}}>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        enableReinitialize={true}
        onSubmit={() => {}}>
        {({values}) => (
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
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      {t('ServiceModule.Review.Title')}
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
                      disabled={true}
                      baseColor={theme.colors.border}
                      rating={values.rating}
                      fillColor={theme.colors.rating}
                      touchColor={theme.colors.rating}
                      spacing={25}
                      style={styles.rating}
                    />
                  </View>
                  <FormInput
                    name="review"
                    label={t('ServiceModule.Rating.Form.Fields.Review')}
                    placeholder={t(
                      'ServiceModule.Rating.Form.Fields.ReviewPlaceholder',
                    )}
                    multiline
                    editable={false}
                  />
                </View>
              )}
            </ScrollView>
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
    titleContainer: {
      alignItems: 'center',
      marginBottom: 30,
      marginTop: 20,
    },
    title: {
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.h4,
      color: theme.colors.headerText,
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
  });

export default ServiceReview;
