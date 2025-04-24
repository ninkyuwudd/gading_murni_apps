/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Platform,
  StatusBar,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {
  ICONS,
  FONTS_FAMILIES,
  SIZES,
  IMAGES,
} from '../../../../constants/theme';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';
import {
  useCameraDevice,
  Camera,
  CameraPermissionStatus,
  useCodeScanner,
} from 'react-native-vision-camera';
import {debounce} from 'lodash';

interface IProps {
  resultScan: (barcode: string) => void;
}

const ScanBarcode: React.FC<IProps> = ({resultScan}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const defaultStyle = DefaultStyleSheet(theme);
  const modalY = useRef<Animated.Value>(new Animated.Value(500)).current;
  const [hasPermission, setHasPermission] =
    useState<CameraPermissionStatus>('not-determined');
  const device = useCameraDevice('back');

  const [showScan, setShowScan] = useState<boolean>(false);

  useEffect(() => {
    Camera.requestCameraPermission().then(permission => {
      setHasPermission(permission);
    });
  }, []);

  const openScan = (): void => {
    modalY.setValue(500);
    setShowScan(true);
  };

  const closeScan = () => {
    Animated.timing(modalY, {
      toValue: 500,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowScan(false);
      modalY.setValue(500);
    });
  };

  useEffect(() => {
    if (showScan) {
      Animated.timing(modalY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showScan]);

  const debouncedResultScan = debounce((code: string) => {
    resultScan(code);
  }, 1000);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        closeScan();
        const lastCode = codes[codes.length - 1].value!;
        debouncedResultScan(lastCode);
      }
    },
  });

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.scanBarcodeButton}
        onPress={openScan}>
        <SvgXml xml={ICONS.icnScanBarcode} width={10} height={10} />
        <Text style={styles.scanBarcode}>{t('scanBarcode')}</Text>
      </TouchableOpacity>
      <Modal
        visible={showScan}
        transparent={true}
        animationType="none"
        onDismiss={() => {
          modalY.setValue(500);
        }}>
        <Animated.View
          style={[styles.modalView, {transform: [{translateY: modalY}]}]}>
          <View style={[styles.header, defaultStyle.shadow]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={closeScan}
              style={styles.backButton}>
              <SvgXml
                xml={ICONS.navIcnArrowLeft(theme.colors.text)}
                width={32}
                height={32}
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              {t('MachineModule.ScanBarcode.Title')}
            </Text>
          </View>
          <View style={{flex: 1}}>
            {hasPermission !== 'granted' ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
              </View>
            ) : (
              <View style={{flex: 1}}>
                <Camera
                  codeScanner={codeScanner}
                  device={device!}
                  isActive={showScan}
                  style={{
                    flex: 1,
                  }}
                />
                <Image
                  source={IMAGES.scanBarcodeFrame}
                  resizeMode="stretch"
                  style={styles.scanBarcodeFrame}
                />
              </View>
            )}
            {hasPermission === 'granted' && (
              <View style={styles.footer}>
              <Text style={[styles.headerText, {textAlign: 'center'}]}>
                {t('MachineModule.ScanBarcode.Footer')}
              </Text>
            </View>
            )}
          </View>
        </Animated.View>
      </Modal>
    </>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      zIndex: 1000,
      height: Platform.OS === 'ios' ? 44 : 56,
      marginTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
    },
    backButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontFamily: FONTS_FAMILIES.bold,
      color: theme.colors.text,
      fontSize: SIZES.h4,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scanBarcodeFrame: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    scanBarcodeButton: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 30,
      flexDirection: 'row',
      paddingVertical: 8,
      paddingHorizontal: 40,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 16,
    },
    scanBarcode: {
      color: theme.colors.primary,
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: 14,
      marginLeft: 6,
    },
    modalView: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    footer: {
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
  });

export default ScanBarcode;
