import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {ILocation} from '../@types/location';

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

export const getCurrentLocation = (): Promise<ILocation | null> =>
  new Promise(resolve => {
    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => resolve({latitude, longitude}),
      () => resolve(null),
      {
        timeout: 30000,
        maximumAge: 300000,
        enableHighAccuracy: true,
      },
    );
  });

export const getLocation = async (): Promise<ILocation | null> => {
  const hasLocationPermission: boolean =
    Platform.OS === 'ios'
      ? (await Geolocation.requestAuthorization('always')) === 'granted'
      : await requestLocationPermission();

  return hasLocationPermission ? await getCurrentLocation() : null;
};
