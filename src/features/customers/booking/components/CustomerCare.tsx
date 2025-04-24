import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
  Image,
  Linking,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {
  FONTS_FAMILIES,
  ICONS,
  IMAGES,
  SIZES,
} from '../../../../constants/theme';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';
import {UserInfo} from '../../../../@types/booking';
import {SvgXml} from 'react-native-svg';
import {useTranslation} from 'react-i18next';
import {convertToInternationalFormat} from '../../../../utils/Helpers';

interface IProps {
  containerStyle?: ViewStyle;
  user: UserInfo;
  disabled?: boolean;
}

const CustomerCare: React.FC<IProps> = ({containerStyle, user, disabled}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const defaultStyle = DefaultStyleSheet(theme);
  const styles = createStyles(theme);

  const openWhatsAppChat = async () => {
    const phoneNumber = convertToInternationalFormat(user.mobile_number);
    const url = `https://wa.me/${phoneNumber}`;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, defaultStyle.shadow, containerStyle]}>
      <View style={styles.column1}>
        <Image
          source={IMAGES.accountCreated}
          resizeMode="contain"
          style={styles.avatar}
        />
      </View>
      <View style={styles.column2}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.mobileNumber}>{user?.mobile_number}</Text>
      </View>
      <View style={styles.column3}>
        <TouchableOpacity
          disabled={disabled}
          onPress={openWhatsAppChat}
          activeOpacity={0.8}
          style={[
            styles.chatAction,
            disabled ? {backgroundColor: theme.colors.border} : {},
          ]}>
          <SvgXml
            xml={ICONS.navIcnChat(theme.colors.background)}
            width={20}
            height={20}
          />
          <Text style={styles.chat}>{t('ChatModule.TabBarChat')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: SIZES.radiusSm,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
    },
    column1: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    column2: {
      flex: 0.5,
      justifyContent: 'center',
    },
    column3: {
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    avatar: {
      backgroundColor: theme.colors.primary,
      width: 48,
      height: 48,
      borderRadius: 48 / 2,
    },
    name: {
      color: theme.colors.headerText,
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      marginBottom: 5,
    },
    mobileNumber: {
      color: theme.colors.text,
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
    },
    chatAction: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 24,
    },
    chat: {
      color: theme.colors.background,
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      marginLeft: 5,
    },
  });

export default CustomerCare;
