import firebase from '@react-native-firebase/app';
import Notification from './notification';
import { firebaseConfig } from '../config/firebase.config';

// Initialize Firebase if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class Firebase {
  static Notification = Notification;
}
