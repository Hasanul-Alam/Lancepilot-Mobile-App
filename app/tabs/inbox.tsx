import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import CommonHeader from "../components/reusableComponents/CommonHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation, useRouter, Link } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Inbox() {
  const [activeButton, setActiveButton] = useState("buttonAll");
  const [searchText, setSearchText] = useState("");
  // Get the current theme from the store
  const theme = useSelector((state: RootState) => state.theme.theme);

  const router = useRouter();
  const navigation = useNavigation();

  const handleActiButton = (button: any) => {
    setActiveButton(button);
  };

  const handleSearch = (text: any) => {
    setSearchText(text);
  };

  const handleMessageDetails = () => {
    // router.push('chats');
    router.push("/screens/chatScreen/chatScreen");
  };

  // Fake Message Data
  const fakeMessageData = [
    {
      name: "Iftekhar Ahmed",
      message:
        "How are you today? What is your plan aobut our nex project? I think you are ready and excited about it.",
      time: "18:35",
      date: "14/12/2024",
      imageUrl: "https://i.ibb.co.com/9WM4Bz6/person.jpg",
      unread: 2,
    },
    {
      name: "Hasanul Alam",
      message:
        "How are you today? What is your plan aobut our nex project? I think you are ready and excited about it.",
      time: "18:35",
      date: "14/12/2024",
      imageUrl: null,
      unread: 0,
    },
    {
      name: "Kalam Chowdhury",
      message:
        "How are you today? What is your plan aobut our nex project? I think you are ready and excited about it.",
      time: "18:35",
      date: "14/12/2024",
      imageUrl: null,
      unread: 12,
    },
  ];
  return (
    <View className={`flex-1 pb-0 ${theme === "dark" ? "bg-[#060b12]" : "bg-white"}`}>
      <GestureHandlerRootView className="">
        <CommonHeader />
        <ScrollView
          className=""
          contentContainerStyle={{ paddingBottom: 100 }} // Adjust padding to fit the tab navigation height
          keyboardShouldPersistTaps="handled" // Ensure it works well with input fields
        >
          <View className="w-[90%] mx-auto mt-7">
            {/* Search Box */}
            <View className={`w-full mx-auto flex-row gap-2 items-center px-3 rounded-lg ${theme === "dark" ? "bg-[#a1a1a1]" : "bg-[#e0e0e0]"}`}>
              <AntDesign name="search1" className="" size={18} color={theme === "dark" ? "#fff" : "#000"}/>
              <TextInput
                className={`w-full ${theme === "dark" ? "text-white" : "text-black"}`}
                multiline={true}
                placeholder="Search..."
                placeholderTextColor={theme === "dark" ? "#fff" : "#000"}
                value={searchText}
                onChangeText={handleSearch}
              />
            </View>
            {/* Filter Buttons */}
            <View className="flex-row gap-3">
              {/* Button for All Messages */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleActiButton("buttonAll")}
              >
                <View
                  className={`${
                    activeButton === "buttonAll"
                      ? "bg-[#6a30ff]"
                      : "bg-[#f2f2f2]"
                  } px-4 py-[5px] rounded mt-5`}
                >
                  <Text
                    className={`${
                      activeButton === "buttonAll" ? "text-white" : "text-black"
                    }`}
                  >
                    All
                  </Text>
                </View>
              </TouchableOpacity>
              {/* Button for Unread Messages */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleActiButton("buttonUnread")}
              >
                <View
                  className={`${
                    activeButton === "buttonUnread"
                      ? "bg-[#6a30ff]"
                      : "bg-[#f2f2f2]"
                  } px-4 py-[5px] rounded mt-5`}
                >
                  <Text
                    className={`${
                      activeButton === "buttonUnread"
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    Unread
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Messages */}
            <View className="message-container mt-4 w-full">
              {fakeMessageData.map((message) => (
                <Pressable key={message.name} onPress={handleMessageDetails}>
                  <View className="flex-row gap-3 items-center justify-between mt-4">
                    <View className="flex-row items-center gap-3">
                      {/* Inbox person image */}
                      <View className="w-[50px] h-[50px] rounded-full overflow-hidden">
                        <Image
                          source={require("../../assets/images/person.jpeg")}
                          resizeMode="cover"
                          className="w-full h-full"
                        />
                      </View>
                      {/* Inbox text */}
                      <View>
                        <Text className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                          {message.name}
                        </Text>
                        <Text className={`text font-semibold -mt-1 ${theme === "dark" ? "text-white" : "text-black"}`}>
                          {message.message.length > 40
                            ? message.message.slice(0, 30) + "...."
                            : message.message}
                        </Text>
                      </View>
                    </View>
                    {/* Message time & Pin option */}
                    <View>
                      <Text className={`text-sm ${theme === "dark" ? "text-white" : "text-black"}`}>Today 4:35 pm</Text>
                      <View className="flex-row justify-end">
                        {/* <SimpleLineIcons name="pin" size={14} color={"#bbbfc4"} /> */}
                        <View className="bg-[#009fff] w-[18px] h-[18px] flex-row items-center rounded-full">
                          <Text className="w-full text-center text-sm text-white font-semibold">
                            2
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
}

/* 
  
*/
