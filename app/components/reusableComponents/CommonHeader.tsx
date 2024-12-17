import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Modal,
  Animated,
} from "react-native";
import { AntDesign, Octicons, MaterialIcons } from "@expo/vector-icons";

export default function CommonHeader() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const gearRotationAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    // Animate rotation
    Animated.timing(rotationAnim, {
      toValue: menuVisible ? 0 : 1, // 0 for down, 1 for up
      duration: 200, // Animation duration
      useNativeDriver: true,
    }).start();
  };

  // Toggle settings and animate gear
  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);

    // Animate gear
    Animated.timing(gearRotationAnim, {
      toValue: settingsVisible ? 0 : 1, // 0 for no rotation, 1 for full rotation
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Interpolate rotation value to degrees
  const rotateArrow = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"], // Rotate from 0 to 180 degrees
  });

  const rotateGear = gearRotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"], // Full rotation (0° to 360°)
  });

  return (
    <View className="w-full mx-auto">
      <View
        className="w-full border-b border-b-[#c5d1c5] rounded-b-2xl bg-[#fff] shadow-b pb-4"
        style={{
          shadowColor: "#000", // Shadow color (iOS)
          shadowOffset: { width: 0, height: 2 }, // Shadow offset (iOS)
          shadowOpacity: 0.25, // Shadow opacity (iOS)
          shadowRadius: 4, // Shadow radius (iOS)
          elevation: 5,
          // Shadow for Android
        }}
      >
        <View className="flex-row w-[90%] mx-auto justify-between items-center mt-16">
          <View className="flex-row items-center gap-2">
            {/* Logo */}
            <View className="w-[30px] h-[30px] rounded-full overflow-hidden">
              <Image
                source={require("../../../assets/images/workspaceLogo.jpg")}
                resizeMode="cover"
                className="w-full h-full"
              />
            </View>
            {/* Workspace Name & Category */}
            <View>
              <Text className="text-xl">Workspace 3</Text>
              <Text className="text-blue-400 -mt-1">Main</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-3">
            <View className="mx-2">
              <AntDesign name="message1" size={15} color={"#00BF63"} />
            </View>
            <TouchableOpacity onPress={toggleSettings} activeOpacity={0.8}>
              <Animated.View style={{ transform: [{ rotate: rotateGear }] }}>
                <Octicons name="gear" size={15} color={"#00BF63"} />
              </Animated.View>
            </TouchableOpacity>
            {/* <View className="">
              <Octicons name="gear" size={15} color={"#00BF63"} />
            </View> */}
            <TouchableOpacity activeOpacity={0.8} onPress={toggleMenu}>
              <Animated.View style={{ transform: [{ rotate: rotateArrow }] }}>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={25}
                  color={"#00BF63"}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal Component */}
      <Modal
        transparent={true}
        visible={menuVisible}
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity
          className="flex-1"
          onPress={toggleMenu} /* Close the menu when clicking outside */
        >
          <View className="absolute right-4 top-20 w-40 bg-white rounded-lg shadow-lg">
            <TouchableOpacity
              className="p-3 border-b border-gray-200"
              onPress={() => {
                toggleMenu();
                alert("Option 1 Selected");
              }}
            >
              <Text className="text-gray-800">Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 border-b border-gray-200"
              onPress={() => {
                toggleMenu();
                alert("Option 2 Selected");
              }}
            >
              <Text className="text-gray-800">Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3"
              onPress={() => {
                toggleMenu();
                alert("Option 3 Selected");
              }}
            >
              <Text className="text-gray-800">Option 3</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal for Settings */}
      <Modal
        transparent={true}
        visible={settingsVisible}
        onRequestClose={toggleSettings}
      >
        <TouchableOpacity
          className="flex-1"
          onPress={toggleSettings} /* Close the menu when clicking outside */
        >
          <View className="absolute right-4 top-20 w-40 bg-white rounded-lg shadow-lg">
            <TouchableOpacity
              className="p-3 border-b border-gray-200"
              onPress={() => {
                toggleSettings();
                alert("Option 1 Selected");
              }}
            >
              <Text className="text-gray-800">Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 border-b border-gray-200"
              onPress={() => {
                toggleSettings();
                alert("Option 2 Selected");
              }}
            >
              <Text className="text-gray-800">Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3"
              onPress={() => {
                toggleSettings();
                alert("Option 3 Selected");
              }}
            >
              <Text className="text-gray-800">Option 3</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
