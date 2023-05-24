import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";

const Maps = () => {
  const [initialRegion, setInitialRegion]: any = useState();
  const [pin, setpin]: any = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    // 
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
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

    })();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {initialRegion && (
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
      )}
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
