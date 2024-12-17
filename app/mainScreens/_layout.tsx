import React, { useState } from "react";
import {
  Alert,
  Animated,
  Modal,
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
  FontAwesome,
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

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

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
            name={
              routeName === selectedTab
                ? "message1"
                : "message1"
            }
            size={23}
            color={routeName === selectedTab ? "#a885ff" : "#00b15e"}
          />
        )}
        {routeName === "title3" && (
          <MaterialCommunityIcons
            name={routeName === selectedTab ? "face-man-profile" : "face-man-profile"}
            size={28}
            color={routeName === selectedTab ? "#a885ff" : "#00b15e"}
          />
        )}
        {routeName === "title4" && (
          <Entypo
            name={routeName === selectedTab ? "menu" : "menu"}
            size={28}
            color={routeName === selectedTab ? "#a885ff" : "#00b15e"}
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
          style={{  }}
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
                <Ionicons name="menu" color="white" size={25} />
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
});
