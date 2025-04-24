import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {FONTS_FAMILIES, ICONS} from '../../../constants/theme';
import {Notification} from '../../../@types/notifications';
import Moment from 'moment';

interface IProps {
  data: Notification;
  onPress: (id: string) => void;
}

const NotificationItem: React.FC<IProps> = ({data, onPress}) => {
  const styles = createStyles();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => data.is_read === 0 && onPress(data.id)}
      style={[styles.component, data.is_read === 1 && styles.isReadComponent]}>
      {data.is_read ? (
        <View style={styles.iconReadNotificationView}>
          <SvgXml xml={ICONS.icnReadNotification} width={20} height={20} />
        </View>
      ) : (
        <View style={styles.iconUnreadNotificationView}>
          <SvgXml xml={ICONS.icnUnreadNotification} width={20} height={20} />
        </View>
      )}
      <View style={styles.informationView}>
        <Text style={styles.date}>
          {Moment(data.created_at).format('DD-MM-YYYY, HH:mm')}
        </Text>
        <Text style={styles.title}>{data.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = () =>
  StyleSheet.create({
    component: {
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#D9D9D9',
      flexDirection: 'row',
      padding: 16,
    },
    isReadComponent: {backgroundColor: '#F2F2F2'},
    iconUnreadNotificationView: {
      backgroundColor: '#2196F333',
      borderRadius: 6,
      marginRight: 16,
      padding: 6,
    },
    iconReadNotificationView: {
      backgroundColor: '#E1E1E1',
      borderRadius: 6,
      marginRight: 16,
      padding: 6,
    },
    informationView: {
      flex: 1,
    },
    date: {
      color: '#72849A',
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: 12,
    },
    title: {
      color: '#081A4A',
      fontFamily: FONTS_FAMILIES.medium,
      fontSize: 16,
    },
  });

export default NotificationItem;
