import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import CountriesList from "./src/screens/countries";
import CitiesList from "./src/screens/cites";
import HomeTabs from "./src/screens/homeTabs";
import AppContextProvider from "./src/context/appcontext";
import TakePicture from "./src/screens/TakePicture";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Row too big to fit into CursorWindow requiredPos=0, totalRows=1"]);

const Stack = createNativeStackNavigator();

export default function App() {
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
