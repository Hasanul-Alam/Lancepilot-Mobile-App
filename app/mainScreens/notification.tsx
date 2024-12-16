import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SectionListData,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Type definitions for Notification and Section data
interface Notification {
  message: string;
  date: string;
  time: string;
  sender: string;
}

interface SectionData {
  title: string;
  data: Notification[];
}

interface ListData<ItemT, SectionT> {
  title: SectionT;
  data: ItemT[];
}

const NotificationScreen: React.FC = () => {
  const fakeNotificationData: Notification[] = [
    {
      message: "This is the most previous message.",
      date: "14/12/2024",
      time: "16:55",
      sender: "Moumita",
    },
    {
      message: "Hello dear you have an exciting notification.",
      date: "14/12/2024",
      time: "16:58",
      sender: "Susmita",
    },
    {
      message: "Hello dear you have an exciting notification.",
      date: "16/12/2024",
      time: "16:55",
      sender: "Karishma",
    },
    {
      message: "This is the second latest message.",
      date: "16/12/2024",
      time: "18:20",
      sender: "Aparna",
    },
    {
      message: "This is the latest message",
      date: "15/12/2024",
      time: "20:20",
      sender: "Sultana",
    },
  ];

  // Helper function to determine category
  const getCategory = (date: string): string => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const notificationDate = new Date(date.split("/").reverse().join("-"));

    if (notificationDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (notificationDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return "Older";
    }
  };

  // Sorting the notifications by date and time in descending order (latest first)
  const sortedNotifications = fakeNotificationData.sort((a, b) => {
    const dateA = new Date(
      a.date.split("/").reverse().join("-") + "T" + a.time
    );
    const dateB = new Date(
      b.date.split("/").reverse().join("-") + "T" + b.time
    );
    return dateB.getTime() - dateA.getTime();
  });

  // Categorize notifications
  const categorizedData = sortedNotifications.reduce<{
    [key: string]: Notification[];
  }>((acc, item) => {
    const category = getCategory(item.date);
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  // Convert object to array for easier rendering
  const groupedNotifications: SectionData[] = Object.keys(categorizedData).map(
    (key) => ({
      title: key,
      data: categorizedData[key],
    })
  );

  // Render each notification
  const renderItem = ({ item }: { item: Notification }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.sender}>{item.sender}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timestamp}>
        {item.date} at {item.time}
      </Text>
    </View>
  );

  // Render each section header
  const renderSectionHeader = ({
    section: { title },
  }: {
    section: ListData<Notification, string>;
  }) => <Text style={styles.sectionHeader}>{title}</Text>;

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container} className="pt-16">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity activeOpacity={1} onPress={handleBack}>
            <View className="flex-row items-center gap-2">
              <Ionicons name="chevron-back" size={20} />
              <Text className="text-2xl">Notifications</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text className="text-xl text-blue-500">Filter</Text>
          </View>
        </View>
        <SectionList
          sections={groupedNotifications} // Pass grouped notifications
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "93%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  notificationItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sender: {
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
});

export default NotificationScreen;
