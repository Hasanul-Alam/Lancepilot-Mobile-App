import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import {
  Entypo,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";

const ChatScreen = () => {
  // States
  const [messages, setMessages] = useState<Message[]>([]);
  const handleViewProfile = () => {
    console.log("hello from view profile.");
    router.push("/screens/chatProfile/chatProfile");
  };
  const handleBack = () => {
    router.back();
  };

  type Message = {
    _id: number;
    text: string;
    createdAt: Date;
    user: {
      _id: number;
      name: string;
      avatar: string;
    };
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const averageCharWidth = 10;

  const screenWidth = Dimensions.get("window").width;
  const maxLength = Math.floor((screenWidth * 0.9) / averageCharWidth);
  return (
    <>
      <View className="flex-1 py-3">
        <SafeAreaView>
          <View className="w-[95%] mx-auto">
            <View className="flex-row items-center justify-between">
              {/* Chat Header Left */}
              <View className="flex-row items-center gap-3">
                {/* Back Button Icon */}
                <TouchableOpacity onPress={handleBack} activeOpacity={0.8}>
                  <Ionicons name="chevron-back-outline" size={24} />
                </TouchableOpacity>
                {/* Chat Image */}
                <View className="w-[35px] h-[35px] rounded-full overflow-hidden">
                  <Image
                    source={require("../../../assets/images/person.jpeg")}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </View>
                {/* Name and Active Time */}
                <View>
                  <Text className="text-xl font-semibold">Mandesh</Text>
                  <Text className="text-gray-500 -mt-[5px] text-sm">
                    Active 2m ago
                  </Text>
                </View>
              </View>
              {/* Chat Header Right */}
              <View className="flex-row items-center gap-2">
                {/* Time Left */}
                <View>
                  <Text className="text-sm">13:25</Text>
                </View>
                {/* Search */}
                <View>
                  <Ionicons name="search" size={18} />
                </View>
                {/* Three dot menu */}
                <View>
                  <Ionicons name="ellipsis-vertical" size={22} />
                </View>
              </View>
            </View>
          </View>
          {/* Timer Bar */}
          <View className="w-full h-[1px] bg-[#0e8040] mt-2"></View>
        </SafeAreaView>
        <GestureHandlerRootView>
          <View className="w-[85%] mx-auto absolute bottom-5 left-4 right-4 flex-row items-center border rounded-full bg-white border-[#d6d4d4] px-2">
            <View className="flex-row items-center">
              <Entypo name="emoji-happy" size={19} className="mr-2" color={'#484848'} />
              <Fontisto name="paperclip" size={18} className="mr-2" color={'#484848'} />
              <TextInput
                className="flex-1 bg-transparent max-h-16"
                placeholder="Type a message..."
                multiline={true}
                maxLength={200}
              />
              <Entypo name="plus" size={25} className="ml-2" color={'#484848'} />
            </View>
            <View className="ml-4">
              <MaterialCommunityIcons name="microphone-outline" size={22} color={'#484848'} />
            </View>
          </View>
        </GestureHandlerRootView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    marginTop: 0, // Remove any top margin
    paddingTop: 0, // Remove any top padding
  },
});

export default ChatScreen;
