/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NotificationsNavigationProp} from '../../../@types/navigation';
import {ICONS} from '../../../constants/theme';
import {Theme} from '../../../@types/theme';
import {t} from 'i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {NotificationItem, EmptyCard} from '../components';
import {
  useNotifications,
  useUpdateStatusReadAll,
  useUpdateStatusRead,
  useNotificationCount,
} from '../../../api/hooks/useNotifications';
import {DefaultStyleSheet} from '../../../constants/DefaultStyleSheet';
import {FooterIndicator} from '../../../components';

const Notifications: React.FC = () => {
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const defaultStyle = DefaultStyleSheet(theme);
  const navigation = useNavigation<NotificationsNavigationProp>();
  const {
    data,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotifications({size: 10});
  const {data: dataCount, refetch: refetchCount} = useNotificationCount();
  const {mutate, status} = useUpdateStatusReadAll();
  const {mutate: mutateUpdateStatus, status: statusUpdate} =
    useUpdateStatusRead();
  const isLoadingUpdateStatusAll = status === 'pending';
  const isLoadingUpdateStatus = statusUpdate === 'pending';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SvgXml
          xml={ICONS.icnlistCheck}
          width={24}
          height={24}
          style={{marginRight: 16}}
          onPress={() => data?.pages.length && updateStatusReadAll()}
        />
      ),
    });
  }, [navigation, data?.pages.length]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (data?.pages.length && !isLoading) {
        refetch();
      }
    });

    return unsubscribe;
  }, [navigation, data?.pages.length, isLoading, refetch]);

  const updateStatusReadAll = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          refetch();
          refetchCount();
        },
      },
    );
  };
  const updateStatusRead = (id: string) => {
    mutateUpdateStatus(
      {id},
      {
        onSuccess: () => {
          refetch();
          refetchCount();
        },
      },
    );
  };

  const footerLoading = isFetchingNextPage ? <FooterIndicator /> : null;

  return (
    <View style={defaultStyle.screenContainer}>
      {isLoadingUpdateStatus || isLoadingUpdateStatusAll ? (
        <View style={styles.centerView}>
          <ActivityIndicator size={'small'} color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={data?.pages || []}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatlistContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() =>
            data ? (
              <View style={styles.emptyContainer}>
                <EmptyCard />
              </View>
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              colors={[theme.colors.primary]}
            />
          }
          renderItem={({item}) => (
            <NotificationItem
              data={item}
              onPress={(id: string) => updateStatusRead(id)}
            />
          )}
          refreshing={isLoading}
          onEndReached={() =>
            data?.pages.length && hasNextPage ? fetchNextPage() : null
          }
          onEndReachedThreshold={0.3}
          ListFooterComponent={footerLoading}
        />
      )}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    flatlistContainer: {
      flexGrow: 1,
      paddingBottom: 100,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    centerView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
  });

export default Notifications;
