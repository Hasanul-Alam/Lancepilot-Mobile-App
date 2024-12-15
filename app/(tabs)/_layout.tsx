import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { AntDesign, MaterialCommunityIcons, Entypo, Feather, EvilIcons, Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function TabLayout() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-width))[0];

  // Sidebar Menu toggler
  const toggleSidebar = () => {
    if (isSidebarVisible) {
      // Close Sidebar
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSidebarVisible(false));
    } else {
      // Open Sidebar
      setSidebarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#4F46E5",
          tabBarInactiveTintColor: "#9CA3AF",
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        {/* Dashboard */}
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View className="flex justify-center items-center">
                <AntDesign
                  size={26}
                  name="appstore-o"
                  color={focused ? "#4F46E5" : "#9CA3AF"}
                />
              </View>
            ),
          }}
        />

        {/* Inbox */}
        <Tabs.Screen
          name="inbox"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View className="flex justify-center items-center">
                <MaterialCommunityIcons
                  name="comment-processing-outline"
                  size={28}
                  color={focused ? "#4F46E5" : "#9CA3AF"}
                />
              </View>
            ),
          }}
        />

        {/* Action Button */}
        <Tabs.Screen
          name="action"
          options={{
            tabBarLabel: "",
            tabBarIcon: () => (
              <View className="absolute -top-10">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="w-16 h-16 bg-green-500 rounded-full justify-center items-center shadow-lg"
                  onPress={() => alert("Action button pressed!")}
                >
                  <AntDesign name="plus" size={32} color="white" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />

        {/* Burger Menu */}
        <Tabs.Screen
          name="burgerMenu"
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="menu"
                size={28}
                color={focused ? "#4F46E5" : "#9CA3AF"}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); // Prevent tab navigation
              toggleSidebar(); // Open/Close the sidebar
            },
          }}
        />
      </Tabs>

      {/* Sidebar Menu */}
      {isSidebarVisible && (
        <Animated.View
          style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
          className="bg-white"
        >
          <View className="mt-10">
            {/* Close Button */}
            <View className="flex-row items-center mt-5 justify-between">
              {/* Logo */}
              <View className="w-[40px] h-[30px] rounded-full overflow-hidden">
                <Image
                  source={require("../../assets/images/logo.png")}
                  resizeMode="cover"
                  className="w-full h-full"
                />
              </View>
              <View className="w-[25px] h-[25px] bg-red-500 rounded-full flex-row items-center justify-center">
                <TouchableOpacity
                  onPress={toggleSidebar} // Close the sidebar
                  className=" w-full"
                >
                  <Text className="text-white font-bold w-full text-center">
                    X
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="mt-7">
                
                <TouchableOpacity
                  className=" mt-4 rounded-lg flex-row items-center py-2 px-3 gap-3"
                  onPress={() => alert("Menu Item 1 clicked")}
                >
                  <View><MaterialCommunityIcons name="view-dashboard-outline" size={20}/></View>
                  <Text className="text-black text-xl">
                    Dashboard
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className=" mt-4 rounded-lg  flex-row items-center py-2 px-3 gap-3"
                  onPress={() => alert("Menu Item 1 clicked")}
                >
                  <View className="-mt-[4px]"><EvilIcons name="envelope" size={25}/></View>
                  <Text className="text-black text-xl">
                    Inbox
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className=" mt-4 rounded-lg flex-row items-center py-2 px-3 gap-3"
                  onPress={() => alert("Menu Item 1 clicked")}
                >
                  <View><Ionicons name="chatbubbles-outline" size={20}/></View>
                  <Text className="text-black text-xl">
                    Live Chat
                  </Text>
                </TouchableOpacity>

              {/* <TouchableOpacity
                className="bg-[#eff4ff] mt-4 rounded-full"
                onPress={() => alert("Menu Item 2 clicked")}
              >
                <Text className="text-black text-base text-center py-2">
                  Menu Item 2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#eff4ff] mt-4 rounded-full"
                onPress={() => alert("Menu Item 3 clicked")}
              >
                <Text className="text-black text-base text-center py-2">
                  Menu Item 3
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    backgroundColor: "#F9FAFB",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: width * 0.7, // Sidebar width should be 75% of the screen
    // backgroundColor: "#fff", // Purple background
    padding: 20,
    zIndex: 10, // Ensure it stays above other content
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
});
