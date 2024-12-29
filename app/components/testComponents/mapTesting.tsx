import React, { useEffect, useState } from "react";
import { View, Button, Alert, Modal, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = () => {
  const [isMapVisible, setIsMapVisible] = useState(false); // Controls map visibility
  interface Location {
    latitude: number;
    longitude: number;
  }

  type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  ); // Stores selected location
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null); // Stores current region
  const [loading, setLoading] = useState(true); // Loading state

  const openMap = () => setIsMapVisible(true);
  const closeMap = () => setIsMapVisible(false);

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleShareLocation = () => {
    if (!selectedLocation) {
      Alert.alert("No Location Selected", "Please pick a location on the map.");
      return;
    }

    const { latitude, longitude } = selectedLocation;
    Alert.alert(
      "Location Selected",
      `Latitude: ${latitude}, Longitude: ${longitude}`,
      [{ text: "OK", onPress: closeMap }]
    );
  };

  useEffect(() => {
    // Fetch the user's current location
    const fetchUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location permission is required to use this feature."
          );
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.002, // Smaller delta for a closer zoom
          longitudeDelta: 0.002,
        });
        setLoading(false);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch location.");
        setLoading(false);
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Share Location" onPress={openMap} />

      {selectedLocation && (
        <Text style={styles.locationText}>
          Selected Location:{" "}
          {`Latitude: ${selectedLocation.latitude}, Longitude: ${selectedLocation.longitude}`}
        </Text>
      )}

      {/* Map Modal */}
      <Modal visible={isMapVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {currentRegion ? (
            <MapView
              style={styles.map}
              region={currentRegion} // Set region dynamically
              onPress={handleMapPress}
            >
              {selectedLocation && (
                <Marker
                  coordinate={selectedLocation}
                  title="Selected Location"
                />
              )}
            </MapView>
          ) : (
            <View style={styles.loadingContainer}>
              <Text>Loading Map...</Text>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <Button title="Confirm Location" onPress={handleShareLocation} />
            <Button title="Close Map" onPress={closeMap} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreen;
