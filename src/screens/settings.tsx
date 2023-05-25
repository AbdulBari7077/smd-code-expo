import { View, Text, TextInput, Button, Switch, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContextProvider, { AppContext } from "../context/appcontext";

const Setting = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [inFinalYear, setInFinalYear] = useState(false);

  const { user, counter, setCounter } = useContext(AppContext);

  useEffect(() => {
    async function updateSettings() {
      const settings: any = JSON.parse(await AsyncStorage.getItem("settings"));
      setFirstName(settings.firstName);
      setLastName(settings.lastName);
      setInFinalYear(settings.inFinalYear);
    }
    updateSettings();
  }, []);
  const saveData = () => {
    Alert.alert("Confirm", "Are you sure you want to save?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          AsyncStorage.setItem(
            "settings",
            JSON.stringify({ firstName, lastName, inFinalYear })
          );
        },
      },
    ]);
  };
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 25 }}>

        Value of counter: {counter}
      </Text>
      <TextInput
        placeholder="Enter first name: "
        value={firstName}
        onChangeText={(newText) => setFirstName(newText)}
      />
      <TextInput
        placeholder="Enter last name: "
        value={lastName}
        onChangeText={(newText) => setLastName(newText)}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>In Final Year</Text>
        <Switch
          value={inFinalYear}
          onChange={() => setInFinalYear(!inFinalYear)}
        />
      </View>
      <Button title="Save" onPress={saveData} />
    </View>
  );
};

export default Setting;
