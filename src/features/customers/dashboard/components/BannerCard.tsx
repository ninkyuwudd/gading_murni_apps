/* eslint-disable react-hooks/exhaustive-deps */
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  FlatList,
  Animated,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Theme} from '../../../../@types/theme';
import {IMAGES, SIZES} from '../../../../constants/theme';
interface IProps {
  containerStyle?: ViewStyle;
}

const SPACING = 20;
const ITEM_WIDTH = SIZES.width - 40;
const ITEM_HEIGHT = SIZES.width * 0.35;
const INTERVAL_TIME = 3000;

const dotWidth = 8;
const activeDotWidth = 20;
const dotMargin = 4;
const totalSpacing = dotWidth + dotMargin * 2;
const activeDotOffset = activeDotWidth - dotWidth - 10;

type TBanners = {
  id: string;
  image: string;
};

const BannerCard: React.FC<IProps> = ({containerStyle}) => {
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const data: TBanners[] = [
    {
      id: '89cf6bf8-87c8-4a82-9aa4-f7b188ea39bd',
      image: IMAGES.bannerOne,
    },
    {
      id: '88d3c1be-0f8c-4a5e-8622-1e583a5cb094',
      image: IMAGES.bannerTwo,
    },
    {
      id: 'd90ea830-b72b-419a-9736-3b6b1a820743',
      image: IMAGES.bannerThree,
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / ITEM_WIDTH);
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (data && data.length > 0) {
        let nextIndex = activeIndex + 1;
        if (nextIndex >= data.length) {
          nextIndex = 0;
        }
        setActiveIndex(nextIndex);
        flatListRef.current?.scrollToOffset({
          offset: nextIndex * (ITEM_WIDTH + SPACING),
          animated: true,
        });
      }
    }, INTERVAL_TIME);

    return () => clearInterval(interval);
  }, [activeIndex, data.length > 2]);

  const inputRange = data?.map((_, i) => i * (ITEM_WIDTH + SPACING));
  const outputRange = data?.map((_, i) => i * totalSpacing - activeDotOffset);

  const translateX =
    data.length > 2
      ? scrollX.interpolate({
          inputRange: inputRange || [0, ITEM_WIDTH + SPACING],
          outputRange: outputRange || [0, totalSpacing - activeDotOffset],
          extrapolate: 'clamp',
        })
      : null;

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const marginLeft = index === 0 ? SPACING : 0;
          return (
            <Image
              source={item.image}
              resizeMode="contain"
              style={[
                styles.banner,
                {
                  marginLeft,
                },
              ]}
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
      {data.length && data.length > 2 && (
        <View style={styles.pagination}>
          {data?.map((_, index) => (
            <View key={index} style={styles.paginationDot} />
          ))}
          <Animated.View
            style={[
              styles.paginationDotActive,
              {transform: [{translateX: translateX}]},
            ]}
          />
        </View>
      )}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: 20,
    },
    pagination: {
      flexDirection: 'row',
      marginTop: 10,
      alignSelf: 'center',
    },
    paginationDot: {
      width: dotWidth,
      height: dotWidth,
      borderRadius: 8 / 2,
      backgroundColor: theme.colors.border,
      margin: 4,
    },
    paginationDotActive: {
      backgroundColor: theme.colors.background,
      width: activeDotWidth,
      height: dotWidth,
      borderRadius: dotWidth / 2,
      position: 'absolute',
      bottom: 4,
    },
    banner: {
      borderRadius: 12,
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      marginRight: SPACING,
    },
  });

export default BannerCard;
