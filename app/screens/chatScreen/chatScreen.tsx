import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Touchable,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { router } from "expo-router";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";

import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as Location from "expo-location";
import * as Contacts from "expo-contacts";
import { Alert } from "react-native";

const ChatScreen = () => {
  // States
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0); // Keeps track of elapsed seconds
  const [isRunning, setIsRunning] = useState(false); // Checks if the timer is active
  const [addPopup, setAddPopup] = useState(false);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [progress] = useState(new Animated.Value(0));
  const rotationAnim = useRef(new Animated.Value(0)).current;

  // Location and contacts state
  const [locationPermission, setLocationPermission] = useState(false);
  const [contactPermission, setContactPermission] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleViewProfile = () => {
    console.log("hello from view profile.");
    router.push("/screens/chatProfile/chatProfile");
  };

  const togglePopup = () => {
    setAddPopup(!addPopup);
    rotateIcon();
  };

  // Rorate icon for plus button
  const rotateIcon = () => {
    // Rotate the icon 90 degrees or back to 0 degrees on every press
    Animated.timing(rotationAnim, {
      toValue: addPopup ? 0 : 1, // 0 for down, 1 for up
      duration: 110, // Animation duration
      useNativeDriver: true,
    }).start();
  };

  const rotatePlusIcon = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"], // Rotate from 0 to 180 degrees
  });

  const startTimer = () => {
    if (isRunning) return; // Prevent starting the timer again if it's already running
    setTimer(0); // Reset timer to 0 when starting
    setIsRunning(true); // Start the timer

    // Animate progress from 0 to 1 over 10 seconds
    Animated.timing(progress, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: false,
    }).start();
  };
  const handleBack = () => {
    router.back();
  };

  // Handle Message Text
  const handleMessage = (text: any) => {
    setMessage(text);
  };

  const handleSendMessage = () => {
    console.log(message);
    setMessage("");
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      Alert.alert("Image Selected", result.assets[0].uri);
    }
  };

  const handleVideoPick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "videos",
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      Alert.alert("Video Selected", result.assets[0].uri);
    }
  };

  const handleDocumentPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if ("type" in result && result.type === "success") {
      const successResult =
        result as DocumentPicker.DocumentPickerSuccessResult;
      Alert.alert("Document Selected");
    }
  };

  const handleLocationPermission = async () => {
    // Request location permission only when button is pressed
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      setLocationPermission(true);
      Alert.alert("Location Permission Granted");
      handleLocation(); // Call the location function after permission is granted
    } else {
      setLocationPermission(false);
      Alert.alert("Location Permission Denied");
    }
  };

  const handleLocation = async () => {
    if (locationPermission) {
      const location = await Location.getCurrentPositionAsync();
      Alert.alert(
        "Location",
        `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`
      );
    } else {
      Alert.alert("Permission Denied", "Location permission is required.");
    }
  };

  // Request permission to access contacts
  const requestContactPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setContactPermission(status === "granted");

    if (status === "granted") {
      loadContacts();
    } else {
      Alert.alert("Permission Denied", "Contacts permission is required.");
    }
  };

  // Load contacts from the device
  const loadContacts = async () => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
    });
    setContacts(data);
  };

  // Handle contact selection
  const handleContactSelect = (contact: Contacts.Contact) => {
    // Share contact with the chat recipient
    sendContactToChat(contact);
    setIsModalVisible(false);
  };

  // Send selected contact to chat
  const sendContactToChat = (contact: Contacts.Contact) => {
    // Assuming you have a chat system where you can send a message
    // Here we're just logging it, but you can integrate with your chat system
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      Alert.alert(
        "Contact Shared",
        `Shared contact: ${contact.name}, Phone: ${contact.phoneNumbers[0].number}`
      );
    } else {
      Alert.alert(
        "Contact Shared",
        `Shared contact: ${contact.name}, Phone: Not available`
      );
    }

    // Example: Send the contact info to the chat recipient (chatRecipient is passed as prop)
    // sendMessageToChat(chatRecipient, contact);
  };

  // const handlePickDocuments = (type: any) => {
  //   const handleImagePick = async () => {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: "images",
  //       allowsEditing: true,
  //       quality: 1,
  //     });
  //     if (!result.canceled) {
  //       Alert.alert("Image Selected", result.assets[0].uri);
  //     }
  //   };
  // };

  const barColor = progress.interpolate({
    inputRange: [0, 0.5, 1], // Map progress values to color
    outputRange: ["#0e8040", "#ffc107", "#f44336"], // Green -> Yellow -> Red
  });

  // useEffect(() => {
  //   const getPermissions = async () => {
  //     // Request location permission
  //     const { status: locationStatus } =
  //       await Location.requestForegroundPermissionsAsync();

  //     setLocationPermission(locationStatus === "granted");

  //     // Request contact permission
  //     const { status: contactStatus } =
  //       await Contacts.requestPermissionsAsync();
  //     setContactPermission(contactStatus === "granted");
  //   };
  //   getPermissions();
  // }, []);

  return (
    <>
      <View className="flex-1 py-3">
        <SafeAreaView>
          <View className="w-[95%] mx-auto">
            <View className="flex-row items-center justify-between">
              {/* Chat Header Left */}
              <View className="flex-row items-center gap-3">
                {/* Back Button Icon */}
                <TouchableOpacity onPress={handleBack} activeOpacity={0.8}>
                  <Ionicons name="chevron-back-outline" size={24} />
                </TouchableOpacity>
                {/* Chat Image */}
                <View className="w-[35px] h-[35px] rounded-full overflow-hidden">
                  <Image
                    source={require("../../../assets/images/person.jpeg")}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </View>
                {/* Name and Active Time */}
                <View>
                  <Text className="text-xl font-semibold">Mandesh</Text>
                  <Text className="text-gray-500 -mt-[5px] text-sm">
                    Active 2m ago
                  </Text>
                </View>
              </View>
              {/* Chat Header Right */}
              <View className="flex-row items-center gap-2">
                {/* Time Left */}
                <View>
                  <Text className="text-sm">
                    {timer === 0 ? "0:00" : timer / 10}
                  </Text>
                </View>
                {/* Search */}
                <View>
                  <Ionicons name="search" size={18} />
                </View>
                {/* Three dot menu */}
                <View>
                  <TouchableOpacity activeOpacity={0.8} onPress={toggleModal}>
                    <Ionicons name="ellipsis-vertical" size={17} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* Timer Bar */}
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"], // Start at 100% width and decrease to 0%
                }),
                backgroundColor: barColor, // Apply the color transition
              },
            ]}
          />
        </SafeAreaView>
        <GestureHandlerRootView>
          <View className="w-[85%] mx-auto absolute bottom-5 left-4 right-4 flex-row items-center border rounded-full bg-white border-[#d6d4d4] px-2">
            <View className="flex-row items-center">
              <Entypo
                name="emoji-happy"
                size={19}
                className="mr-2"
                color={"#484848"}
              />
              <Animated.View
                style={{ transform: [{ rotate: rotatePlusIcon }] }}
              >
                <TouchableOpacity activeOpacity={0.8} onPress={togglePopup}>
                  <Entypo
                    name="plus"
                    size={20}
                    className=""
                    color={"#484848"}
                  />
                </TouchableOpacity>
              </Animated.View>
              <TextInput
                value={message}
                onChangeText={handleMessage}
                className="flex-1 bg-transparent max-h-16"
                placeholder="Type a message..."
                multiline={true}
                maxLength={200}
              />
              <TouchableOpacity
                onPress={() => {
                  handleSendMessage();
                }}
                activeOpacity={0.8}
              >
                <Feather
                  name="send"
                  size={20}
                  className="mr-2"
                  color={message.length === 0 ? "#d6d4d4" : "#484848"}
                  disabled={message.length === 0 ? true : false}
                />
              </TouchableOpacity>
            </View>
            <View className="ml-4">
              <MaterialCommunityIcons
                name="microphone-outline"
                size={22}
                color={"#484848"}
              />
            </View>
          </View>
        </GestureHandlerRootView>
      </View>

      {/* Chat 3 dot modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity
          className="flex-1"
          onPress={toggleModal} /* Close the menu when clicking outside */
        >
          <View className="absolute right-4 top-12 w-[50%] bg-white rounded-lg shadow-2xl border border-gray-200">
            <TouchableOpacity>
              <View className="w-full px-3 py-3">
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className=" py-1"
                    onPress={() => {
                      handleViewProfile();
                      toggleModal();
                    }}
                  >
                    <Text className="text-lg">View Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} className="mt-2 py-1">
                    <Text className="text-lg">Set a Lable</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} className="mt-2 py-1">
                    <Text className="text-lg">Pin Contact</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} className="mt-2 py-1">
                    <Text className="text-lg">Tags</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} className="mt-2 py-1">
                    <Text className="text-lg">Groups</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} className="mt-2 py-1">
                    <Text className="text-lg">Contacts</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} className="mt-2 py-1">
                    <Text className="text-lg">Notes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Plus popup */}
      <Modal transparent={true} visible={addPopup} onRequestClose={togglePopup}>
        <TouchableOpacity
          className="flex-1"
          onPress={togglePopup} /* Close the menu when clicking outside */
        >
          <View className="absolute left-4 bottom-20 w-[90%] bg-white rounded-lg shadow-2xl border border-gray-200">
            <TouchableOpacity>
              <View className="w-full px-3 py-3">
                <View className="flex-row flex-wrap gap-3 grid-flow-col">
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="mt-2 py-1 w-[22%] bg-[#6B8E23] rounded flex-col items-center justify-center"
                    onPress={handleImagePick}
                  >
                    <EvilIcons name="image" size={30} color="white" />
                    <Text className="mt-1 text-sm text-white">Image</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleVideoPick}
                    activeOpacity={0.8}
                    className="mt-2 py-1 w-[22%] bg-[#FFA500] rounded flex-col items-center justify-center"
                  >
                    <Entypo name="video" size={24} color="white" />
                    <Text className="mt-1 text-sm text-white">Video</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDocumentPick}
                    activeOpacity={0.8}
                    className="mt-2 py-1 w-[22%] bg-[#ea80fc] rounded flex-col items-center justify-center"
                  >
                    <Ionicons
                      name="document-text-outline"
                      size={24}
                      color="white"
                    />
                    <Text className="mt-1 text-sm text-white">Document</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleLocationPermission}
                    activeOpacity={0.8}
                    className="mt-2 py-1 w-[22%] bg-[#7f1032] rounded flex-col items-center justify-center"
                  >
                    <EvilIcons name="location" size={24} color="white" />
                    <Text className="mt-1 text-sm text-white">Location</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={requestContactPermission}
                    activeOpacity={0.8}
                    className="mt-2 py-1 w-[22%] bg-[#2979ff] rounded flex-col items-center justify-center"
                  >
                    <AntDesign name="contacts" size={24} color="white" />
                    <Text className="mt-1 text-sm text-white">Contact</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    marginTop: 0, // Remove any top margin
    paddingTop: 0, // Remove any top padding
  },
  progressBar: {
    height: 1,
    marginTop: 15,
  },
});

export default ChatScreen;
