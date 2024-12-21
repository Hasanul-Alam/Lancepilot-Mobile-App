import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { timezones } from "../fakeData/timezoneData";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

const userProfile = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("Select");
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Profile Updated Successfully",
      text2: "This is some something 👋",
    });
  };

  const pickImage = async () => {
    // Launch the image picker without MediaTypeOptions
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1], // Optional: enforce a square aspect ratio
      quality: 1,
    });

    if (!result.canceled) {
      // Validate image dimensions to 64 X 64 pixels
      const { width, height } = result.assets[0];

      if (width > 64 || height > 64) {
        alert(
          "The selected image resolution exceeds 64x64 pixels. Please choose a smaller image."
        );
        return;
      }

      // If valid, proceed
      setImage(result.assets[0].uri);
    }
  };

  const handleName = (text: any) => {
    setName(text);
  };

  const handleSubmission = () => {
    console.log(name, selectedTimezone, image);
    console.log("submitted.");
    showToast();
  };
  return (
    <>
      <SafeAreaView className="flex-1 py-3">
        <GestureHandlerRootView>
          <ScrollView>
            <View className="w-[95%] mx-auto">
              <Text className="text-3xl">Account Settings</Text>
              <Text className="text-gray-600">
                Update your account, avater, credentials etc.
              </Text>
            </View>
            <View className="w-full h-[1px] bg-slate-300 mt-5"></View>
            <View className="w-[95%] mx-auto">
              <View className="w-[64px] h-[64px] bg-blue-400 rounded-lg mt-5 flex-row items-center justify-center overflow-hidden">
                {/* Need to add a condition here. */}
                {/* <Text className="w-full text-center text-white text-3xl">HA</Text> */}
                {image ? (
                  <Image
                    source={{ uri: image }}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                ) : (
                  <Text className="text-white font-semibold text-3xl">HA</Text>
                )}
              </View>
              {/* Change Avatar Button Here */}
              <View className="my-5">
                <TouchableOpacity
                  className="flex-row items-center gap-2 w-[80px] bg-[#6a30ff] justify-center py-1 rounded-lg"
                  activeOpacity={0.8}
                  onPress={pickImage}
                >
                  <Feather name="upload" color={"white"} size={13} />
                  <Text className="text-white text-lg">Avatar</Text>
                </TouchableOpacity>
                <Text className="text-gray-600 text-xs mt-1">
                  The size of the avatar should be (64 X 64) px
                </Text>
              </View>

              <View>
                <Text className="ms-1 text-2xl mb-1">Name</Text>
                <TextInput
                  className=" rounded-xl bg-transparent h-[53px] border border-[#b3b5b9] px-4"
                  onChangeText={handleName}
                  placeholder="Enter Your Name"
                />
                <Text className="text-sm text-gray-600 ms-1">
                  Your display name
                </Text>

                <Text className="text-2xl mt-5 ms-1">Timezone</Text>
                <View>
                  <Text className="text-sm ms-1 mb-1 text-gray-600">
                    Select your timezone
                  </Text>
                  <View className="h-[53px] rounded-xl overflow-hidden border border-1 border-[#b3b5b9]">
                    <Picker
                      selectedValue={selectedTimezone}
                      onValueChange={(itemValue) =>
                        setSelectedTimezone(itemValue)
                      }
                      style={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "transparent",
                        transform: [{ scaleY: 1 }], // Scale the picker vertically
                        fontSize: 12,
                        paddingVertical: 0, // Remove padding to prevent text cutoff
                        borderRadius: 10,
                        color: "black",
                        borderColor: "#b3b5b9",
                      }}
                    >
                      {timezones.map((timezone) => (
                        <Picker.Item
                          key={timezone.value}
                          label={timezone.label}
                          value={timezone.value}
                        />
                      ))}
                    </Picker>
                  </View>
                  <View className="mt-10">
                    <TouchableOpacity
                      className="bg-[#6a30ff] w-[180px] px-1 py-2 flex-row items-center rounded-lg"
                      activeOpacity={0.8}
                      onPress={handleSubmission}
                    >
                      <Text className="w-full text-center text-white text-lg">
                        Update Account Settings
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
        <Toast />
      </SafeAreaView>
    </>
  );
};

export default userProfile;
