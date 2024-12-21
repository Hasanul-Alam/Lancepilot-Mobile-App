import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  Linking,
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

  // Handle open url of Whatsapp for livechat
  const handleOpenUrl = () => {
    Linking.openURL(
      "https://api.whatsapp.com/send/?phone=447309574692&text=Hi&type=phone_number&app_absent=0"
    ).catch((err) => console.error("Couldn't load page", err));
  };

  const fakeWorkspaceData = [
    {
      id: 1,
      name: "Workspace 1",
      title: "Main Workspaace",
      note: "For Coffee Business",
    },
    {
      id: 2,
      name: "Workspace 2",
      title: "Client Workspaace",
      note: "For White Leveling",
    },
    {
      id: 3,
      name: "Workspace 3",
      title: "Semi Functional Workspaace",
      note: "For Electronic Business",
    },
  ];

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
          <View className="flex-row items-center gap-1">
            <TouchableOpacity className="mx-2" onPress={handleOpenUrl}>
              <AntDesign name="message1" size={15} color={"#00BF63"} />
            </TouchableOpacity>
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
          <View className="absolute right-4 top-20 w-[90%] bg-white rounded-lg shadow-lg">
            {fakeWorkspaceData.map((workspace) => (
              <TouchableOpacity
                key={workspace.id}
                className="p-3 border-b border-gray-200"
                onPress={() => {
                  toggleMenu();
                  alert("Option 1 Selected");
                }}
              >
                <View className="flex-row items-center justify-between w-full">
                  <Text className="text-gray-800 text-xl">
                    {workspace.name}
                  </Text>
                  <View>
                    <Text className="text-gray-500 text-sm text-right">
                      {workspace.title}
                    </Text>
                    <Text className="text-gray-500 text-sm text-right">
                      {workspace.note}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
