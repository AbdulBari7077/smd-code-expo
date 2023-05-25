import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import CountriesList from "./src/screens/countries";
import CitiesList from "./src/screens/cites";
import HomeTabs from "./src/screens/homeTabs";
import AppContextProvider from "./src/context/appcontext";
import TakePicture from "./src/screens/TakePicture";
import { LogBox } from "react-native";
import { useEffect } from "react";
import FirebaseNotificationInit from "./src/components/FireBaseNotification";
LogBox.ignoreLogs([
  "Row too big to fit into CursorWindow requiredPos=0, totalRows=1",
]);

import * as Notifications from "expo-notifications";

const Stack = createStackNavigator();

export default function App() {
  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // If the existing status is not granted, request permission from the user
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // If permission is still not granted, display an error message
    if (finalStatus !== "granted") {
      console.log("Failed to get  notification Permissions!");
      return;
    } else {
      console.log(
        "FirebaseNotificationInit  notification Permissions Granted!"
      );
      FirebaseNotificationInit();
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Drawer" component={DrawerScreen} /> */}
          <Stack.Screen name="Hometabs" component={HomeTabs} />
          <Stack.Screen name="TakePicture" component={TakePicture} />
          <Stack.Screen name="Countries" component={CountriesList} />
          <Stack.Screen
            name="Cities"
            component={CitiesList}
            options={({ route }: any) => ({
              headerShown: true,
              title: `Cities of ${route.params.country.Name}`,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
