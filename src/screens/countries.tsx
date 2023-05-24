import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/appcontext";

const CountriesList = ({ navigation }: any) => {


  const [countries, setCountries] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.eatachi.co/api/country")
      .then((response) => {
        return response.json();
      })
      .then((newCountries) => {
        setCountries(newCountries);
      })
      .catch((err) => Alert.alert("Error", err))
      .finally(() => setLoading(false));
  }, []);

  const displayCountry = (itemObject: any) => {
    const { index, item } = itemObject;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Cities", { country: item })}
      >
        <View
          style={{
            backgroundColor: index % 2 === 0 ? "#4ecde6" : "#276773",
            height: 60,
            borderBottomWidth: 2,
            borderBottomColor: "white",
            padding: 8,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item.Name}
          </Text>
          <Text
            style={{
              color: "white",
            }}
          >
            {item.CurrencyName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
            Countries Of the World
          </Text>
          <FlatList data={countries} renderItem={displayCountry} />
        </View>
      )}
    </View>
  );
};

export default CountriesList;
