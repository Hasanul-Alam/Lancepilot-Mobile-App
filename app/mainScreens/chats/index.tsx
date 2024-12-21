import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Chat Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});
