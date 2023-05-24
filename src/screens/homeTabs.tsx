import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MatIcons from "react-native-vector-icons/MaterialIcons";
import Setting from "./settings";
import Tab3 from "./profile";
import CountriesList from "./countries";
import { View, Image, Settings } from "react-native";
import Profile from "./profile";
import ContextTab from "./contexttab";
import Maps from "./maps";

const Tab = createBottomTabNavigator();

const MyHeader = ({ navigation, route, options }: any) => {
  return (
    <View
      style={{
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        source={{ uri: "https://www.nu.edu.pk/Content/images/NU-logo.jpg" }}
        resizeMode="contain"
        style={{ width: 140, height: 90 }}
      />

      <MatIcons name="menu" size={25} />
    </View>
  );
};

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: (props: any) => {
          return <MyHeader {...props} />;
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={CountriesList}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <MatIcons
                name="home"
                size={24}
                color={tabInfo.focused ? "#4ecde6" : "#8e8e93"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <MatIcons
                name="settings"
                size={24}
                color={tabInfo.focused ? "#4ecde6" : "#8e8e93"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <MatIcons
                name="person"
                size={24}
                color={tabInfo.focused ? "#4ecde6" : "#8e8e93"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Context"
        component={ContextTab}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <MatIcons
                name="list"
                size={24}
                color={tabInfo.focused ? "#4ecde6" : "#8e8e93"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Maps"
        component={Maps}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <MatIcons
                name="location-pin"
                size={24}
                color={tabInfo.focused ? "#4ecde6" : "#8e8e93"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
