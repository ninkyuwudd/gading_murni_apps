import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../@types/theme';

const FooterIndicator: React.FC = () => {
  const theme = useTheme() as Theme;
  return (
    <ActivityIndicator
      size="small"
      color={theme.colors.primary}
      style={styles.indicator}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default FooterIndicator;
