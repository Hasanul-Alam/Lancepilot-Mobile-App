import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { toggleTheme } from "@/app/store/slices/themeSlice";

const SidebarMenu = () => {
  // States
  // const [theme, setIsDarkMode] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  // Trigger the animation
  const toggleSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: theme === "light" ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    dispatch(toggleTheme());
  };

  // Interpolations for animated styles
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#D1D5DB", "#4B5563"], // Light to dark
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 24], // Circle movement
  });

  const handleLogout = () => {
    alert("Logout successfull.");
  };
  return (
    <View className="bg-transparent">
      {/* Profile name and logout button */}
      <View className="flex-row items-center justify-between px-3">
        <View className="flex-row items-center gap-2">
          <View className="w-[35px] h-[35px] rounded-full overflow-hidden">
            <Image
              source={require("../../../assets/images/profile.jpg")}
              resizeMode="cover"
              className="w-full h-full"
            />
          </View>
          <View>
            <View>
              <Text className={`${theme === 'light' ? 'text-black' : 'text-white'} text-xl`}>Hasanul Alam</Text>
              <Text className={`${theme === 'light' ? 'text-black' : 'text-white'} text-sm -mt-2`}>Main</Text>
            </View>
          </View>
        </View>
        {/* <View className="">
          <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={25} color={"red"} />
          </TouchableOpacity>
        </View> */}
      </View>

      {/* Menu Items */}

      <View className="menu-container mt-10">
        {/* Theme Toggler */}
        <View style={styles.container} className="px-3 mt-2">
          {/* Dark Mode Icon and Label */}
          <View className="flex-row items-center gap-3">
            <MaterialIcons
              name={theme === "light" ? "nights-stay" : "wb-sunny"}
              size={24}
              color={theme === "light" ? "#000" : "#fff"} // Dark Gray or Yellow
            />
            <Text className={`${theme === 'light' ? 'text-black' : 'text-white'} text-black text-xl`}>
              {theme === "light" ? "Light Theme" : "Dark Theme"}
            </Text>
          </View>

          {/* Toggle Button */}
          <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
            <Animated.View style={[styles.toggleButton, { backgroundColor }]}>
              <Animated.View
                style={[styles.toggleCircle, { transform: [{ translateX }] }]}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Dashboard */}
        <TouchableOpacity
          className=" mt-4 rounded-lg flex-row items-center py-2 px-3 gap-3"
          onPress={() => alert("Menu Item 1 clicked")}
        >
          <MaterialCommunityIcons name="view-dashboard-outline" size={24} color={theme === 'light' ? 'black' : 'white'} />
          <Text className={`${theme === 'light' ? 'text-black' : 'text-white'} text-black text-xl`}>Dashboard</Text>
        </TouchableOpacity>
        {/* Inbox */}
        <TouchableOpacity
          className=" mt-4 rounded-lg flex-row items-center py-2 px-3 gap-3"
          onPress={() => alert("Menu Item 2 clicked")}
        >
          <EvilIcons name="envelope" size={26} color={theme === 'light' ? 'black' : 'white'}/>
          <Text className={`${theme === 'light' ? 'text-black' : 'text-white'} text-black text-xl`}>Inbox</Text>
        </TouchableOpacity>
        {/* Live Chat */}
        <TouchableOpacity
          className=" mt-4 rounded-lg flex-row items-center py-2 px-3 gap-3"
          onPress={() => alert("Menu Item 3 clicked")}
        >
          <Ionicons name="chatbubbles-outline" size={24} color={theme === 'light' ? 'black' : 'white'}/>
          <Text className={`${theme === 'light' ? 'text-black' : 'text-white'} text-black text-xl`}>Live Chat</Text>
        </TouchableOpacity>
        {/* Profile */}
        <TouchableOpacity
          className=" mt-4 rounded-lg flex-row items-center py-2 px-3 gap-3"
          onPress={() => alert("Menu Item 3 clicked")}
        >
          <MaterialCommunityIcons name="face-man-profile" size={24} color={theme === 'light' ? 'black' : 'white'}/>
          <Text className={`${theme === 'light' ? 'text-black' : 'text-white'} text-black text-xl`}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        className="flex-row items-center gap-3 px-3 absolute top-[650px] w-full"
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        {/* Icon */}
        <MaterialCommunityIcons name="logout" size={25} color={"#ef4444"} />
        <Text className={`${theme === 'light' ? 'text-black' : 'text-white'} text-xl text-red-500`}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151", // Gray 700
    marginLeft: 8,
  },
  labelDark: {
    color: "#D1D5DB", // Gray 300
  },
  toggleButton: {
    width: 48,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default SidebarMenu;
