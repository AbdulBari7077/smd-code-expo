// import messaging from '@react-native-firebase/messaging';
// import {Platform, PermissionsAndroid} from 'react-native';
// // import {
// //   checkNotifications,
// //   requestNotifications,
// // } from 'react-native-permissions';

// export const FirebaseNotificationInit = () => {
//   // if (Platform.OS == 'ios')
//   //   checkNotifications().then(({status, settings}) => {
//   //     console.log('check: ', {status}, {settings});
//   //     if (status == 'denied') {
//   //       requestNotifications(['alert', 'sound']).then(({status, settings}) => {
//   //         console.log('request: ', {status}, {settings});
//   //         if (state == 'granted') mapFirebaseEvents();
//   //       });
//   //     } else if (status == 'granted') mapFirebaseEvents();
//   //   });
//   // else {
//   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
//   mapFirebaseEvents();
// };

// const mapFirebaseEvents = () => {
//   try {
//     // Get the device token
//     messaging()
//       .getToken()
//       .then(token => {
//         // Save data to API/DB
//         //firebaseService.saveUserFireBaseTokenToDatabase(token);
//       });

//     messaging().onTokenRefresh(token => {
//       // Save data to API/DB
//       // firebaseService.saveUserFireBaseTokenToDatabase(token);
//     });

//     // Register background state app open handler
//     messaging().onNotificationOpenedApp(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from background state:',
//           remoteMessage.notification,
//         );

//         processNotification(remoteMessage, true);
//       }
//     });

//     // Register quit state app open handler
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           console.log(
//             'Notification caused app to open from quit state:',
//             remoteMessage.notification,
//           );

//           processNotification(remoteMessage);
//         }
//       });

//     // Register foreground handler
//     messaging().onMessage(async remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );

//         processNotification(remoteMessage);
//       }
//     });

//     // Register background handler
//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//       console.log('Message handled in the background!', remoteMessage);
//       processNotification(remoteMessage);
//     });
//   } catch (error) {
//     console.log('Firebase loading error: ', error);
//   }
// };

// const processNotification = (
//   messageReceived: any,
//   gotoNavigationScreen = false,
// ) => {
//   console.log('trigger called: ', messageReceived);

//   // dispatch counter refresh
//   //refreshNotifyCounter();

//   if (gotoNavigationScreen) {
//     const dataObj = messageReceived.data;

//     // data values are in string. convert to integer
//     const noticeData = {
//       DataId: parseInt(dataObj.DataId),
//       Type: parseInt(dataObj.Type),
//     };

//     takeActionOnNotification(noticeData);
//   }
// };

// const takeActionOnNotification = (noticeData: any) => {
//   if (noticeData) {
//     switch (noticeData.Type) {
//       case 1:
//         // do something
//         break;

//       case 2:
//         // do something
//         break;
//     }
//   }
// };
