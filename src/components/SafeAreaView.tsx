import React, {ReactNode} from 'react';
import {
  SafeAreaView as RNSafeAreaView,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface SafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const SafeAreaView = ({children, style}: SafeAreaViewProps): JSX.Element => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.safeArea, {paddingBottom: insets.bottom}, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default SafeAreaView;
