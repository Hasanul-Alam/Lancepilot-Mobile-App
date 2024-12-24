import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ChatScreen = () => {
  const handleViewProfile = () => {
    console.log("hello from view profile.");
    router.push("/screens/chatProfile/chatProfile");
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <View className="absolute top-10 left-0 p-4">
          <TouchableOpacity onPress={handleBack} className="">
            <Ionicons name="chevron-back-outline" size={23} />
          </TouchableOpacity>
        </View>
        <Text>ChatScreen</Text>
        <TouchableOpacity onPress={handleViewProfile}>
          <Text>View Profile</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChatScreen;
