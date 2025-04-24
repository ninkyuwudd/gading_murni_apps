import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
  Image,
  Modal,
  Platform,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {BookingDetailResponse, ServiceStatus} from '../../../../@types/booking';
import {useTranslation} from 'react-i18next';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Button} from '../../../../components';
import {ServicesCost} from '../../service/components';
import {formatWithThousandSeparator} from '../../../../utils/Helpers';

interface IProps {
  containerStyle?: ViewStyle;
  data: BookingDetailResponse;
}

const StartAndAfterService: React.FC<IProps> = ({containerStyle, data}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const [viewImage, setViewImage] = useState<{
    index: number;
    images: {url: string}[];
  } | null>(null);

  const startService = () =>
    data.data_body.service.status >= ServiceStatus.OnProcess &&
    data.data_body.service.status <= ServiceStatus.Finish && (
      <View style={styles.serviceContainer}>
        <Text style={styles.label}>
          {t('BookingModule.BookingDetail.StartService')}
        </Text>
        <View style={styles.serviceContentContainer}>
          {data?.data_body?.service?.status_photos?.on_process?.map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() =>
                  setViewImage({
                    index,
                    images: data.data_body.service.status_photos.on_process.map(
                      image => ({
                        url: image.image_path_full,
                      }),
                    ),
                  })
                }
                style={styles.imageContainer}>
                <Image
                  source={{uri: item.image_path_full}}
                  resizeMode="cover"
                  style={styles.photo}
                />
              </TouchableOpacity>
            ),
          )}
        </View>
      </View>
    );

  const afterService = () =>
    data.data_body.service.status >= ServiceStatus.WaitingApproval &&
    data.data_body.service.status <= ServiceStatus.Finish && (
      <View style={styles.serviceContainer}>
        <Text style={styles.label}>
          {t('BookingModule.BookingDetail.AfterService')}
        </Text>
        <View style={styles.serviceContentContainer}>
          {data.data_body.service.status_photos.waiting_approval.map(
            (item, index) => (
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
                style={styles.imageContainer}>
                <Image
                  source={{uri: item.image_path_full}}
                  resizeMode="cover"
                  style={styles.photo}
                />
              </TouchableOpacity>
            ),
          )}
        </View>
        {data.data_body.service.status === ServiceStatus.Finish && (
          <ServicesCost
            data={data.data_body.service.list}
            totalCost={data.data_body.service.service_cost}
          />
        )}
      </View>
    );

  const renderHeader = () => (
    <Button
      title={t('Actions.Close')}
      onPress={() => setViewImage(null)}
      style={styles.headerImageViewer}
    />
  );

  return (
    <View style={[containerStyle]}>
      {startService()}
      {afterService()}
      <Modal visible={Boolean(viewImage)} transparent={true}>
        <ImageViewer
          renderFooter={renderHeader}
          index={viewImage?.index}
          imageUrls={viewImage?.images}
          footerContainerStyle={styles.footerImageViewer}
        />
      </Modal>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    label: {
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
      color: theme.colors.text,
    },
    serviceContainer: {
      marginBottom: 20,
    },
    serviceContentContainer: {
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
    photo: {
      width: 100,
      height: 100,
      borderRadius: 5,
    },
    headerImageViewer: {
      margin: 20,
      width: 150,
    },
    footerImageViewer: {
      alignItems: 'center',
      width: '100%',
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
    spaceInfo: {
      marginBottom: 10,
    },
  });

export default StartAndAfterService;
