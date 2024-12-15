// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import {
//   Fontisto,
//   FontAwesome5,
//   Entypo,
//   AntDesign,
//   FontAwesome,
//   Feather,
//   Octicons,
//   EvilIcons,
// } from "@expo/vector-icons";

// export default function ProfileScreen() {
//   return (
//     <View className="flex-1 pb-4 pt-14 bg-white">
//       <ScrollView className="" showsVerticalScrollIndicator={true}>
//         {/* Profile Section */}
//         <View className="w-[90%] mx-auto items-center">
//           {/* Profile Image */}
//           <View className="w-[85px] h-[85px] rounded-full overflow-hidden">
//             <Image
//               source={require("../../assets/images/profile.jpg")}
//               resizeMode="cover"
//               className="w-full h-full"
//             />
//           </View>

//           {/* Profile Name */}
//           <View className="flex-row gap-2 items-center mt-4">
//             <Text className="text-2xl">Hasanul Alam</Text>
//             <Fontisto name="copy" size={13} color="#939393" />
//           </View>

//           {/* Profile Contact */}
//           <View className="flex-row gap-2 items-center mb-3">
//             <Text>+8801797888924</Text>
//             <Fontisto name="copy" size={10} color="#939393" />
//           </View>

//           {/* Balance */}
//           <View className="w-[100px] h-[30px] bg-[#f3f3f5] rounded-lg flex-row gap-1 justify-center items-center">
//             <FontAwesome5 name="coins" size={13} color={"#f59e0b"} />
//             <Text>$0.00015</Text>
//           </View>
//         </View>

//         {/* Horizontal Line */}
//         {/* <View className="bg-black w-full h-[1px] my-10 opacity-30" /> */}

//         {/* Profile Bottom Section */}
//         <View className="w-[90%] mx-auto mt-10">
//           {/* Contact Groups */}
//           <Text>Contact Groups-1</Text>
//           <View className="w-[100px] h-[30px] bg-[#e3e5e9] rounded flex-row items-center justify-evenly mt-4">
//             <Text className="text-black text-center text-lg">Personal</Text>
//             <TouchableOpacity activeOpacity={0.7}>
//               <Entypo name="cross" color="black" size={15} />
//             </TouchableOpacity>
//           </View>

//           {/* Input Field */}
//           <View className="w-full border border-1 border-[#e5e7eb] rounded-lg mt-3">
//             <TextInput
//               placeholder="Write Something"
//               className="px-3 text-white"
//             />
//           </View>

//           {/* Tags Section */}
//           <Text className="mt-6">Tags-0</Text>
//           <View className="items-center justify-center w-full mt-4 rounded-xl mb-3">
//             <FontAwesome name="tags" size={25} color="#333333" />
//             <Text>No Tags Found</Text>
//           </View>
//           {/* Add a tag section */}
//           <View className="border rounded-lg border-[#e5e7eb]">
//             <TextInput placeholder="Add a tag" className="px-3" />
//           </View>
//           {/* Notes */}
//           <View>
//             <Text className="mb-3 mt-4">Notes-1</Text>
//             {/* Notes List */}
//             <View className="border border-1 border-[#e5e7eb] border-1 px-3 py-5 rounded-2xl w-full overflow-auto">
//               <View className=" flex-row items-center">
//                 {/* User Image */}
//                 <View className="w-[40px] h-[40px] rounded-full overflow-hidden">
//                   <Image
//                     source={require("../../assets/images/profile.jpg")}
//                     resizeMode="cover"
//                     className="w-full h-full"
//                   />
//                 </View>
//                 {/* Note Details */}
//                 <View className="ml-3">
//                   <View className="flex-row items-center gap-3 flex-shrink">
//                     {/* Name */}
//                     <Text className="text-lg font-semibold">Hasanul Alam</Text>
//                     {/* Date & Time */}
//                     <Text className="text-gray-500 text-sm">
//                       Dec 09, 4:34pm
//                     </Text>
//                   </View>
//                   {/* Message */}
//                   <View className="w-[95%]">
//                     <Text className="font-thin text-sm leading-4">
//                       Hello Iftekhar sir, how are you? I hope you are doing
//                       well. I have something very exciting for you.
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//               {/* Copy and Edit Icons */}
//               <View className="flex-row justify-between items-center mt-1">
//                 {/* Copy & Edit Icons */}
//                 <View className="mt-3 flex-row items-center gap-2">
//                   <View className="p-2 border border-1 border-[#e5e7eb] rounded-full">
//                     <Feather name="copy" color={"#5c5c8a"} size={12} />
//                   </View>
//                   <View className="p-2 border border-1 border-[#e5e7eb] rounded-full">
//                     <Octicons name="pencil" color={"#5c5c8a"} size={12} />
//                   </View>
//                 </View>
//                 {/* Delete Icon */}
//                 <View className="w-[25px] h-[25px] border border-[#e5e7eb] rounded-full relative mt-2">
//                   <EvilIcons
//                     name="trash"
//                     color={"#5c5c8a"}
//                     size={15}
//                     style={{
//                       position: "absolute",
//                       top: "50%",
//                       left: "50%",
//                       transform: [{ translateX: -7.5 }, { translateY: -7.5 }],
//                     }}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Message Section */}
//         <View className="w-[90%] mx-auto mt-5 border border-1 border-[#e5e7eb] rounded-2xl">
//           <View className="">
//             <TextInput
//               className="w-full px-4 bg-transparent"
//               multiline={true}
//               textAlignVertical="top"
//               placeholder="Write something..."
//             />
//             <View className="flex-row items-center px-4 py-4 justify-end">
//               <TouchableOpacity
//                 className="bg-[#e5e7eb] p-2 rounded-lg"
//                 activeOpacity={0.8}
//               >
//                 <AntDesign className="" name="plus" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
