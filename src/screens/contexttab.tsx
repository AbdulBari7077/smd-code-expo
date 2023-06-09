import { Button, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../context/appcontext";
import { useContext } from "react";

const ContextTab = () => {
  const { user, counter, updateCounter } = useContext(AppContext);
  const addCounter = () => {
    updateCounter(counter + 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: "bold", fontSize: 25 }}>
        Value of the Counter: {counter}
      </Text>
      <Button title="Add Counter" onPress={addCounter}></Button>
    </View>
  );
};

export default ContextTab;

const styles = StyleSheet.create({});
