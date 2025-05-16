import React, {useEffect} from 'react';
import Routes from './src/navigations/Routes';
import {ThemeProvider} from './src/constants/ThemeContext';
import {SafeAreaView} from './src/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Alert, Platform} from 'react-native';
import Firebase from './src/firebase';
import firebase from '@react-native-firebase/app';
import { firebaseConfig } from './src/config/firebase.config';

const queryClient = new QueryClient({});

const App: React.FC = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Ensure Firebase is initialized
        if (!firebase.apps.length) {
          await firebase.initializeApp(firebaseConfig);
        }
        
        // Initialize Firebase services
        await Firebase.Notification.start();
        
        // Then hide splash screen
        SplashScreen.hide();

        const checkAndRequestPermissions = async () => {
          try {
            const cameraStatus = await check(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA,
            );

            if (cameraStatus !== RESULTS.GRANTED) {
              const newCameraStatus = await request(
                Platform.OS === 'ios'
                  ? PERMISSIONS.IOS.CAMERA
                  : PERMISSIONS.ANDROID.CAMERA,
              );

              if (newCameraStatus !== RESULTS.GRANTED) {
                Alert.alert(
                  'Permission Required',
                  'Camera permission is required to use this app.',
                );
              }
            }

            const locationStatus = await check(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            );

            if (locationStatus !== RESULTS.GRANTED) {
              const newLocationStatus = await request(
                Platform.OS === 'ios'
                  ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                  : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              );

              if (newLocationStatus !== RESULTS.GRANTED) {
                Alert.alert(
                  'Permission Required',
                  'Location permission is required to use this app.',
                );
              }
            }
          } catch (error) {
            console.error('Permission request error:', error);
          }
        };

        await checkAndRequestPermissions();
      } catch (error) {
        console.error('App initialization error:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <SafeAreaView>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider>
                <Routes />
              </ThemeProvider>
            </QueryClientProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
