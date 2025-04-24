import {useFocusEffect, useTheme} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  FlatList,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {EmptyCard, MachineItem} from '.';
import {useMachines} from '../../../../api/hooks/useMachines';
import {navigationRef} from '../../../../navigations/navigationService';

interface IProps {
  containerStyle?: ViewStyle;
}

const SPACING = 20;
const ITEM_WIDTH = SIZES.width * 0.8;

const MachineCard: React.FC<IProps> = ({containerStyle}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const {data, isLoading, refetch} = useMachines({size: 5});
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / ITEM_WIDTH);
    setActiveIndex(index);
  };

  const createServices = (id: string) => {
    navigationRef.navigate('CustomerHome', {
      state: {
        routes: [
          {
            name: 'ServiceTab',
            state: {
              routes: [
                {
                  name: 'Service',
                },
                {
                  name: 'SubmitServiceSchedule',
                  params: {
                    machineId: id,
                    resetState: {
                      index: 0,
                      routes: [{name: 'CustomerHome'}],
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    });
  };

  return (
    <View style={containerStyle}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{t('MachineModule.Card.Title')}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigationRef.navigate('Machine', {
              screen: 'AddMachine',
              params: {},
            })
          }>
          <Text style={styles.action}>{t('MachineModule.Card.Action')}</Text>
        </TouchableOpacity>
      </View>
      {!data || isLoading ? (
        <ActivityIndicator
          size="small"
          color={theme.colors.primary}
          style={styles.indicator}
        />
      ) : (
        <>
          <FlatList
            data={data.pages || []}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              const marginLeft = index === 0 ? SPACING : 0;
              return (
                <MachineItem
                  data={item}
                  containerStyle={{
                    marginLeft,
                    width: ITEM_WIDTH,
                    marginRight: SPACING,
                  }}
                  onPress={({id}) => createServices(id)}
                />
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: false,
                listener: handleScroll,
              },
            )}
            scrollEventThrottle={16}
          />
          {data.pages.length > 2 && (
            <View style={styles.pagination}>
              {data.pages.map((_, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      activeIndex === index && styles.paginationDotActive,
                    ]}
                  />
                );
              })}
            </View>
          )}
        </>
      )}
      {data && data?.pages.length === 0 && <EmptyCard />}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      paddingHorizontal: 20,
    },
    title: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.headerText,
    },
    action: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      color: theme.colors.primary,
    },
    indicator: {
      alignSelf: 'center',
      marginVertical: 20,
    },
    pagination: {
      flexDirection: 'row',
      marginTop: 10,
      alignSelf: 'center',
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 8 / 2,
      backgroundColor: theme.colors.border,
      margin: 4,
    },
    paginationDotActive: {
      backgroundColor: theme.colors.primary,
      width: 20,
    },
  });

export default MachineCard;
