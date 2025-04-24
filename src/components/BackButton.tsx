/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {TouchableOpacity, StyleSheet, BackHandler} from 'react-native';
import {
  useTheme,
  ParamListBase,
  RouteProp,
  useRoute,
  useFocusEffect,
  NavigationState,
} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {ICONS} from '../constants/theme';
import {Theme} from '../@types/theme';
import {navigationRef} from '../navigations/navigationService';
import {CustomerScreenType} from '../@types/navigation';

type GlobalParams = {
  resetState?: NavigationState;
  navigateScreen?: CustomerScreenType;
};

const BackButton: React.FC = () => {
  const route: RouteProp<ParamListBase> = useRoute();
  const theme = useTheme() as Theme;

  const handleOnpress = () => {
    const params = route.params as GlobalParams;
    if (params?.resetState) {
      const {resetState} = params;
      navigationRef.reset(resetState);
    } else if (params?.navigateScreen) {
      const {navigateScreen} = params;
      navigationRef.navigate(navigateScreen);
    } else if (navigationRef.canGoBack()) {
      navigationRef.goBack();
    } else {
      BackHandler.exitApp();
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleOnpress();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleOnpress}
      style={styles.button}>
      <SvgXml
        xml={ICONS.navIcnArrowLeft(theme.colors.text)}
        width={32}
        height={32}
        style={{marginRight: 10}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BackButton;
