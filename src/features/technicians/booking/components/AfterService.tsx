/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, ICONS, SIZES} from '../../../../constants/theme';
import {UploadPhotoResponse} from '../../../../@types/support';
import {useUploadPhoto} from '../../../../api/hooks/useSupports';
import Toast from 'react-native-simple-toast';
import {errorFormValidation} from '../../../../utils/Validations';
import {SvgXml} from 'react-native-svg';
import {
  launchCamera,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import i18n from '../../../../i18n/i18n.config';
import {
  AdminServicesDetailResponse,
  AfterServiceFormValues,
} from '../../../../@types/service';
import {
  afterServiceDefaultValue,
  afterServiceValidationSchema,
} from '../constants/ValidationSchema';
import {ObjectSchema} from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {FormInput, Button} from '../../../../components';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {AddServiceItemModal} from '.';
import {
  formatWithThousandSeparator,
  recalculateServiceCost,
} from '../../../../utils/Helpers';
import {useAfterServiceAdminServices} from '../../../../api/hooks/useAdminServices';

interface IAfterServiceProps {
  data: AdminServicesDetailResponse;
  refetch: () => void;
}

const AfterService: React.FC<IAfterServiceProps> = ({data, refetch}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {mutate: mutateUploadPhoto, status: statusUpload} = useUploadPhoto();
  const isLoadingUpload = statusUpload === 'pending';
  const {mutate, status} = useAfterServiceAdminServices();
  const isLoading = status === 'pending';

  const initialValues: AfterServiceFormValues = afterServiceDefaultValue;

  const [formValidationSchema, setFormValidationSchema] = useState<
    ObjectSchema<AfterServiceFormValues>
  >(afterServiceValidationSchema());

  const [editServiceItemIndex, setEditServiceItemIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormValidationSchema(afterServiceValidationSchema);

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const handleAddPhoto = (
    setFieldValue: FormikHelpers<AfterServiceFormValues>['setFieldValue'],
    values: AfterServiceFormValues,
  ) => {
    const options: CameraOptions = {
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 0,
      cameraType: 'back',
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.info('User cancelled camera picker');
      } else if (response.errorMessage) {
        console.error('Camera Error: ', response.errorMessage);
      } else {
        const firstAsset = response.assets?.[0];
        if (firstAsset?.uri) {
          mutateUploadPhoto(
            {
              uri: firstAsset.uri,
              name: firstAsset.fileName,
              type: firstAsset.type,
            },
            {
              onSuccess: uploadDataSuccess => {
                const responseUploadData =
                  uploadDataSuccess as unknown as UploadPhotoResponse;
                const source = responseUploadData.data_body;
                const newPhotosArray = [
                  ...values.photos,
                  {
                    imagePath: source.image_path,
                    imageUrl: source.image_url,
                  },
                ];
                setFieldValue('photos', newPhotosArray);
              },
            },
          );
        }
      }
    });
  };

  const onFieldSubmit = (values: AfterServiceFormValues) => {
    mutate(
      {id: data.data_body.service.id, data: values},
      {
        onSuccess: () => {
          refetch();
          Toast.show(t('toastSuccessUpdate'), Toast.SHORT);
        },
      },
    );
  };

  const deleteItemAtIndex = (
    dataDelete: AfterServiceFormValues['serviceItems'],
    index: number,
    setFieldValue: FormikHelpers<AfterServiceFormValues>['setFieldValue'],
  ): void => {
    if (index >= 0 && index < dataDelete.list.length) {
      dataDelete.list.splice(index, 1);
    } else {
      console.error('Invalid index. No item was deleted.');
    }
    setFieldValue('serviceItems', recalculateServiceCost(dataDelete));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('afterServiceLabel')}</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        enableReinitialize={true}
        onSubmit={onFieldSubmit}>
        {({handleSubmit, values, errors, setFieldValue, touched}) => (
          <>
            <FormInput
              name="description"
              label={`*${t('afterServiceFieldFields.description')}`}
              placeholder={t('afterServiceFieldFields.descriptionPlaceHolder')}
              multiline
              editable={!isLoading}
            />
            <View style={{marginBottom: 10}}>
              <Text
                style={[
                  styles.label,
                  {
                    color: theme.colors.text,
                    marginBottom: 10,
                  },
                ]}>{`*${t('addServiceItemHeaderLabel')}`}</Text>
              {values.serviceItems.list.length
                ? values.serviceItems.list.map((service, index) => (
                    <View key={index} style={styles.serviceItemsContainer}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View style={{marginRight: 5}}>
                          <Text style={styles.serviceItemSemiBold}>
                            {index + 1}.
                          </Text>
                        </View>
                        <View style={{flex: 0.7}}>
                          <Text style={styles.serviceItemSemiBold}>
                            {service.sparepartName}
                          </Text>
                          <Text
                            style={[
                              styles.serviceItemSemiBold,
                              {color: theme.colors.placeHolder},
                            ]}>
                            {service.type}
                          </Text>
                        </View>
                        <View style={{flex: 0.3}}>
                          <Text
                            style={[
                              styles.serviceItemSemiRegular,
                              {textAlign: 'right'},
                            ]}>{`${
                            service.amount
                          }PCS X Rp ${formatWithThousandSeparator(
                            service.cost,
                          )}`}</Text>
                          <Text
                            style={[
                              styles.serviceItemSemiRegular,
                              {
                                textAlign: 'right',
                                fontFamily: FONTS_FAMILIES.semiBold,
                              },
                            ]}>{`= Rp ${formatWithThousandSeparator(
                            Number(service.amount) * Number(service.cost),
                          )}`}</Text>
                        </View>
                      </View>
                      {service.note && (
                        <>
                          <Text style={styles.notesTitle}>
                            {t('afterServiceFieldFields.note')}
                          </Text>
                          <Text
                            style={{
                              fontFamily: FONTS_FAMILIES.semiBold,
                              fontSize: SIZES.font,
                              color: theme.colors.text,
                              marginBottom: 5,
                            }}>
                            {service.note}
                          </Text>
                        </>
                      )}
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          disabled={isLoading}
                          onPress={() => {
                            setEditServiceItemIndex(index);
                            actionSheetRef.current?.show();
                          }}
                          style={styles.actionContainer}>
                          <Text style={styles.actionLabel}>
                            {t('editLabel')}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          disabled={isLoading}
                          onPress={() =>
                            deleteItemAtIndex(
                              values.serviceItems,
                              index,
                              setFieldValue,
                            )
                          }
                          style={styles.actionContainer}>
                          <Text
                            style={[
                              styles.actionLabel,
                              {color: theme.colors.errorText},
                            ]}>
                            {t('deleteLabel')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                : null}
              {values.serviceItems.list.length ? (
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text
                    style={[
                      styles.totalLabel,
                      {fontFamily: FONTS_FAMILIES.semiBold},
                    ]}>
                    Rp{' '}
                    {formatWithThousandSeparator(
                      values.serviceItems.serviceCost,
                    )}
                  </Text>
                </View>
              ) : null}
              {touched.serviceItems && errors.serviceItems && (
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.colors.errorText,
                    },
                  ]}>
                  {errors.serviceItems?.serviceCost as unknown as string}
                </Text>
              )}
            </View>
            <Button
              title={t('addServiceItemLabel')}
              onPress={() => actionSheetRef.current?.show()}
              outline
              style={{marginBottom: 10}}
              disabled={isLoading}
            />
            <FormInput
              name="feedback"
              label={`*${t('afterServiceFieldFields.feedback')}`}
              placeholder={t('afterServiceFieldFields.feedbackPlaceHolder')}
              multiline
              editable={!isLoading}
            />
            <View>
              <Text
                style={[
                  styles.label,
                  {
                    color: theme.colors.text,
                  },
                ]}>{`*${t('serviceScheduleFields.photos')}`}</Text>
              <View
                style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 5}}>
                {values.photos.map((photoUri, index) => (
                  <View
                    key={index}
                    style={[
                      styles.imageContainer,
                      {
                        borderColor: theme.colors.placeHolder,
                      },
                    ]}>
                    <Image
                      source={{uri: photoUri.imageUrl}}
                      resizeMode="cover"
                      style={styles.photo}
                    />
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() => handleAddPhoto(setFieldValue, values)}
                  disabled={isLoading}
                  style={[
                    styles.addPhoto,
                    {
                      backgroundColor: theme.colors.border,
                      borderColor: theme.colors.placeHolder,
                    },
                  ]}>
                  {isLoadingUpload ? (
                    <ActivityIndicator
                      size="large"
                      color={theme.colors.placeHolder}
                    />
                  ) : (
                    <SvgXml
                      xml={ICONS.icnAddPhotos(theme.colors.placeHolder)}
                      height={43}
                      width={43}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {touched.photos && errors.photos && (
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.colors.errorText,
                    },
                  ]}>
                  {errors.photos as unknown as string}
                </Text>
              )}
            </View>
            <Button
              title={t('saveLabel')}
              disabled={isLoading}
              loading={isLoading}
              onPress={() => {
                handleSubmit();
                errorFormValidation(values, formValidationSchema);
              }}
              style={{marginTop: 40}}
            />
            <AddServiceItemModal
              actionSheetRef={actionSheetRef}
              data={values.serviceItems}
              onResult={result => {
                setFieldValue('serviceItems', result, false);
                setEditServiceItemIndex(null);
              }}
              onCancel={() => setEditServiceItemIndex(null)}
              editServiceItemIndex={editServiceItemIndex}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 20,
    },
    header: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.headerText,
      marginBottom: 20,
    },
    label: {
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
    },
    serviceItemsContainer: {
      backgroundColor: theme.colors.border,
      borderRadius: SIZES.radiusXs,
      padding: 10,
      marginBottom: 10,
    },
    serviceItemSemiBold: {
      color: theme.colors.headerText,
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.semiBold,
    },
    serviceItemSemiRegular: {
      color: theme.colors.text,
      fontSize: SIZES.fontXs,
      fontFamily: FONTS_FAMILIES.regular,
    },
    notesTitle: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      color: theme.colors.placeHolder,
      marginBottom: 5,
      marginTop: 10,
    },
    notesInfo: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      color: theme.colors.text,
      marginBottom: 5,
    },
    actionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
    },
    actionLabel: {
      fontSize: SIZES.fontLg,
      fontFamily: FONTS_FAMILIES.bold,
      color: theme.colors.primary,
    },
    totalContainer: {
      paddingLeft: 15,
      paddingRight: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalLabel: {
      color: theme.colors.headerText,
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.regular,
    },
    imageContainer: {
      marginRight: 5,
      marginBottom: 5,
      borderWidth: 1,
      borderStyle: Platform.OS === 'ios' ? 'solid' : 'dashed',
      borderRadius: 5,
    },
    photo: {
      width: 100,
      height: 100,
      borderRadius: 5,
    },
    addPhoto: {
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 100,
      borderRadius: 5,
      borderWidth: 1,
      borderStyle: Platform.OS === 'ios' ? 'solid' : 'dashed',
    },
  });

export default AfterService;
