import React, { useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import IndexScreen from "./index";
import Inbox from "./inbox";
import Profile from "./profile";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

// Define types for route names
type RouteName = "title1" | "title2" | "title3" | "title4";

// Props for the tab bar
interface TabBarProps {
  routeName: RouteName;
  selectedTab: RouteName;
  navigate: (name: RouteName) => void;
}

const { width, height } = Dimensions.get("window");

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-width))[0];

  // Sidebar Menu toggler
  const toggleSidebar = () => {
    if (isSidebarVisible) {
      // Close Sidebar
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSidebarVisible(false));
    } else {
      // Open Sidebar
      setSidebarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleTitle4Click = () => {
    // Trigger the popup/modal when title4 is clicked
    setModalVisible(true);
  };

  // Function to render the tab bar
  const renderTabBar = ({ routeName, selectedTab, navigate }: TabBarProps) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {/* Dynamic icon logic */}
        {routeName === "title1" && (
          <Feather
            name={routeName === selectedTab ? "home" : "home"}
            size={23}
            color={routeName === selectedTab ? "#a885ff" : "#00b15e"}
          />
        )}
        {routeName === "title2" && (
          <AntDesign
            name={routeName === selectedTab ? "message1" : "message1"}
            size={23}
            color={routeName === selectedTab ? "#a885ff" : "#00b15e"}
          />
        )}
        {routeName === "title3" && (
          <MaterialCommunityIcons
            name={
              routeName === selectedTab
                ? "face-man-profile"
                : "face-man-profile"
            }
            size={28}
            color={routeName === selectedTab ? "#a885ff" : "#00b15e"}
          />
        )}
        {routeName === "title4" && (
          <Entypo
            name={routeName === selectedTab ? "menu" : "menu"}
            size={28}
            color={routeName === selectedTab ? "#ffffff" : "#ffffff"}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* Curved Bottom Bar Navigator */}
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shadow}
        height={65}
        circleWidth={60}
        bgColor="white"
        initialRouteName="title1"
        borderTopLeftRight
        renderCircle={() => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert("Click Action")}
            >
              <AntDesign name="plus" size={32} color="#1a9e4b" />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="title1"
          position="LEFT"
          component={IndexScreen}
          options={{ headerShown: false }}
        />
        <CurvedBottomBarExpo.Screen
          name="title2"
          position="LEFT"
          component={Inbox}
          options={{ headerShown: false }}
        />
        <CurvedBottomBarExpo.Screen
          name="title3"
          position="RIGHT"
          component={Profile}
          options={{ headerShown: false }}
          style={{}}
        />
        {/* Action Button with Burger Icon (title4) */}
        <CurvedBottomBarExpo.Screen
          name="title4"
          position="RIGHT"
          component={() => null} // No content for this screen, only the button
          options={{
            headerShown: false,
            tabBarIcon: () => <Ionicons name="menu" color="gray" size={30} />,
            tabBarButton: () => (
              <TouchableOpacity
                onPress={handleTitle4Click} // Handle click to show popup
              >
                <Ionicons name="menu" color="#000000" size={25} />
              </TouchableOpacity>
            ),
          }}
        />
      </CurvedBottomBarExpo.Navigator>

      {/* Popup Modal outside the Navigator */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Ionicons
              name="close"
              size={30}
              color="black"
              onPress={() => setModalVisible(false)}
            />
            <Text>Popup Content</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={toggleSidebar}
        className="absolute bottom-0 left-[20rem] py-5 px-8"
      >
        <Entypo name="menu" size={28} color="green" />
      </TouchableOpacity>
      {/* <View className="absolute bottom-0 left-[20rem] p-5">
        <TouchableOpacity onPress={toggleSidebar}>
          <Entypo name="menu" size={28} color="green" />
        </TouchableOpacity>
      </View> */}

      {/* Sidebar Menu */}
      {isSidebarVisible && (
        <>
          {/* Semi-transparent overlay to simulate blur and capture outside taps */}
          <Pressable
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
              zIndex: 9, // Ensures it's above everything else but below the sidebar
            }}
            onPress={toggleSidebar} // Close sidebar when tapping outside
          ></Pressable>

          {/* Sidebar Menu */}
          <Animated.View
            style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
            className="bg-white"
          >
            <View className="mt-10">
              {/* Close Button */}
              <View className="flex-row items-center mt-5 justify-between">
                {/* Logo */}
                <View className="w-[40px] h-[30px] rounded-full overflow-hidden">
                  <Image
                    source={require("../../assets/images/logo.png")}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </View>
                <View className="w-[25px] h-[25px] bg-red-500 rounded-full flex-row items-center justify-center">
                  <TouchableOpacity
                    onPress={toggleSidebar} // Close the sidebar
                    className=" w-full"
                  >
                    <Text className="text-white font-bold w-full text-center">
                      X
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Sidebar Items */}
              <View className="mt-7">
                <TouchableOpacity
                  className=" mt-4 rounded-lg flex-row items-center py-2 px-3 gap-3"
                  onPress={() => alert("Menu Item 1 clicked")}
                >
                  <MaterialCommunityIcons
                    name="view-dashboard-outline"
                    size={20}
                  />
                  <Text className="text-black text-xl">Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className=" mt-4 rounded-lg flex-row items-center py-2 px-3 gap-3"
                  onPress={() => alert("Menu Item 2 clicked")}
                >
                  <EvilIcons name="envelope" size={25} />
                  <Text className="text-black text-xl">Inbox</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className=" mt-4 rounded-lg flex-row items-center py-2 px-3 gap-3"
                  onPress={() => alert("Menu Item 3 clicked")}
                >
                  <Ionicons name="chatbubbles-outline" size={20} />
                  <Text className="text-black text-xl">Live Chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shadow: {
    shadowColor: "#000000", // Black shadow color
    shadowOffset: {
      width: 15, // Horizontal offset
      height: 20, // Vertical offset (increased for a more pronounced shadow)
    },
    shadowOpacity: 0.3, // Increased opacity for a stronger shadow
    shadowRadius: 10, // Increased radius for a blurrier, more pronounced shadow
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  bottomBar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 0,
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 250,
    height: 150,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screen1: {
    flex: 1,
    backgroundColor: "#BFEFFF",
  },
  screen2: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: width * 0.7, // Sidebar width should be 75% of the screen
    // backgroundColor: "#fff", // Purple background
    padding: 20,
    zIndex: 10, // Ensure it stays above other content
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
});
