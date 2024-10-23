import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Icon, Spinner } from "native-base";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/adaptive-icon.png";
import { UiDataProvider } from "../../UiContaxt/UiContaxt";
import { KeyboardAvoidingView } from "native-base";
import axios from "axios";
import tw from "twrnc";
import { Mail, PhoneCall } from "lucide-react-native";
import { AllTempDataProvider } from "../../UiContaxt/TemplateDataContext";
import { useToast } from "native-base";
import { DataService } from "../../DataFetcherContext/FetchedData";
import { LinearGradient } from "expo-linear-gradient";
export default function ForgetPassword() {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    getUserData();
  }, [HandleForgetPassword]);

  const getUserData = async () => {
    try {
      const userDataString = await SecureStore.getItemAsync("userData");
      userDataSaved = JSON.parse(userDataString);
      setDataUser(userDataSaved);
    } catch (error) {
      // console.error("Error parsing JSON:", error.message);
      // Handle the error as needed, e.g., set a default value for userDataSaved
    }
  };

  const Navigation = useNavigation();
  const { setAuth } = DataService();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    Email: "",
  });
  
  const { color, authLoad, setAuthLoad, HOST, API_KEY } = UiDataProvider();
  const [errorMessages, setErrorMessages] = useState({
    Email: "",
  });
  const toast = useToast();

  const handleChange = (name, value) => {
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessages((prev) => ({
      ...prev,
      [name]: "", // Clear the error message when the user types
    }));
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  //   const isValidMobile = (mobile) => {
  //     return mobile.length === 10;
  //   };

  const HandleForgetPassword = async (loginData, HOST, API_KEY) => {
    try {
      const { Email } = loginData;

      if (Email?.length < 10) {
        setErrorMessages((prev) => ({
          ...prev,
          Email: "Enter valid mobile number",
        }));
        setLoading(false);
        return;
      }

      setLoading(true);
      axios
        .put(
          `https://${String(
            HOST
          )}.execute-api.ap-south-1.amazonaws.com/forgetPass/?API_KEY=${API_KEY}`,
          {
            mobileNo: `${loginData.Email}`,
          }
        )
        .then((res) => {
          if (res?.data?.message) {
            setTimeout(() => {
              setLoading(false);
              Navigation.navigate("Verify-Otp", {
                Email: loginData.Email,
                Type: "Forget",
              });
            }, 1000);
            toast.show({
              position: "bottom",
              duration: 1300,

              render: () => {
                return (
                  // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
                  <Text allowFontScaling={false}
                    style={tw`text-gray-500 rounded-lg bg-[${color}] text-white font-semibold text-xs p-2`}
                  >
                    🎉 {res?.data?.message}! 🎉
                  </Text>
                  // </Box>
                );
                W;
              },
            });
          }
        })
        .catch((err) => {
          if (err?.message) {
            setLoading(false);
            toast.show({
              position: "bottom",
              duration: 1300,
              render: () => {
                return (
                  // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
                  <Text allowFontScaling={false}
                    style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
                  >
                    🙄 {err?.response?.data?.message || err.message}{" "}
                  </Text>
                  // </Box>
                );
              },
            });
          }
        })
        .finally(() => {});
    } catch (error) {
      toast.show({
        position: "bottom",
        duration:900,
        render: () => {
          return (
            // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
            <Text allowFontScaling={false}
              style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
            >
              {error?.message}
            </Text>
            // </Box>
          );
        },
      });
    }
  };

  return (
    <>
      <View
        style={tw`flex mt-16 flex-col  gap-6 justify-center items-center p-4 `}
      >
        {/* <Image style={tw`w-[120px] mt-5 rounded-xl h-[120px]`} source={logo} /> */}
        <View style={tw`flex flex-col  justify-center items-center  `}>
          <Text allowFontScaling={false} style={tw`text-gray-700 text-[15px] font-semibold `}>
            Hey There,
          </Text>
          <Text allowFontScaling={false} style={tw`text-black text-xl font-bold `}>Forget Pin</Text>
        </View>
        <View
          style={tw` w-full  flex justify-start flex-col gap-1 items-start `}
        >
          <View
            style={tw` w-full text-black flex justify-start flex-row gap-3 items-center rounded-lg bg-gray-200 p-2 h-[60px]`}
          >
            <View
              style={tw` w-[25px] text-black flex justify-start flex-row gap-2 items-center rounded-lg bg-gray-200 p-2 h-[60px]`}
            >
              <Icon as={<PhoneCall size={20} />} />
            </View>

            <TextInput
              maxLength={10}
              keyboardType={`number-pad`}
              autoComplete={"off"}
              placeholder="Mobile No"
              onChangeText={(e) => handleChange("Email", e)}
              style={tw` bg-gray-200 w-3/4 rounded-lg p-2 h-[60px]`}
            />
          </View>
          {errorMessages.Email !== "" && (
            <Text allowFontScaling={false} style={tw`text-red-400 left-1 text-[10px]`}>
              {errorMessages.Email}
            </Text>
          )}
        </View>
        {/* <View
          style={tw` w-full text-black flex justify-start flex-row gap-3 items-center rounded-lg bg-gray-200 p-2 h-[60px]`}
        >
          <View
            style={tw` w-[45px] text-black flex justify-start flex-row gap-2 items-center rounded-lg bg-gray-200 p-2 h-[60px]`}
          >
            <Text allowFontScaling={false}>🔒</Text>
            <Text allowFontScaling={false}>Pin</Text>
          </View>

          <TextInput
            maxLength={20}
            placeholder="Enter Your Password"
            onChangeText={(e) => handleChange("Pin", e)}
            style={tw` bg-gray-200  rounded-lg p-2 h-[60px]`}
          />
        </View>
        {errorMessages.Pin !== "" && (
          <Text allowFontScaling={false} style={tw`text-red-400 text-[10px]`}>{errorMessages.Pin}</Text>
        )} */}

        {loading === true ? (
          <TouchableOpacity
            style={tw`flex bg-[${color}] flex-row gap-3 justify-center items-center  rounded-lg p-4 `}
          >
            <Spinner color={`#fff`} size="lg" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPressIn={() => HandleForgetPassword(loginData, HOST, API_KEY)}
            style={tw`flex justify-center items-center w-full rounded-lg `}
          >
            <LinearGradient
              colors={["#00bf63", "#005f33"]}
              style={tw`flex  flex-row gap-3 justify-center items-center w-full rounded-lg p-4 `}
            >
              <Text allowFontScaling={false} style={tw`text-white text-[18px] font-semibold `}>
                Send OTP
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => Navigation.navigate("Signup")}
          style={tw`flex flex-row gap-1 justify-center items-center  `}
        >
          <Text allowFontScaling={false} style={tw`text-gray-900 text-[14px] `}>
            Don't have an Account
          </Text>
          <Text allowFontScaling={false}
            style={tw`text-gray-700 underline text-[${color}] text-[15px] font-semibold `}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
