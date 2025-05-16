module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: [
          'IOS_FIREBASE_API_KEY',
          'IOS_FIREBASE_PROJECT_ID',
          'IOS_FIREBASE_STORAGE_BUCKET',
          'IOS_FIREBASE_MESSAGING_SENDER_ID',
          'IOS_FIREBASE_APP_ID',
          'IOS_FIREBASE_DATABASE_URL',
          'ANDROID_FIREBASE_API_KEY',
          'ANDROID_FIREBASE_PROJECT_ID',
          'ANDROID_FIREBASE_STORAGE_BUCKET',
          'ANDROID_FIREBASE_MESSAGING_SENDER_ID',
          'ANDROID_FIREBASE_APP_ID',
          'ANDROID_FIREBASE_DATABASE_URL'
        ],
        safe: true,
        allowUndefined: false,
      },
    ],
  ],
};
