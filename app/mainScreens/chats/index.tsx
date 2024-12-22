import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const fakeChatData = [
  {
    _id: 1,
    text: "Hello! How are you?",
    createdAt: "2024-12-22T10:00:00Z",
    user: {
      _id: 2,
      name: "Alice",
    },
  },
  {
    _id: 2,
    text: "I'm good, thanks! How about you?",
    createdAt: "2024-12-22T10:01:00Z",
    user: {
      _id: 1,
      name: "You",
    },
  },
  {
    _id: 3,
    text: "I'm great! 😊",
    createdAt: "2024-12-22T10:02:00Z",
    user: {
      _id: 2,
      name: "Alice",
    },
  },
  {
    _id: 4,
    text: "What are you up to today?",
    createdAt: "2024-12-22T10:05:00Z",
    user: {
      _id: 1,
      name: "You",
    },
  },
  {
    _id: 5,
    text: "Just working on some projects. You?",
    createdAt: "2024-12-22T10:06:00Z",
    user: {
      _id: 2,
      name: "Alice",
    },
  },
  {
    _id: 6,
    text: "Same here, catching up with some tasks. 😊",
    createdAt: "2024-12-22T10:08:00Z",
    user: {
      _id: 1,
      name: "You",
    },
  },
  {
    _id: 7,
    text: "Nice! Do you have any plans for the weekend?",
    createdAt: "2024-12-22T10:09:00Z",
    user: {
      _id: 2,
      name: "Alice",
    },
  },
  {
    _id: 8,
    text: "I might go hiking, what about you?",
    createdAt: "2024-12-22T10:12:00Z",
    user: {
      _id: 1,
      name: "You",
    },
  },
  {
    _id: 9,
    text: "That sounds fun! I'm thinking of going to the beach.",
    createdAt: "2024-12-22T10:13:00Z",
    user: {
      _id: 2,
      name: "Alice",
    },
  },
  {
    _id: 10,
    text: "Beach day! Enjoy, I'm sure it'll be awesome! 🏖️",
    createdAt: "2024-12-22T10:15:00Z",
    user: {
      _id: 1,
      name: "You",
    },
  },
  {
    _id: 11,
    text: "Thanks! I'll send you pictures! 📸",
    createdAt: "2024-12-22T10:17:00Z",
    user: {
      _id: 2,
      name: "Alice",
    },
  },
  {
    _id: 12,
    text: "Can't wait to see them! 😄",
    createdAt: "2024-12-22T10:18:00Z",
    user: {
      _id: 1,
      name: "You",
    },
  },
  {
    _id: 13,
    text: "How's the weather over there?",
    createdAt: "2024-12-22T10:20:00Z",
    user: {
      _id: 2,
      name: "Alice",
    },
  },
  {
    _id: 14,
    text: "It's sunny and warm! Perfect for the beach.",
    createdAt: "2024-12-22T10:22:00Z",
    user: {
      _id: 1,
      name: "You",
    },
  },
  {
    _id: 15,
    text: "Sounds like paradise! 😎",
    createdAt: "2024-12-22T10:25:00Z",
    user: {
      _id: 2,
      name: "Alice",
    },
  },
  {
    _id: 16,
    text: "Haha, yeah! Do you want to join me next time?",
    createdAt: "2024-12-22T10:27:00Z",
    user: {
      _id: 1,
      name: "You",
    },
  },
  {
    _id: 17,
    text: "I'd love to! Count me in! 🌊",
    createdAt: "2024-12-22T10:30:00Z",
    user: {
      _id: 2,
      name: "Alice",
    },
  },
  {
    _id: 18,
    text: "Great! We can plan it soon.",
    createdAt: "2024-12-22T10:32:00Z",
    user: {
      _id: 1,
      name: "You",
    },
  },
  {
    _id: 19,
    text: "I’m looking forward to it already! 🤩",
    createdAt: "2024-12-22T10:35:00Z",
    user: {
      _id: 2,
      name: "Alice",
    },
  },
  {
    _id: 20,
    text: "Me too! It's going to be so much fun! 🏖️",
    createdAt: "2024-12-22T10:37:00Z",
    user: {
      _id: 1,
      name: "You",
    },
  },
];


const ChatPage = () => {
  const [messages, setMessages] = useState(fakeChatData);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView | null>(null);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      _id: messages.length + 1,
      text: inputText,
      createdAt: new Date().toISOString(),
      user: {
        _id: 1,
        name: "You",
      },
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");
  };

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Sort messages by time (oldest first)
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <SafeAreaView className="flex-1">
      <GestureHandlerRootView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-gray-100 w-[90%] mx-auto">
              <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false} // Hide scrollbar
                className=" h-[400px]"
                contentContainerStyle={{ flexGrow: 1 }} // Ensures the ScrollView content fills the available space
              >
                {sortedMessages.map((message) => (
                  <View
                    key={message._id}
                    className={`flex-row ${
                      message.user._id === 1 ? "flex-row-reverse" : ""
                    } my-2`}
                  >
                    <View
                      className={`max-w-4/5 p-3 rounded-xl ${
                        message.user._id === 1 ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          message.user._id === 1 ? "text-white" : "text-black"
                        }`}
                      >
                        {message.text}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
      <View className="flex-row items-center px-3 pb-28 mt-5 bg-transparent ">
        <TextInput
          className="flex-1 p-3 rounded-xl border border-gray-300 bg-gray-100"
          placeholder="Type a message"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity
          className="ml-3 bg-blue-600 py-2 px-4 rounded-xl"
          onPress={sendMessage}
        >
          <Text className="text-white font-bold">Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatPage;
