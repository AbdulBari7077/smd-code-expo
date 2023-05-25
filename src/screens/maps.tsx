import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const Maps = () => {
  const [initialRegion, setInitialRegion]: any = useState();
  const [pin, setpin]: any = useState();

  useEffect(() => {
    //
    const mapsPermissionFunction = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log(location, "-----------");
      setInitialRegion({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.009,
      });
      setpin({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });
    };
    mapsPermissionFunction();
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion ?
        (
          <MapView
            showsMyLocationButton={true}
            showsUserLocation={true}
            zoomControlEnabled={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={initialRegion}
            style={styles.map}
          >
            <Marker
              coordinate={pin}
              title={"Your current Location"}
              description={"You are here"}
            />
          </MapView>
        ) :
        (
          <ActivityIndicator />
        )
      }
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
