import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Animated,
  TouchableOpacity,
  Text,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fading in and out

  const toggleModal = () => {
    if (!isModalVisible) {
      setModalVisible(true);
      // Fade in both the modal background and the content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300, // Faster fade-in
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out the modal background and content together
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300, // Faster fade-out
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    }
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            ...Platform.select({
              ios: {
                position: "absolute",
              },
            }),
            ...styles.tabBar,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View className="flex justify-center items-center mt-7 h-full">
                <AntDesign
                  size={23}
                  name="appstore-o"
                  color={focused ? "#6366F1" : "#00BF63"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View className="flex justify-center items-center mt-7 h-full">
                <MaterialCommunityIcons
                  name="comment-processing-outline"
                  size={26}
                  color={focused ? "#6366F1" : "#00BF63"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "", // Removes the text under the "+" button
            tabBarIcon: () => (
              <View className="absolute bottom-5 justify-center items-center h-full">
                <TouchableOpacity
                activeOpacity={1}
                  className="w-16 h-16 bg-green-500 rounded-full justify-center items-center shadow-md"
                  onPress={toggleModal}
                >
                  <AntDesign name="plus" size={30} color="white" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View className="flex justify-center items-center mt-7 h-full">
                <Entypo
                  size={23}
                  name="bell"
                  color={focused ? "#6366F1" : "#00BF63"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="burgerMenu"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View className=" justify-center items-center mt-7 h-full">
                <Entypo
                  size={25}
                  name="menu"
                  color={focused ? "#6366F1" : "#00BF63"}
                />
              </View>
            ),
          }}
        />
      </Tabs>

      {/* Popup Modal */}
      {isModalVisible && (
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <Pressable
            className="absolute top-0 left-0 right-0 bottom-0"
            onPress={toggleModal}
          />
          <View className="w-72 p-5 bg-white rounded-xl items-center">
            <Text className="text-lg text-gray-800 mb-5">
              This is the popup window!
            </Text>
            <TouchableOpacity
              className="bg-green-500 py-2 px-6 rounded-lg"
              onPress={toggleModal}
            >
              <Text className="text-white font-bold">Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: "white",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    // Adjusted for a more spread shadow
    shadowColor: "#000",
    shadowOpacity: 0.3,  // Slightly reduced opacity for a more spread-out shadow
    shadowRadius: 20,    // Increased radius for a more spread-out shadow
    shadowOffset: { width: 0, height: 10 },  // Adjusted offset for a wider shadow spread
    elevation: 20,  // Increased elevation for Android
    zIndex: 0,     // Ensures tab bar is on top and visible
    borderTopWidth: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
