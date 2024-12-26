import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

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
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <Text>ChatScreen</Text>
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
