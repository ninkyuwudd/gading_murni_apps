import {useState, useEffect, useCallback} from 'react';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  getCurrentLocation,
  requestLocationPermission,
} from '../utils/MapLocation';
import {enableLatestRenderer} from 'react-native-maps';
import {ILocation} from '../@types/location';

const useLocation = (): [ILocation | null, boolean, () => void] => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [mapLoading, setMapLoading] = useState<boolean>(true);

  const fetchLocation = async () => {
    const hasLocationPermission: boolean =
      Platform.OS === 'ios'
        ? (await Geolocation.requestAuthorization('always')) === 'granted'
        : await requestLocationPermission();
    if (hasLocationPermission) {
      const [currentLocation, _] = await Promise.all([
        getCurrentLocation(),
        enableLatestRenderer(),
      ]);

      setLocation(currentLocation);
    }
    setMapLoading(false);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const triggerLocationFetch = useCallback(() => {
    fetchLocation();
  }, []);

  return [location, mapLoading, triggerLocationFetch];
};

export default useLocation;
