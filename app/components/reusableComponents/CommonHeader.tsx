import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  Linking,
  StatusBar,
} from "react-native";
import {
  AntDesign,
  MaterialIcons,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { toggleTheme } from "../../store/slices/themeSlice";

export default function CommonHeader() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const gearRotationAnim = useRef(new Animated.Value(0)).current;

  // Get the current theme from the store
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    // Animate rotation
    Animated.timing(rotationAnim, {
      toValue: menuVisible ? 0 : 1, // 0 for down, 1 for up
      duration: 110, // Animation duration
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
      title: "Internal",
      note: "For Coffee Business",
      connectedNumber: "78365423",
      totalUsers: 278,
      type: "Main",
      image: "https://i.ibb.co.com/7k0MmzF/gettyimages-1308416574-612x612.jpg",
    },
    {
      id: 2,
      name: "Workspace 2",
      title: "Partner",
      note: "For White Leveling",
      connectedNumber: "90745639",
      totalUsers: 246,
      type: "Main",
      image:
        "https://i.ibb.co.com/DtsmqH2/360-F-259623361-Ufbgl-P4u-Hkp-XQjj7-Mv-NJOe-X09y-L0-Zhrt.jpg",
    },
    {
      id: 3,
      name: "Workspace 3",
      title: "Internal",
      note: "For Electronic Business",
      connectedNumber: "45638976",
      totalUsers: 535,
      type: "Main",
      image: "https://i.ibb.co.com/7k0MmzF/gettyimages-1308416574-612x612.jpg",
    },
  ];

  return (
    <View
      className={`w-full mx-auto ${
        theme === "dark" ? "bg-[#060b12]" : "bg-white"
      }`}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"} // Background color for the status bar
      />
      <View
        className={`w-full border ${
          theme === "dark" ? "border-[#15202f]" : "border-[#fff]"
        } rounded-b-2xl shadow-b shadow-[#15202f] pb-4 ${
          theme === "dark" ? "bg-[#060b12]" : "bg-white"
        }`}
        style={{
          shadowColor: "#000", // Shadow color (iOS)
          shadowOffset: { width: 0, height: 2 }, // Shadow offset (iOS)
          shadowOpacity: 0.25, // Shadow opacity (iOS)
          shadowRadius: 4, // Shadow radius (iOS)
          elevation: 5, // Shadow elevation (Android)
        }}
      >
        <View className="flex-row w-[90%] mx-auto justify-between items-center mt-16">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleMenu}
            className="w-[18rem]"
          >
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
                <Text
                  className={`"text-xl" ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Workspace 3
                </Text>
                <Text className="text-blue-400 -mt-1">Main</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View className="flex-row items-center gap-1">
            {/* Toggle Theme */}
            <TouchableOpacity
              onPress={() => dispatch(toggleTheme())}
              activeOpacity={0.8}
            >
              {theme === "dark" ? (
                <Feather name="sun" size={18} color={"#00BF63"} />
              ) : (
                <Feather name="moon" size={18} color={"#00BF63"} />
              )}
            </TouchableOpacity>
            {/* <TouchableOpacity
              className=""
              onPress={toggleSettings}
              activeOpacity={0.8}
            >
              <Octicons name="gear" size={15} color={"#00BF63"} />
            </TouchableOpacity> */}
            <TouchableOpacity className="ms-2 mx-1" onPress={handleOpenUrl}>
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
          <View className="absolute right-4 top-20 w-[90%] bg-white rounded-lg shadow-2xl border border-gray-200">
            {fakeWorkspaceData.map((workspace) => (
              <TouchableOpacity
                key={workspace.id}
                className="p-4 border-b border-gray-200"
                onPress={() => {
                  toggleMenu();
                  alert(`Selected: ${workspace.name}`);
                }}
              >
                <View className="flex-row items-center justify-between w-full">
                  {/* Workspace Details */}
                  <View className="flex-row gap-2 items-center">
                    {/* Workspace Image */}
                    <View className="w-[35px] h-[35px] rounded-lg overflow-hidden">
                      <Image
                        source={require("../../../assets/images/workspaceLogo.jpg")}
                        resizeMode="cover"
                        className="w-full h-full"
                      />
                    </View>
                    {/* Workspace Name & Title */}
                    <View>
                      <Text className="text-gray-800 text-lg font-semibold">
                        {workspace.name}
                      </Text>
                      <View className="flex-row items-center gap-1 bg-red-40">
                        {workspace.title === "Internal" ? (
                          <MaterialIcons name="shield" color={"#00BF63"} />
                        ) : (
                          <MaterialCommunityIcons
                            name="face-agent"
                            color={"#f59e0b"}
                            size={12}
                          />
                        )}

                        <Text
                          className={`${
                            workspace.title === "Internal"
                              ? "text-green-600"
                              : "text-amber-500"
                          } text-sm leading-3 mt-[2px]`}
                        >
                          {workspace.title}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* Additional Info */}
                  <View className="flex items-end space-y-1">
                    <View className="flex-row items-center">
                      <Feather name="users" size={14} color="#0099ff" />
                      <Text className="text-gray-600 text-sm ml-2">
                        {workspace.totalUsers} Users
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <FontAwesome name="whatsapp" size={14} color="#59ce72" />
                      <Text className="text-gray-600 text-sm ml-2">
                        {workspace.connectedNumber}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <View className="p-4">
              <Text className="text-center text-gray-600 text-sm">
                Select a workspace to switch.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal For Settings Popup */}
      <Modal
        transparent={true}
        visible={settingsVisible}
        onRequestClose={toggleSettings}
      >
        <TouchableOpacity
          className="flex-1"
          onPress={toggleSettings} /* Close the menu when clicking outside */
        >
          <View className="absolute right-4 top-20 w-[80%] mx-auto bg-white rounded-lg shadow-2xl border border-gray-200">
            <TouchableOpacity className="mx-5 my-3">
              <Text>Hi</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
