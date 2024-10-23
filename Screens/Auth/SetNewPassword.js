import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Icon, Spinner } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import logo from "../../assets/icon.png";
import { UiDataProvider } from "../../UiContaxt/UiContaxt";
import { KeyboardAvoidingView } from "native-base";
import axios from "axios";
import tw from "twrnc";
import { LockKeyhole } from "lucide-react-native";
import { AllTempDataProvider } from "../../UiContaxt/TemplateDataContext";
import { useToast } from "native-base";
import { DataService } from "../../DataFetcherContext/FetchedData";
import { LinearGradient } from "expo-linear-gradient";
export default function SetNewPassword() {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    getUserData();
  }, [HandleForgetPasswordOnly]);

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
  const route = useRoute();
  const { Email } = route.params;

  const { setAuth } = DataService();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    newPassword: "",
  });
  const { color, authLoad, setAuthLoad, HOST, API_KEY } = UiDataProvider();
  const [errorMessages, setErrorMessages] = useState({
    newPassword: "",
  });
  const toast = useToast();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    // React.createRef(),
    // React.createRef(),
  ];

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) {
      return; // Allow only numeric input
    }

    // Update the OTP array
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move focus to the next input
    if (index < 5 && value !== "") {
      inputRefs[index + 1]?.current?.focus();
    }
  };

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
    return password.length >= 4;
  };
  const HandleForgetPasswordOnly = async (otp, Email, HOST, API_KEY) => {
    try {
      if (!isValidPassword(otp?.join(""))) {
        setErrorMessages((prev) => ({
          ...prev,
          newPassword: "Pin should be 4 characters long",
        }));
        setLoading(false);
        return;
      }
      setLoading(true);
      axios
        .put(
          `https://${String(
            HOST
          )}.execute-api.ap-south-1.amazonaws.com/forgetPassOnly/?API_KEY=${API_KEY}`,
          {
            mobileNo: `${Email}`,
            newPassword: `${otp?.join("")}`,
          }
        )
        .then((res) => {
          setErrorMessages({ newPassword: "" });
          if (res?.data?.message) {
            setTimeout(() => {
              setLoading(false);
              Navigation.navigate("SignIn");
            }, 1000);
            toast.show({
              position: "bottom",
              duration:900,
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
          setErrorMessages({ newPassword: "" });
          setLoading(false);
          toast.show({
            position: "bottom",
            duration:900,
            render: () => {
              return (
                // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
                <Text allowFontScaling={false}
                  style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
                >
                  🙄 Enter Valid Email Id 🙄
                </Text>
                // </Box>
              );
            },
          });
        })
        .finally(() => {});
    } catch (error) {
      setErrorMessages({ newPassword: "" });
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
        <Image style={tw`w-[100px] rounded-xl mt-5 h-[100px]`} source={logo} />
        <View style={tw`flex flex-col  justify-center items-center  `}>
          <Text allowFontScaling={false} style={tw`text-gray-700 text-[15px] font-semibold `}>
            Hey There,
          </Text>
          <Text allowFontScaling={false} style={tw`text-black text-xl font-bold `}>Create New Pin</Text>
        </View>
        <View
          style={tw`w-full text-black flex justify-center flex-row gap-4 items-center rounded-lg h-[60px]`}
        >
          {otp.map((digit, index) => (
            <TextInput
              key={String(index + 1)}
              autoComplete="off"
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
              keyboardType={`number-pad`}
              maxLength={1}
              ref={inputRefs[index]}
              style={tw`bg-gray-200 w-[50px] text-xl text-center border border-gray-300 rounded-lg p-2 h-[60px]`}
            />
          ))}
        </View>
        {errorMessages.newPassword !== "" && (
          <Text allowFontScaling={false} style={tw`text-red-400 text-[10px]`}>
            {errorMessages.newPassword}
          </Text>
        )}
        {loading === true ? (
          <TouchableOpacity
            style={tw`flex bg-[${color}] flex-row gap-3 justify-center items-center  rounded-lg p-4 `}
          >
            <Spinner color={`#fff`} size="lg" />
          </TouchableOpacity>
        ) : (
          <Pressable
            onPress={() => HandleForgetPasswordOnly(otp, Email, HOST, API_KEY)}
            style={tw`flex  flex-row gap-3 justify-center items-center w-full rounded-lg  `}
          >
            <LinearGradient
              style={tw`flex justify-center items-center w-full rounded-lg p-4`}
              colors={["#00bf63", "#005f33"]}
            >
              <Text allowFontScaling={false} style={tw`text-white text-[18px] font-semibold `}>
                Update Pin
              </Text>
            </LinearGradient>
          </Pressable>
        )}
      </View>
    </>
  );
}
