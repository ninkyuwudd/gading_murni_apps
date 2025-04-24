import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import {Theme} from '../@types/theme';
import {useTheme} from '@react-navigation/native';
import {useField} from 'formik';
import {Photos} from '../@types/booking';
import {FONTS_FAMILIES, ICONS, SIZES} from '../constants/theme';
import {SvgXml} from 'react-native-svg';
import {useUploadPhoto} from '../api/hooks/useSupports';
import {useTranslation} from 'react-i18next';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import {UploadPhotoResponse} from '../@types/support';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Button} from '.';

type IProps = {
  name: string;
  label: string;
  disabled?: boolean;
  canAddImage?: boolean;
};

const FormUploadMultipleImages: React.FC<IProps> = ({
  name,
  label,
  disabled,
  canAddImage = true,
}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const [field, meta, helpers] = useField<Photos[]>(name);
  const {mutate: mutateUploadPhoto, status: statusUpload} = useUploadPhoto();
  const isLoadingUpload = statusUpload === 'pending';
  const {value} = field;
  const error = meta.error as string;

  const [viewImage, setViewImage] = useState<{
    index: number;
    images: {url: string}[];
  } | null>(null);

  const handleAddPhoto = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
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
                const newPhotosArray = [...value, source];
                helpers.setValue(newPhotosArray, false);
              },
            },
          );
        }
      }
    });
  };

  const renderHeader = () => (
    <Button
      title={t('Actions.Close')}
      onPress={() => setViewImage(null)}
      style={styles.headerModalPreview}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.imagesContainer}>
        {value.map((photoUri, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() =>
              setViewImage({
                index,
                images: value.map(image => ({
                  url: image.image_url,
                })),
              })
            }
            style={styles.imageContainer}>
            <Image
              source={{uri: photoUri.image_url}}
              resizeMode="cover"
              style={styles.image}
            />
          </TouchableOpacity>
        ))}
        {canAddImage && (
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={isLoadingUpload || disabled}
            onPress={handleAddPhoto}
            style={styles.addPhoto}>
            {isLoadingUpload || disabled ? (
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
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Modal visible={Boolean(viewImage)} transparent={true}>
        <ImageViewer
          renderFooter={renderHeader}
          index={viewImage?.index}
          imageUrls={viewImage?.images}
          footerContainerStyle={styles.footerModalPreview}
        />
      </Modal>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
      marginBottom: 8,
      color: theme.colors.text,
    },
    imagesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 5,
    },
    imageContainer: {
      marginRight: 5,
      marginBottom: 5,
      borderWidth: 1,
      borderStyle: Platform.OS === 'ios' ? 'solid' : 'dashed',
      borderRadius: 5,
      borderColor: theme.colors.placeHolder,
    },
    image: {
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
      backgroundColor: theme.colors.border,
      borderColor: theme.colors.placeHolder,
    },
    errorText: {
      fontSize: 14,
      marginTop: 4,
      fontFamily: FONTS_FAMILIES.medium,
      color: theme.colors.errorText,
    },
    headerModalPreview: {
      margin: 20,
      width: 150,
    },
    footerModalPreview: {
      alignItems: 'center',
      width: '100%',
    },
  });

export default FormUploadMultipleImages;
