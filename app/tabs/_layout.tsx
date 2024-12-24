import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarInactiveTintColor: "#4CAF50", // Green color for active icons
        tabBarActiveTintColor: "#a885ff", // Gray color for inactive icons
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ tabBarLabel: "Home", headerShown: false, tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ), }}
      />
      <Tabs.Screen
        name="inbox"
        options={{ tabBarLabel: "Inbox", headerShown: false, tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-processing-outline" size={size} color={color} />
          ),  }}
      />
      <Tabs.Screen
        name="profile"
        options={{ tabBarLabel: "Profile", headerShown: false, tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face-man-profile" size={size} color={color} />
          ), }}
      />
      <Tabs.Screen
        name="menu"
        options={{ tabBarLabel: "Menu", headerShown: false, tabBarIcon: ({ color, size }) => (
            <Entypo name="menu" size={size} color={color} />
          ), }}
      />
    </Tabs>
  );
}