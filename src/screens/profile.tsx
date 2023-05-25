import { View, TouchableOpacity, Image, StyleSheet, DeviceEventEmitter } from "react-native";
import { useState, useEffect } from "react";
import MatIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';


const Profile = ({ navigation }) => {
  // const navigation = useNavigation();
  const [profilePicture, setProfilePicture]: any = useState();

  useEffect(() => {
    DeviceEventEmitter.addListener('event.pictureupdate', eventData =>
      updatePicture(eventData),
    );
    async function getImageFromAsyncStorage() {
      const fileUri = await AsyncStorage.getItem('profilepicture');
      if (fileUri) {
        const base64 = await FileSystem.readAsStringAsync(fileUri); // Read the base64 string from the file
        setProfilePicture(base64);
      }
    }
    getImageFromAsyncStorage();
    return () => {
      DeviceEventEmitter.removeAllListeners('event.pictureupdate');
    };
  }, []);

  const updatePicture = async (newPictureURI: string) => {
    if (newPictureURI) {
      const base64 = await FileSystem.readAsStringAsync(newPictureURI);
      setProfilePicture(base64);
      await AsyncStorage.setItem('profilepicture', newPictureURI);
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
            style={{ height: 300, width: 300 }}
          />
        ) : (
          <MatIcons name="account-circle" size={100} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
