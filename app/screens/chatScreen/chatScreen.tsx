import { View, Text, Touchable, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import { GiftedChat } from "react-native-gifted-chat";

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
    // @ts-ignore
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://i.ibb.co.com/7k0MmzF/gettyimages-1308416574-612x612.jpg",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const chatPerson = messages.length > 0 ? messages[0].user : null;
  return (
    <View style={styles.container}>
      {chatPerson && (
        <Image
          source={{ uri: chatPerson.avatar }}
          style={styles.avatar}
          resizeMode="cover"
        />
      )}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1, // Current user's ID
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default ChatScreen;
