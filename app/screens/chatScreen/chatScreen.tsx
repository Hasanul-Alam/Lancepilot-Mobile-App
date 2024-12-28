import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import {
  Entypo,
  Feather,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";

import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";

const ChatScreen = () => {
  // States
  const [messages, setMessages] = useState<Message[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState(0);
  const [message, setMessage] = useState("");

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleViewProfile = () => {
    console.log("hello from view profile.");
    router.push("/screens/chatProfile/chatProfile");
  };
  const handleBack = () => {
    router.back();
  };

  // Handle Message Text
  const handleMessage = (text: any) => {
    setMessage(text);
  };

  const handleSendMessage = () => {
    console.log(message);
    setMessage("");
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Filter for PDFs only
        copyToCacheDirectory: true,
      });

      // Check if the user selected a document or canceled
      if (result.canceled) {
        console.log("User canceled the picker");
        return;
      }

      // Handle the selected document
      const { name, size, uri } = result.assets[0]; // Access selected document details
      console.log("Selected document:", result.assets[0]);
      Alert.alert(
        "Document Selected",
        `Name: ${name}\nSize: ${size} bytes\nURI: ${uri}`
      );
    } catch (err) {
      console.error("Error picking document:", err);
      Alert.alert("Error", "Something went wrong while picking the document.");
    }
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
                  <TouchableOpacity activeOpacity={0.8} onPress={toggleModal}>
                    <Ionicons name="ellipsis-vertical" size={17} />
                  </TouchableOpacity>
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
              <Entypo
                name="emoji-happy"
                size={19}
                className="mr-2"
                color={"#484848"}
              />
              <TouchableOpacity
                onPress={handlePickDocument}
                activeOpacity={0.8}
              >
                <Fontisto
                  name="paperclip"
                  size={18}
                  className="mr-2"
                  color={"#484848"}
                />
              </TouchableOpacity>
              <TextInput
                value={message}
                onChangeText={handleMessage}
                className="flex-1 bg-transparent max-h-16"
                placeholder="Type a message..."
                multiline={true}
                maxLength={200}
              />
              {message.length > 0 ? (
                <TouchableOpacity
                  onPress={handleSendMessage}
                  activeOpacity={0.8}
                >
                  <Feather
                    name="send"
                    size={22}
                    className="mr-2"
                    color={"#484848"}
                  />
                </TouchableOpacity>
              ) : (
                <Entypo
                  name="plus"
                  size={22}
                  className="mr-2"
                  color={"#484848"}
                />
              )}
            </View>
            <View className="ml-4">
              <MaterialCommunityIcons
                name="microphone-outline"
                size={22}
                color={"#484848"}
              />
            </View>
          </View>
        </GestureHandlerRootView>
      </View>

      {/* Chat 3 dot modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity
          className="flex-1"
          onPress={toggleModal} /* Close the menu when clicking outside */
        >
          <View className="absolute right-4 top-12 w-[50%] bg-white rounded-lg shadow-2xl border border-gray-200">
            <TouchableOpacity>
              <View className="w-full px-3 py-3">
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className=" py-1"
                    onPress={() => {
                      handleViewProfile();
                      toggleModal();
                    }}
                  >
                    <Text className="text-lg">View Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} className="mt-2 py-1">
                    <Text className="text-lg">Set a Lable</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} className="mt-2 py-1">
                    <Text className="text-lg">Pin Contact</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} className="mt-2 py-1">
                    <Text className="text-lg">Tags</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} className="mt-2 py-1">
                    <Text className="text-lg">Groups</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} className="mt-2 py-1">
                    <Text className="text-lg">Contacts</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} className="mt-2 py-1">
                    <Text className="text-lg">Notes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
