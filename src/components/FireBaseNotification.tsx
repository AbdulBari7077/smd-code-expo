import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const FirebaseNotificationInit = () => {

    messaging().getToken().then(async (token) => {
        console.log("Device Token : ", token);
    });
    messaging().onTokenRefresh(token => {
        console.log("Device Token Updated: " + token)
    });
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log(
            "Notification caused app to open from background state:",
            remoteMessage.notification
        );
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage);
    });
    messaging().getInitialNotification().then(async (remoteMessage) => {
        if (remoteMessage) {
            console.log(
                "Notification caused app to open from quit state:",
                remoteMessage.notification
            );
        }
    });
    messaging().onMessage(async (remoteMessage) => {
        return Alert.alert(
            remoteMessage.notification.title,
            remoteMessage.notification.body,
            [
                { text: "Cancel", onPress: () => { } },
                { text: "View", onPress: () => { } }
            ]
        );

    });

};
export default FirebaseNotificationInit;

