/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';

// Assuming this is the shape of your data
type MachineData = {
  name: string;
  serialNumber: string;
  purchaseDate: string;
};

const machines: MachineData[] = [
  {
    name: 'ALHC 2513 Flatbed Printer',
    serialNumber: 'ALHC2513-0001',
    purchaseDate: '2019-12-30',
  },
  {
    name: 'ALHC 2513 Flatbed Printer 2',
    serialNumber: 'ALHC2513-0001',
    purchaseDate: '2019-12-30',
  },
  {
    name: 'ALHC 2513 Flatbed Printer 3',
    serialNumber: 'ALHC2513-0001',
    purchaseDate: '2019-12-30',
  },
  {
    name: 'ALHC 2513 Flatbed Printer 3',
    serialNumber: 'ALHC2513-0001',
    purchaseDate: '2019-12-30',
  },
  {
    name: 'ALHC 2513 Flatbed Printer 3',
    serialNumber: 'ALHC2513-0001',
    purchaseDate: '2019-12-30',
  },
];

const {width} = Dimensions.get('window');

const MachineSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const ITEM_WIDTH = width - 120; // Update this based on your card width
  const ITEM_MARGIN = 10; // Update this based on your desired margin
  return (
    <View>
      <Animated.FlatList
        data={machines}
        renderItem={({item, index}) => (
          <MachineCard
            machine={item}
            index={index}
            scrollX={scrollX}
            itemWidth={ITEM_WIDTH}
            margin={ITEM_MARGIN}
          />
        )}
        contentContainerStyle={{
          backgroundColor: 'red',
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.serialNumber}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
      />
      <PaginationIndicator
        currentIndex={Animated.divide(scrollX, width)}
        itemsCount={machines.length}
      />
    </View>
  );
};

const MachineCard: React.FC<{
  machine: MachineData;
  index: number;
  scrollX: Animated.Value;
  itemWidth: number;
  margin: number;
}> = ({machine, index, scrollX, itemWidth, margin}) => {
  const inputRange = [
    (index - 1) * itemWidth,
    index * itemWidth,
    (index + 1) * itemWidth,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.9],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.7, 1, 0.7],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          width: itemWidth, // Width from props
          marginRight: index === machines.length - 1 ? margin : 0, // No right margin for the last item
          //   marginLeft: margin, // Margin for the spacing between items
          transform: [{scale}],
          //   opacity,
        },
      ]}>
      <Text>{machine.name}</Text>
      <Text>{machine.serialNumber}</Text>
      <Text>{machine.purchaseDate}</Text>
    </Animated.View>
  );
};

const PaginationIndicator: React.FC<{
  currentIndex: Animated.AnimatedDivision;
  itemsCount: number;
}> = ({currentIndex, itemsCount}) => {
  const dots = Array.from({length: itemsCount}, (_, index) => {
    const scale = currentIndex.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.8, 1.4, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = currentIndex.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={index}
        style={[styles.paginationDot, {transform: [{scale}], opacity}]}
      />
    );
  });

  return <View style={styles.paginationContainer}>{dots}</View>;
};

const styles = StyleSheet.create({
  // ... your styles here
  card: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    // Add shadows/elevation, etc.
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    margin: 5,
  },
  paginationDotActive: {
    backgroundColor: 'green',
  },
  // ... your other styles
});

export default MachineSlider;
