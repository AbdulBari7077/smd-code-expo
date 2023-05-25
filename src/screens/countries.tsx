import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FirebaseNotificationInit from "../components/FireBaseNotification";

const CountriesList = ({ navigation }: any) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://api.eatachi.co/api/country")
      .then((response) => {
        return response.json();
      })
      .then((newCountries) => {
        setCountries(newCountries);
        setFilteredCountries(newCountries);
      })
      .catch((err) => Alert.alert("Error", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filteredCountries = countries.filter((country: any) =>
      country.Name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
  };

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
    <>
      {/* <FirebaseNotificationInit navigation={navigation} /> */}
      <View style={{ flex: 1, justifyContent: "center" }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ flex: 1 }}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              Countries Of the World
            </Text>
            <TextInput
              placeholder="Search Country"
              style={{
                padding: 15,
                borderColor: "gray",
                borderWidth: 1,
                margin: 5,
                borderRadius: 15,
              }}
              value={searchQuery}
              onChangeText={(newText)=>handleSearch(newText)}
            />
            <FlatList data={filteredCountries} renderItem={displayCountry} />
          </View>
        )}
      </View>
    </>
  );
};

export default CountriesList;
