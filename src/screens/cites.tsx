import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

const CitiesList = ({ route }: any) => {
  const [cites, setCities] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const { country } = route.params;

    fetch(`https://api.eatachi.co/api/City/ByCountry/${country.CountryId}`)
      .then(response => {
        return response.json();
      })
      .then(newCities => {
        setCities(newCities);
      })
      .catch(err => Alert.alert('Error', err))
      .finally(() => setLoading(false));
  }, []);

  const displayCity = ({ item }: any) => {
    return (
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: "#60d2e9",
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            padding: 8,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: "white",
            }}>
            {item.Name}
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
        <FlatList data={cites} renderItem={displayCity} />
      )}
    </View>
  );
};

export default CitiesList;
