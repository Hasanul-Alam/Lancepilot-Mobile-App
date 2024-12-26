import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
// import { View } from "react-native-safe-area-context";
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
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const userProfile = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("Select");
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  // Get the current theme from the store
  const theme = useSelector((state: RootState) => state.theme.theme);

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
      <View
        className={`flex-1 py-5 ${
          theme === "dark" ? "bg-[#060b12]" : "bg-transparent"
        }`}
      >
        <GestureHandlerRootView>
          <ScrollView className="mt-6">
            <View className="w-[95%] mx-auto">
              <Text
                className={`text-3xl ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Account Settings
              </Text>
              <Text
                className={`text-gray-600 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Update your account, avater, credentials etc.
              </Text>
            </View>
            <View
              className={`w-full h-[1px] mt-5 ${
                theme === "dark" ? "bg-slate-700" : "bg-slate-300"
              }`}
            ></View>
            <View className="w-[95%] mx-auto">
              <View
                className={`flex-row gap-2 justify-between px-8 mt-5 py-4 rounded-xl items-center ${
                  theme === "dark" ? "bg-[#1a1926]" : "bg-white"
                }`}
              >
                <View className="w-[64px] h-[64px] bg-blue-400 rounded-lg flex-row items-center justify-center overflow-hidden">
                  {/* Need to add a condition here. */}
                  {/* <Text className="w-full text-center text-white text-3xl">HA</Text> */}
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      resizeMode="cover"
                      className="w-full h-full"
                    />
                  ) : (
                    <Text className="text-white font-semibold text-3xl">
                      HA
                    </Text>
                  )}
                </View>
                {/* Change Avatar Button Here */}
                <View className="my-5">
                  <TouchableOpacity
                    className="flex-row items-center gap-2 w-[150px] bg-[#6a30ff] justify-center py-1 rounded-lg"
                    activeOpacity={0.8}
                    onPress={pickImage}
                  >
                    <Feather name="upload" color={"white"} size={13} />
                    <Text className="text-white text-lg">Update Avatar</Text>
                  </TouchableOpacity>
                  <Text
                    className={`text-xs mt-1 text-center ${
                      theme === "dark" ? "text-[#bbb5b5]" : "text-black"
                    }`}
                  >
                    Avatar should be (64 X 64) px
                  </Text>
                </View>
              </View>

              <View>
                <View
                  className={`mt-5 px-3 py-3 rounded-xl ${
                    theme === "dark" ? "bg-[#1a1926]" : "bg-white"
                  }`}
                >
                  <Text
                    className={`ms-1 text-2xl mb-1 ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    Name
                  </Text>
                  <TextInput
                    className="rounded-xl bg-transparent h-[53px] border border-[#b3b5b9] px-4"
                    onChangeText={handleName}
                    placeholder="Enter Your Name"
                    placeholderTextColor={theme === "dark" ? "#fff" : "#000"}
                  />
                  <Text
                    className={`text-sm text-gray-600 ms-1 ${
                      theme === "dark" ? "text-[#bbb5b5]" : "text-black"
                    }`}
                  >
                    Your display name
                  </Text>
                </View>

                <View
                  className={`px-3 py-5  rounded-xl mt-5 ${
                    theme === "dark" ? "bg-[#1a1926]" : "bg-white"
                  }`}
                >
                  <Text
                    className={`text-2xl ms-1 ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    Timezone
                  </Text>
                  <Text
                    className={`text-sm ms-1 mb-1 text-gray-600 ${
                      theme === "dark" ? "text-[#bbb5b5]" : "text-black"
                    }`}
                  >
                    Select your timezone
                  </Text>
                  <View className="h-[53px] rounded-xl overflow-hidden border border-1 border-[#b3b5b9]">
                    <Picker
                      selectedValue={selectedTimezone}
                      onValueChange={(itemValue) =>
                        setSelectedTimezone(itemValue)
                      }
                      style={[
                        styles.picker,
                        {
                          backgroundColor: theme === "dark" ? "#333" : "#fff",
                          color: theme === "dark" ? "#fff" : "#000",
                          borderColor: theme === "dark" ? "#444" : "#b3b5b9",
                        },
                      ]}
                    >
                      {timezones.map((timezone) => (
                        <Picker.Item
                          key={timezone.value}
                          label={timezone.label}
                          value={timezone.value}
                          style={{
                            backgroundColor:
                              theme === "dark" ? "#444" : "#f9f9f9", // Custom background for each item
                            color: theme === "dark" ? "#fff" : "#000", // Item text color
                          }}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View className="mt-10 flex-row justify-center mb-32">
                  <TouchableOpacity
                    className="bg-[#6a30ff] w-[80%] px-1 py-2 flex-row items-center rounded-lg"
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
          </ScrollView>
        </GestureHandlerRootView>
        <Toast />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  picker: {
    height: 50,
    width: "100%",
    paddingVertical: 0,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default userProfile;
