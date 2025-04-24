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
import {convertServiceType} from '../../../../utils/Helpers';

type ServiceDataProps = {
  data: AdminServicesDetailResponse;
};

const ServiceData: React.FC<ServiceDataProps> = ({
  data: {
    data_body: {
      service: {detail, machine, booking_datetime, status_photos, service_type},
    },
  },
}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
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
      <Text style={styles.header}>{t('itemMachineName')}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.label}>{`${t('itemMachineName')}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {machine?.master_machine.name}
          </Text>
          <Text style={styles.label}>{`${t('itemCategoryMachine')}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {machine?.master_machine.code}
          </Text>
          <Text style={styles.label}>{`${t('itemBookingDateLabel')}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {booking_datetime}
          </Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.label}>{`${t('itemSerialNumber')}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {machine?.serial_number}
          </Text>
          <Text style={styles.label}>{`${t('itemPurchaseDate')}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {machine?.purchased_date}
          </Text>
          <Text style={styles.label}>{`${t('itemServiceDateLabel')}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {detail?.schedule_datetime}
          </Text>
          <Text style={styles.label}>{`${t('itemServiceTypeLabel')}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {convertServiceType(service_type)}
          </Text>
        </View>
      </View>
      {service_type === 'SERVICES' && (
        <>
          {detail && (
            <View>
              <Text style={styles.label}>{`${t(
                'serviceScheduleFields.issue',
              )}`}</Text>
              <View style={[styles.issueContainer, styles.spaceInfo]}>
                <Text
                  style={[
                    styles.infoText,
                    {fontFamily: FONTS_FAMILIES.regular},
                  ]}>
                  {detail.problem}
                </Text>
              </View>
            </View>
          )}
          {status_photos.pending && status_photos.pending.length && (
            <View>
              <Text style={styles.label}>{`${t(
                'serviceScheduleFields.photo',
              )}`}</Text>
              <View style={styles.images}>
                {status_photos.pending.map((photoUri, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() =>
                      setViewImage({
                        index,
                        images: status_photos.pending.map(image => ({
                          url: image.image_path_full,
                        })),
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
                ))}
              </View>
            </View>
          )}
        </>
      )}
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
    spaceInfo: {
      marginBottom: 10,
    },
    infoContainer: {
      flexDirection: 'row',
    },
    infoSection: {
      flex: 1,
    },
    label: {
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
    location: {
      color: theme.colors.primary,
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.font,
      marginLeft: 10,
    },
    issueContainer: {
      padding: 10,
      backgroundColor: theme.colors.issueBackgroundColor,
      borderRadius: SIZES.radiusXs,
      borderWidth: 0.5,
      borderColor: theme.colors.issueBorderColor,
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

export default ServiceData;
