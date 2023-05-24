import { View, TouchableOpacity, Image, StyleSheet, DeviceEventEmitter } from "react-native";
import { useState, useEffect } from "react";
import MatIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  // const navigation = useNavigation();
  const [profilePicture, setProfilePicture]: any = useState();

  useEffect(() => {
    DeviceEventEmitter.addListener('event.pictureupdate', eventData =>
      updatePicture(eventData),
    );
    AsyncStorage.getItem('profilepicture').then(pic => { setProfilePicture(pic) });
    return () => {
      DeviceEventEmitter.removeAllListeners('event.pictureupdate');
    };
  }, []);

  const updatePicture = (newPicture: string) => {
    if (newPicture) {
      setProfilePicture(newPicture);
      AsyncStorage.setItem('profilepicture', newPicture);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => {
          console.log("click");
          navigation.navigate("TakePicture");
        }}
        style={{ padding: 16 }}
      >
        {profilePicture ? (
          <Image
            source={{ uri: "data:image/png;base64," + profilePicture }}
            resizeMode="contain"
            style={{ height: 100, width: 100 }}
          />
        ) : (
          <MatIcons name="account-circle" size={100} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
