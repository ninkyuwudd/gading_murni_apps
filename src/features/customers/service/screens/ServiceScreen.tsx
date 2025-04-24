/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {SearchBar, FooterIndicator} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {CallToAction, EmptyCard, MachineItem} from '../../machine/components';
import {useMachines} from '../../../../api/hooks/useMachines';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';
import {ServiceNavigationProp} from '../../../../@types/navigation';
import {config} from '../../../../constants/Configs';
import {navigationRef} from '../../../../navigations/navigationService';

const Service: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const defaultStyle = DefaultStyleSheet(theme);
  const navigation = useNavigation<ServiceNavigationProp>();
  const [searchName, setSearchName] = useState<string>('');
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useMachines({name: searchName, size: config.limitPage});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (data?.pages.length && !isLoading) {
        refetch();
      }
    });

    return unsubscribe;
  }, [navigation, data?.pages.length, isLoading, refetch]);

  const footerLoading = isFetchingNextPage ? <FooterIndicator /> : null;

  return (
    <View style={defaultStyle.screenContainer}>
      <SearchBar
        onChangeText={setSearchName}
        placeholder={t('MachineModule.SearchBarPlaceholder')}
      />
      <CallToAction />
      <FlatList
        data={data?.pages || []}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[
          defaultStyle.flatlistContainer,
          data?.pages.length === 0 && styles.emptyContainer,
        ]}
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
          <MachineItem
            data={item}
            onPress={() =>
              navigationRef.navigate('Machine', {
                screen: 'AddMachine',
                params: {
                  id: item.id,
                  master_machine: {
                    id: item.master_machine.id,
                    name: item.master_machine.name,
                    photo_img: item.master_machine.photo_img,
                    barcode_img: item.master_machine.barcode_img,
                    created_at: item.master_machine.created_at,
                    updated_at: item.master_machine.updated_at,
                    code: item.master_machine.code,
                    machine_category_id:
                      item.master_machine.machine_category_id,
                    is_active: item.master_machine.is_active,
                    barcode_code: item.master_machine.barcode_code,
                    photo_image_path_full:
                      item.master_machine.photo_image_path_full,
                    barcode_image_path_full:
                      item.master_machine.barcode_image_path_full,
                  },
                  serial_number: item.serial_number,
                  purchased_date: item.purchased_date,
                },
              })
            }
          />
        )}
        refreshing={isLoading}
        onEndReached={() =>
          data?.pages.length && hasNextPage ? fetchNextPage() : null
        }
        onEndReachedThreshold={0.3}
        ListFooterComponent={footerLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default Service;
