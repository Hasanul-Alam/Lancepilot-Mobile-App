import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import CommonHeader from "../components/reusableComponents/CommonHeader";

export default function Inbox() {
  const [activeButton, setActiveButton] = useState('buttonAll');

  const handleActiButton = (button: any) => {
    setActiveButton(button);
  };
  return (
    <View className="flex-1 bg-white pb-4 pt-0">
      <ScrollView>
        <CommonHeader />
        <View className="w-[90%] mx-auto ">
          {/* Search Box */}
          <View className="w-full mx-auto flex-row gap-2 items-center px-3 rounded-lg bg-[#e6e6e6]">
            <AntDesign name="search1" className="" size={18} />
            <TextInput
              className="w-full"
              multiline={true}
              placeholder="Search..."
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
                  activeButton === "buttonAll" ? "bg-[#6a30ff]" : "bg-[#f2f2f2]"
                } px-4 py-[5px] rounded border border-[#e6e6e6] mt-5`}
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
                  activeButton === "buttonUnread" ? "bg-[#6a30ff]" : "bg-[#f2f2f2]"
                } px-4 py-[5px] rounded border border-[#e6e6e6] mt-5`}
              >
                <Text
                  className={`${
                    activeButton === "buttonUnread" ? "text-white" : "text-black"
                  }`}
                >
                  Unread
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Messages */}
          <View className="message-container mt-4">
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
                  <Text className="text-lg font-semibold">Iftekhar Ahmed</Text>
                  <Text className="text font-semibold -mt-1">
                    How are you today? I am fine and.....
                  </Text>
                </View>
              </View>
              {/* Message time & Pin option */}
              <View>
                <Text className="text-sm">Today 4:35 pm</Text>
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
            <View className="flex-row gap-3 items-center justify-between mt-4">
              <View className="flex-row items-center gap-3">
                {/* Inbox person image */}
                <View className="w-[50px] h-[50px] rounded-full overflow-hidden bg-[#6d34ff] flex-row items-center justify-center">
                  <Text className="text-white w-full text-center font-thin text-2xl">
                    IA
                  </Text>
                </View>
                {/* Inbox text */}
                <View>
                  <Text className="text-lg font-semibold">Iftekhar Ahmed</Text>
                  <Text className="text-sm -mt-1">
                    How are you today? I am fine and.....
                  </Text>
                </View>
              </View>
              {/* Message time & Pin option */}
              <View>
                <Text className="text-sm">Today 4:35 pm</Text>
                <View className="flex-row justify-end">
                  <SimpleLineIcons name="pin" size={14} color={"#bbbfc4"} />
                </View>
              </View>
            </View>

            {/* Single Message */}
            <View className="flex-row gap-3 items-center justify-between mt-4">
              <View className="flex-row items-center gap-3">
                {/* Inbox person image */}
                <View className="w-[50px] h-[50px] rounded-full overflow-hidden bg-[#f59e0b] flex-row items-center justify-center">
                  <Text className="text-white w-full text-center font-thin text-2xl">
                    HA
                  </Text>
                </View>
                {/* Inbox text */}
                <View>
                  <Text className="text-lg font-semibold">Hasanul Alam</Text>
                  <Text className="text-sm -mt-1">
                    How are you today? I am fine and.....
                  </Text>
                </View>
              </View>
              {/* Message time & Pin option */}
              <View>
                <Text className="text-sm">Today 4:35 pm</Text>
                <View className="flex-row justify-end">
                  <SimpleLineIcons name="pin" size={14} color={"#bbbfc4"} />
                </View>
              </View>
            </View>
            {/* Single Message */}
            <View className="flex-row gap-3 items-center justify-between mt-3">
              <View className="flex-row items-center gap-3">
                {/* Inbox person image */}
                <View className="w-[50px] h-[50px] rounded-full overflow-hidden bg-[#10b981] flex-row items-center justify-center">
                  <Text className="text-white w-full text-center font-thin text-2xl">
                    NM
                  </Text>
                </View>
                {/* Inbox text */}
                <View>
                  <Text className="text-lg font-semibold">Nishat Molla</Text>
                  <Text className="font-semibold -mt-1">
                    How are you today? I am fine and.....
                  </Text>
                </View>
              </View>
              {/* Message time & Pin option */}
              <View>
                <Text className="text-sm">Today 4:35 pm</Text>
                <View className="flex-row justify-end">
                  {/* <SimpleLineIcons name="pin" size={14} color={"#bbbfc4"} /> */}
                  <View className="bg-[#009fff] w-[18px] h-[18px] flex-row items-center rounded-full">
                    <Text className="w-full text-center text-sm text-white font-semibold">
                      9+
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
