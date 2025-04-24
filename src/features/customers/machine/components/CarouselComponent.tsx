import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
  Text,
} from 'react-native';

type ItemData = {
  id: string;
  title: string;
  // Add any additional fields needed for your data
};

const DATA: ItemData[] = [
  // Populate your array of data here
  {id: 'item1', title: 'Item 1'},
  {id: 'item2', title: 'Item 2'},
  {id: 'item3', title: 'Item 3'},
  {id: 'item3', title: 'Item 4'},
  {id: 'item3', title: 'Item 5'},
  {id: 'item3', title: 'Item 6'},
  {id: 'item3', title: 'Item 7'},
];

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = 200;
const SCALE_FACTOR = 1;
const SPACING = 15;

const Carousel: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({item, index}: {item: ItemData; index: number}) => {
    // Bind the item's scale to its position on the screen
    const inputRange = [
      -1 * ITEM_WIDTH, // when the item is one full ITEM_WIDTH to the left
      0, // when the item is at the start
      ITEM_WIDTH * index, // when the item is in the center
      ITEM_WIDTH * (index + 1), // when the item is fully right
    ];

    // Set the default scale for items except for the first one
    const defaultScale = index === 0 ? 1 : SCALE_FACTOR;

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [defaultScale, 1, defaultScale, defaultScale],
      extrapolate: 'clamp',
    });

    const marginLeft = index === 0 ? SPACING : 0;

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            marginLeft: marginLeft,
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            transform: [{scale}],
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
      </Animated.View>
    );
  };

  const Pagination = () => {
    return (
      <View style={styles.pagination}>
        {DATA.map((_, index) => {
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
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
            listener: event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / ITEM_WIDTH,
              );
              setActiveIndex(index);
            },
          },
        )}
        scrollEventThrottle={16}
      />
      <Pagination />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden', // Hide the scaled-down sides of the non-central items
  },
  itemContainer: {
    justifyContent: 'center',
    marginRight: SPACING, // Add space between the items
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
  },
  pagination: {
    flexDirection: 'row',
    // marginTop: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'grey',
    margin: 4,
  },
  paginationDotActive: {
    backgroundColor: 'blue',
    width: 20,
  },
});

export default Carousel;
