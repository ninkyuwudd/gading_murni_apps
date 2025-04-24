/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {StatusLog} from '../../../../@types/booking';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';

type IProps = {
  data: StatusLog[];
};

const BookingStatus: React.FC<IProps> = ({data}) => {
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);

  const CustomTextComponent = ({htmlText}: {htmlText: string}) => {
    return <Text style={styles.caption}>{parseBoldText(htmlText)}</Text>;
  };

  const parseBoldText = (htmlText: string) => {
    const output = [];
    const splitText = htmlText.split(/(<b>|<\/b>)/g);

    for (let i = 0; i < splitText.length; i++) {
      if (splitText[i] === '<b>') {
        i++;
        output.push(
          <Text key={i} style={{fontFamily: FONTS_FAMILIES.semiBold}}>
            {splitText[i]}
          </Text>,
        );
        i++;
      } else if (splitText[i] !== '</b>') {
        output.push(splitText[i]);
      }
    }

    return output;
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={item.id} style={styles.itemContainer}>
          <View style={styles.indicatorContainer}>
            <View
              style={[
                styles.indicator,
                {
                  borderColor:
                    data.length - 1 === index
                      ? theme.colors.primary
                      : theme.colors.border,
                },
              ]}
            />
          </View>
          <View style={{flex: 0.7}}>
            <Text style={styles.title}>{item.title}</Text>
            <CustomTextComponent htmlText={item.caption} />
          </View>
          <View style={{flex: 0.3}}>
            <Text style={styles.date}>{item.timestamp.split(' ')[0]}</Text>
            <Text style={styles.time}>{item.timestamp.split(' ')[1]}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    itemContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    indicatorContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 10,
    },
    indicator: {
      height: 18,
      width: 18,
      borderRadius: 180 / 2,
      backgroundColor: theme.colors.background,
      borderWidth: 18 / 4,
    },
    title: {
      fontSize: SIZES.fontLg,
      color: theme.colors.headerText,
      fontFamily: FONTS_FAMILIES.semiBold,
    },
    caption: {
      fontSize: SIZES.font,
      color: theme.colors.text,
      fontFamily: FONTS_FAMILIES.regular,
    },
    date: {
      fontSize: SIZES.fontXs,
      color: theme.colors.text,
      fontFamily: FONTS_FAMILIES.semiBold,
      textAlign: 'right',
    },
    time: {
      fontSize: SIZES.fontXs,
      color: theme.colors.placeHolder,
      fontFamily: FONTS_FAMILIES.semiBold,
      textAlign: 'right',
    },
  });

export default BookingStatus;
