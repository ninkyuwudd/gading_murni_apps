import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

type Style = {
  centerContainer: ViewStyle;
  shadow: ViewStyle;
  title: TextStyle;
  icon: ImageStyle;
  defaultBarShadow: ViewStyle;
  paddingHorizontal: ViewStyle;
  padding: ViewStyle;
  scrollScreenContainer: ViewStyle;
  scrollScreenCenterContent: ViewStyle;
};

export const GlobalStyleSheet: Style = {
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'red',
  },
  icon: {
    width: 10,
    height: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 4,
  },
  defaultBarShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 4,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  padding: {
    padding: 20,
  },
  scrollScreenContainer: {
    flexGrow: 1,
  },
  scrollScreenCenterContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
