/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FONTS_FAMILIES, ICONS, SIZES} from '../../../../constants/theme';
import {Theme} from '../../../../@types/theme';
import {useTheme} from '@react-navigation/native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {Button} from '../../../../components';
import Toast from 'react-native-simple-toast';
import {
  AdminServicesDetailResponse,
  OnLocationFormValues,
} from '../../../../@types/service';
import {Formik, FormikHelpers} from 'formik';
import i18n from '../../../../i18n/i18n.config';
import {ObjectSchema} from 'yup';
import {
  onLocationDataValidationSchema,
  onLocationDefaultValue,
} from '../constants/ValidationSchema';
import {useTechnicianOnLocationAdminServices} from '../../../../api/hooks/useAdminServices';
import {useUploadPhoto} from '../../../../api/hooks/useSupports';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import {UploadPhotoResponse} from '../../../../@types/support';
import {SvgXml} from 'react-native-svg';
import useLocation from '../../../../hooks/useLocation';

interface IOnLocationModalProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  data: AdminServicesDetailResponse;
  refetch: () => void;
}

const OnLocationModal: React.FC<IOnLocationModalProps> = ({
  actionSheetRef,
  data,
  refetch,
}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [location, mapLoading, triggerLocationFetch] = useLocation();
  const initialValues: OnLocationFormValues = onLocationDefaultValue;
  const {mutate: mutateUploadPhoto, status: statusUpload} = useUploadPhoto();
  const isLoadingUpload = statusUpload === 'pending';

  const {mutate, status} = useTechnicianOnLocationAdminServices();
  const isLoading = status === 'pending';

  const [formValidationSchema, setFormValidationSchema] = useState<
    ObjectSchema<OnLocationFormValues>
  >(onLocationDataValidationSchema());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = `${now.getDate().toString().padStart(2, '0')}-${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${now.getFullYear()}, ${now
        .getHours()
        .toString()
        .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      setCurrentTime(timeString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormValidationSchema(onLocationDataValidationSchema);

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const handleAddPhoto = (
    setFieldValue: FormikHelpers<OnLocationFormValues>['setFieldValue'],
    values: OnLocationFormValues,
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
                const newPhotosArray = [...values.photos, source];
                setFieldValue('photos', newPhotosArray);
              },
            },
          );
        }
      }
    });
  };

  const onFieldSubmit = (values: OnLocationFormValues) => {
    mutate(
      {
        id: data.data_body.service.id,
        data: {
          photos: values.photos.map(item => item.image_path),
          location_log: {
            geo_latitude: String(location!.latitude),
            geo_longitude: String(location!.longitude),
            location: data.data_body.service.customer.address_detail,
          },
        },
      },
      {
        onSuccess: () => {
          refetch();
          actionSheetRef.current?.hide();
          Toast.show(t('toastSuccessUpdate'), Toast.SHORT);
        },
      },
    );
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      closable={!isLoading}
      onBeforeShow={() => triggerLocationFetch()}
      containerStyle={{
        backgroundColor: theme.colors.background,
        ...styles.actionContainer,
      }}>
      <View style={styles.devider} />
      <View>
        <Text style={styles.title}>{t('technicianOnLocationLabel')}</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={formValidationSchema}
          enableReinitialize={true}
          onSubmit={onFieldSubmit}>
          {({handleSubmit, values, setFieldValue, touched, errors}) => (
            <>
              <View>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.colors.text,
                    },
                  ]}>{`*${t('serviceScheduleFields.photos')}`}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 5,
                  }}>
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
                        source={{uri: photoUri.image_url}}
                        resizeMode="cover"
                        style={styles.photo}
                      />
                    </View>
                  ))}
                  <TouchableOpacity
                    disabled={isLoadingUpload || isLoading}
                    onPress={() => handleAddPhoto(setFieldValue, values)}
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
              <View style={[styles.infoContainer, styles.spaceInfo]}>
                <View style={styles.infoSection}>
                  <Text style={styles.labelInfo}>{`${t(
                    'techniciaCurrentTimeLabel',
                  )}`}</Text>
                  <Text style={styles.infoText}>{currentTime}</Text>
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.labelInfo}>{`${t(
                    'techniciaCoordinateLocationLabel',
                  )}`}</Text>
                  {!mapLoading && location && (
                    <Text
                      style={[
                        styles.infoText,
                        {color: theme.colors.primary},
                      ]}>{`${location.latitude}, ${location.longitude}`}</Text>
                  )}
                </View>
              </View>
              <Text style={styles.labelInfo}>{`${t(
                'headerDataCompletenessLabel',
              )}`}</Text>
              <Text style={styles.infoText}>
                {data.data_body.service.customer.address_detail}
              </Text>
              <Button
                title={t('saveLabel')}
                onPress={() => handleSubmit()}
                style={{marginTop: 40}}
              />
            </>
          )}
        </Formik>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => actionSheetRef.current?.hide()}
          style={styles.btnCancel}>
          <Text style={styles.btnCancelLabel}>{t('cancelLabel')}</Text>
        </TouchableOpacity>
      </View>
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
    spaceInfo: {
      marginVertical: 10,
    },
    label: {
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
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
    infoContainer: {
      flexDirection: 'row',
    },
    infoSection: {
      flex: 1,
    },
    labelInfo: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      color: theme.colors.placeHolder,
      marginBottom: 5,
    },
    infoText: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      color: theme.colors.text,
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

export default OnLocationModal;
