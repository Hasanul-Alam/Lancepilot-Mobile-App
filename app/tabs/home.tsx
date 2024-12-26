import {
  Dimensions,
  ListRenderItemInfo,
  ScrollView,
  Text,
  View,
} from "react-native";
import ProgressBar from "@/app/components/reusableComponents/progressBar";
import {
  EvilIcons,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { LineChart } from "react-native-chart-kit";
import CommonHeader from "../components/reusableComponents/CommonHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

const data = [
  { id: "1", title: "Users", description: "Description for item 1" },
  { id: "2", title: "Sequence", description: "Description for item 2" },
  { id: "3", title: "Templates", description: "Description for item 3" },
  { id: "4", title: "Contacts", description: "Description for item 4" },
  { id: "5", title: "Workspaces", description: "Description for item 5" },
  { id: "6", title: "Campaigns", description: "Description for item 5" },
  { id: "7", title: "Quick Replies", description: "Description for item 5" },
  { id: "8", title: "Message Limit", description: "Description for item 5" },
];

const icons = [
  <Feather name="users" size={18} color="white" className="" />,
  <Octicons name="comment-discussion" size={20} color="white" />,
  <MaterialCommunityIcons
    name="square-rounded-outline"
    size={22}
    color={"white"}
  />,
  <Feather name="users" size={18} color="white" className="" />,
  <Ionicons name="cube-outline" size={23} color={"white"} />,
  <MaterialCommunityIcons name="factory" size={18} color={"white"} />,
  <MaterialCommunityIcons name="reply-outline" size={25} color={"white"} />,
  <MaterialCommunityIcons name="database-outline" size={23} color={"white"} />,
];

const backgroundColors = [
  "#8b5cf6",
  "#14b8a6",
  "#009fff",
  "#8b5cf6",
  "#6a30ff",
  "#f97316",
  "#f59e0b",
  "#6a30ff",
];

export default function HomeScreen() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  type CardItem = {
    id: string;
    title: string;
    description: string;
  };
  const renderItem = ({ item, index }: ListRenderItemInfo<CardItem>) => (
    <View
      key={item.id}
      className={`h-[65px] shadow-lg me-3 rounded-2xl opacity-85 ${
        theme === "dark" ? "bg-[#1a1926]" : "bg-[#000]"
      } `}
      style={{ width: cardWidth }}
    >
      <View className="flex-row justify-between w-[85%] mx-auto my-2">
        <View>
          <Text className="text-xl text-white text-semibold">{item.title}</Text>
          <Text className="text-xl text-white text-semibold">47</Text>
        </View>
        <View
          style={{
            backgroundColor: backgroundColors[index % backgroundColors.length],
          }}
          className={`size-[30] rounded-full flex justify-center items-center ms-2`}
        >
          {icons[index % icons.length]}
        </View>
      </View>
    </View>
  );

  // Fake Data
  const salesData = [
    { month: "Jan", sales: 500 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 700 },
    { month: "Apr", sales: 600 },
    { month: "May", sales: 400 },
    { month: "Jun", sales: 800 },
    { month: "Jul", sales: 700 },
    { month: "Aug", sales: 900 },
    { month: "Sep", sales: 1000 },
  ];

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.42;

  const chartData = {
    labels: salesData.map((data) => data.month), // Extract months
    datasets: [
      {
        data: salesData.map((data) => data.sales), // Extract sales data
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Optional color
        strokeWidth: 2, // Line thickness
      },
    ],
  };

  // Get the current theme from the store
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <View
      className={`flex-1 pb-0 ${
        theme === "dark" ? "bg-[#060b12]" : "bg-[#fff]"
      }`}
    >
      <GestureHandlerRootView className="">
        <CommonHeader />
        <ScrollView
          className=""
          contentContainerStyle={{ paddingBottom: 100 }} // Adjust padding to fit the tab navigation height
          keyboardShouldPersistTaps="handled" // Ensure it works well with input fields
        >
          <View className="mt-7">
            <View
              className={`w-[95%] h-[100px] mx-auto rounded-xl opacity-85 pb-3 ${
                theme === "dark" ? "bg-[#1a1926]" : "bg-[#000]"
              }`}
            >
              <View className="flex flex-row justify-between w-[90%] mx-auto">
                <View>
                  <Text className="text-white text-2xl mt-2 font-bold">
                    Workspace
                  </Text>
                  <Text className="text-white text-lg font-semibold">3/8</Text>
                </View>
                <View className="bg-[#6A30FF] size-[45px] mt-2 rounded-full flex justify-center items-center">
                  <Ionicons name="cube-outline" size={27} color="white" />
                </View>
              </View>
              <View className="w-[90%] mx-auto mt-2">
                <ProgressBar color="bg-[#00BF63]" progress={45} />
              </View>
            </View>
          </View>
          <View className="mt-6">
            <FlatList
              className=""
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10, flexGrow: 0 }}
              scrollEnabled={true}
            />
          </View>

          {/* Chart */}
          <View
            className="pt-10"
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              width: "100%",
              backgroundColor: theme === "dark" ? "#060b12" : "#fff", // Dark mode background
            }}
          >
            <LineChart
              data={chartData}
              width={screenWidth * 1.1} // Adjust to fit screen
              height={220}
              chartConfig={{
                backgroundGradientFrom: theme === "dark" ? "#060b12" : "#fff",
                backgroundGradientTo: theme === "dark" ? "#060b12" : "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) =>
                  theme === "dark"
                    ? `rgba(195, 188, 189, ${opacity})` // Bright line for dark mode
                    : `rgba(34, 202, 236, ${opacity})`,
                labelColor: (opacity = 1) =>
                  theme === "dark"
                    ? `rgba(195, 188, 189, ${opacity})` // White labels for dark mode
                    : `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 0,
                },
                propsForDots: {
                  r: "3",
                  strokeWidth: "0",
                  stroke: theme === "dark" ? "#ffa726" : "#43A047", // Adjust for visibility
                },
              }}
              bezier
              style={{
                marginVertical: 0,
                borderRadius: 2,
              }}
            />
          </View>

          {/* Message Metrics */}
          <View className="w-[95%] mx-auto mt-10">
            <View
              className={`w-full h-auto opacity-85 rounded-xl py-6 ${
                theme === "dark" ? "bg-[#1a1926]" : "bg-[#000]"
              }`}
            >
              <View className="w-[90%] mx-auto">
                <View className="flex-row gap-4 items-center mb-0">
                  <EvilIcons
                    className=""
                    name="envelope"
                    size={35}
                    color="#ffffff"
                  />
                  <Text className="text-white text-xl font-semibold mt-1">
                    Total Message Metrics
                  </Text>
                </View>
                <View className="mt-6">
                  <Text className="text-white text-lg">Sent</Text>
                  <ProgressBar color="bg-[#009fff]" progress={30} />
                </View>
                <View className="mt-6">
                  <Text className="text-white text-lg">Delivered</Text>
                  <ProgressBar color="bg-[#10b981]" progress={45} />
                </View>
                <View className="mt-6">
                  <Text className="text-white text-lg">Read</Text>
                  <ProgressBar color="bg-[#14b8a6]" progress={20} />
                </View>
                <View className="mt-6">
                  <Text className="text-white text-lg">Respond</Text>
                  <ProgressBar color="bg-[#6366f1]" progress={15} />
                </View>
                <View className="mt-6">
                  <Text className="text-white text-lg">Failed</Text>
                  <ProgressBar color="bg-[#f43f5e]" progress={10} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
}

