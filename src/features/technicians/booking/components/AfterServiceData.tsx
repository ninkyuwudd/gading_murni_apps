/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Platform,
} from 'react-native';
import {AdminServicesDetailResponse} from '../../../../@types/service';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Button} from '../../../../components';
import {ServicesCost} from '../../../customers/service/components';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';

type ServiceDataProps = {
  data: AdminServicesDetailResponse;
};

const AfterServiceData: React.FC<ServiceDataProps> = ({data}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const defaultStyleSheet = DefaultStyleSheet(theme);
  const [viewImage, setViewImage] = useState<{
    index: number;
    images: {url: string}[];
  } | null>(null);

  const renderHeader = () => (
    <Button
      title={t('closeLabel')}
      onPress={() => setViewImage(null)}
      style={{margin: 20, width: 150}}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('afterServiceLabel')}</Text>
      <Text style={[defaultStyleSheet.textLabel1, styles.spaceBottom]}>
        {t('ServiceModule.ServiceDetail.Notes')}
      </Text>
      <Text style={defaultStyleSheet.textValue2}>
        {data?.data_body.service.detail.description}
      </Text>
      <ServicesCost
        data={data!.data_body.service.list}
        totalCost={data.data_body.service.service_cost}
      />
      <Text style={[defaultStyleSheet.textLabel1, styles.spaceBottom]}>
        {t('ServiceModule.ServiceDetail.Feedback')}
      </Text>
      <Text style={[defaultStyleSheet.textValue2, styles.spaceInfo]}>
        {data?.data_body.service.detail.feedback}
      </Text>
      <View>
        <Text style={[defaultStyleSheet.textLabel1, styles.spaceBottom]}>
          {t('BookingModule.BookingDetail.StartService')}
        </Text>
        <View style={styles.images}>
          {data.data_body.service.status_photos.on_process &&
            data.data_body.service.status_photos.on_process.length &&
            data.data_body.service.status_photos.on_process.map(
              (photoUri, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() =>
                    setViewImage({
                      index,
                      images:
                        data.data_body.service.status_photos.on_process.map(
                          image => ({
                            url: image.image_path_full,
                          }),
                        ),
                    })
                  }
                  style={[
                    styles.imageContainer,
                    {
                      borderColor: theme.colors.placeHolder,
                    },
                  ]}>
                  <Image
                    source={{uri: photoUri.image_path_full}}
                    resizeMode="cover"
                    style={styles.photo}
                  />
                </TouchableOpacity>
              ),
            )}
        </View>
      </View>
      <View>
        <Text style={[defaultStyleSheet.textLabel1, styles.spaceBottom]}>
          {t('BookingModule.BookingDetail.AfterService')}
        </Text>
        <View style={styles.images}>
          {data.data_body.service.status_photos.waiting_approval &&
            data.data_body.service.status_photos.waiting_approval.length &&
            data.data_body.service.status_photos.waiting_approval.map(
              (photoUri, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() =>
                    setViewImage({
                      index,
                      images:
                        data.data_body.service.status_photos.waiting_approval.map(
                          image => ({
                            url: image.image_path_full,
                          }),
                        ),
                    })
                  }
                  style={[
                    styles.imageContainer,
                    {
                      borderColor: theme.colors.placeHolder,
                    },
                  ]}>
                  <Image
                    source={{uri: photoUri.image_path_full}}
                    resizeMode="cover"
                    style={styles.photo}
                  />
                </TouchableOpacity>
              ),
            )}
        </View>
      </View>
      <Modal visible={Boolean(viewImage)} transparent={true}>
        <ImageViewer
          renderFooter={renderHeader}
          index={viewImage?.index}
          imageUrls={viewImage?.images}
          footerContainerStyle={{alignItems: 'center', width: '100%'}}
        />
      </Modal>
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
    spaceBottom: {
      marginBottom: 5,
    },
    spaceInfo: {
      marginBottom: 10,
    },
    footer: {
      backgroundColor: theme.colors.background,
      padding: 20,
      marginTop: 20,
    },
    checkBoxText: {
      fontFamily: FONTS_FAMILIES.regular,
      color: theme.colors.text,
      textDecorationLine: 'none',
    },
    totalContainer: {
      paddingLeft: 15,
      paddingRight: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: -10,
    },
    totalLabel: {
      color: theme.colors.headerText,
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.regular,
    },
    label: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      color: theme.colors.placeHolder,
      marginBottom: 5,
    },
    images: {
      flexDirection: 'row',
      flexWrap: 'wrap',
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
  });

export default AfterServiceData;
