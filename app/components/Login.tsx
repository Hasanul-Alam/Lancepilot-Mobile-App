import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import { useState } from "react";
  import { Feather } from "@expo/vector-icons";
  import { useNavigation, useRouter } from "expo-router";
  
  export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  
    //   Fake username and password for login
    const userName = "iftekhar@lancepilot.com";
    const loginPassword = "lancepilot786";
  
    const router = useRouter();
    const navigation = useNavigation();
  
    //   Handle Login Function
    const handleLogin = () => {

      // Client side validation
      // if (!email || !password) {
      //   alert("Please provide both your email and password.");
      //   return;
      // }
  
      // if (password.length < 6) {
      //   alert("Your password should be at least 6 characters long.");
      //   return;
      // }
  
      // if (email === userName && password === loginPassword) {
      // //   router.push("/dashboard");
      // navigation.navigate('dashboard');
      // } else {
      //   alert("Email or password is invalid.");
      // }
  
      // @ts-ignore
      router.push("/tabs");
    };
  
    //   Handle Password
    const handlePassword = (text: any) => {
      setPassword(text);
    };
  
    //   Handle email
    const handleEmail = (text: any) => {
      setEmail(text);
    };
    return (
      <View className="flex-1 justify-center items-center w-[90%] mx-auto">
        {/* Lancepilot logo */}
        <View style={styles.imageContainer} className="">
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text className="text-3xl mb-5">Please Login</Text>
        {/* Email Input Field */}
        <TextInput
          className="border border-1 border-[#9494b8] w-full py-3 px-3 rounded"
          placeholder="email@lancepilot.com"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={handleEmail}
        />
  
        <View className="border border-1 border-[#9494b8] w-full my-3 px-3 rounded flex-row items-center justify-between">
          {/* Password Input Field */}
          <TextInput
            className="flex-1 h-12 text-base"
            placeholder="***********"
            placeholderTextColor="#b0b0d4"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            onChangeText={handlePassword}
          />
          {/* Show & Hide Password Button */}
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
          >
            <Text className="text-blue-500 ml-3">
              {showPassword ? (
                <Feather name="eye-off" size={18} color="gray" className="" />
              ) : (
                <Feather name="eye" size={18} color="gray" className="" />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-[#00BF63] py-2 mt-2 rounded-lg"
          activeOpacity={0.8}
        >
          <Text className="text-center font-semibold text-lg text-white">
            LOGIN
          </Text>
        </TouchableOpacity>
  
        {/* Devider */}
        <View className="justify-center items-center">
          <View className="flex-row items-center my-5">
            <View className="w-full h-[1px] bg-black opacity-40 flex-1"></View>
            <Text className="mx-1 mb-1 text-lg">or</Text>
            <View className="w-full h-[1px] bg-black opacity-40 flex-1"></View>
          </View>
        </View>
  
        {/* Google Sign-In */}
        <View className="bg-gray-300 w-full rounded-lg">
          <TouchableOpacity
            className="flex-row items-center justify-center py-2"
            activeOpacity={0.5}
          >
            <View className="w-[20px] h-[20px]">
              <Image
                source={require("../../assets/images/google-icon.png")}
                resizeMode="contain"
                className="w-full h-full"
              />
            </View>
            <Text className="text-black mx-3 text-lg">Continue With Google</Text>
          </TouchableOpacity>
        </View>
  
        {/* Terms & Privacy Plicy */}
        <View className="mt-7">
          <Text className="text-gray-500 text-sm text-center">
            By Clicking Continue, you agree to our{" "}
            <Text className="text-black">Terms of Service</Text> and{" "}
            <Text className="text-black">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    redContainer: {
      flex: 1,
    },
    blueContainer: {
      flex: 3,
    },
    imageContainer: {
      width: 50,
      height: 50,
    },
    image: {
      width: "100%",
      height: "100%",
    },
  });
  