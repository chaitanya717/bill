import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { useToast } from "native-base";
import { Spinner, NativeBaseProvider, Icon } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { Eye, EyeOff, LockKeyhole, Mail, PhoneCall } from "lucide-react-native";
import logo from "../../assets/adaptive-icon.png";
import { UiDataProvider } from "../../UiContaxt/UiContaxt";
import { KeyboardAvoidingView } from "native-base";
import tw from "twrnc";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

export default function Signup() {
  const Navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [pass, setPass] = useState(true);
  const { color, HOST, API_KEY } = UiDataProvider();
  const { width, height } = Dimensions?.get("window");

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

  const toast = useToast();
  const [signupdata, setSignupData] = useState({
    Name: "",
    Mobile: "",
    Email: "",
    Pin: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    Name: "",
    Email: "",
    Mobile: "",
    Pin: "",
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 4;
  };

  const isValidMobile = (mobile) => {
    return mobile.length === 10;
  };

  const isValidName = (name) => {
    return name.length >= 3;
  };

  const handleChange = (name, value) => {
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessages((prev) => ({
      ...prev,
      [name]: "", // Clear the error message when the user types
    }));
  };

  const HandleSignup = async (signupData, HOST, API_KEY, otp) => {
    try {
      const { Name, Email, Mobile, Pin } = signupData;

      if (!isValidName(Name)) {
        setErrorMessages((prev) => ({
          ...prev,
          Name: "Name should be at least 3 characters long",
        }));
        setLoading(false);
        return;
      }

      if (!isValidMobile(Mobile)) {
        setErrorMessages((prev) => ({
          ...prev,
          Mobile: "Mobile number should be exactly 10 digits",
        }));
        setLoading(false);
        return;
      }

      if (!isValidPassword(otp?.join(""))) {
        setErrorMessages((prev) => ({
          ...prev,
          Pin: "Pin should be 4 digit long",
        }));
        setLoading(false);
        return;
      }
      setLoading(true);
      axios
        .post(`${HOST}/api/auth/signup`, {
          username: `${signupData.Name}`,
          // emailId: `${signupData.Email}`,
          mobileNumber: `${signupData.Mobile}`,
          pin: `${otp?.join("")}`,
        })
        .then((res) => {
        
          if (res.status === 201) {
            setTimeout(() => {
              toast.show({
                position: "bottom",
                duration: 400,
                render: () => {
                  return (
                    // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
                    <Text
                      allowFontScaling={false}
                      style={tw`text-gray-600 rounded-lg bg-[${color}] text-white font-semibold text-xs p-2`}
                    >
                      🎉 {res?.data?.message} 🎉
                    </Text>
                    // </Box>
                  );
                },
              });

              if (res.status === 201) {
                Navigation.navigate("SignIn");
                setErrorMessages({
                  Name: "",
                  Email: "",
                  Mobile: "",
                  Pin: "",
                });
                setOtp(["", "", "", ""]);
                setLoading(false);
              }
            }, 1000);
          }
        })
        .catch((err) => {
          setErrorMessages({
            Name: "",
            Email: "",
            Mobile: "",
            Pin: "",
          });
          setOtp(["", "", "", ""]);
          toast.show({
            position: "bottom",
            duration: 400,
            render: () => {
              return (
                // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
                <Text
                  allowFontScaling={false}
                  style={tw`text-gray-600 rounded-lg bg-red-300 text-white font-semibold text-xs p-2`}
                >
                  ⚠️ {err?.response?.data?.message || err.message}
                </Text>
                // </Box>
              );
            },
          });
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    } catch (error) {
     
      setErrorMessages({
        Name: "",
        Email: "",
        Mobile: "",
        Pin: "",
      });
      setOtp(["", "", "", ""]);
      toast.show({
        position: "bottom",
        duration: 400,
        render: () => {
          return (
            // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
            <Text
              allowFontScaling={false}
              style={tw`text-gray-600 rounded-lg bg-red-300 text-white font-semibold text-xs p-2`}
            >
              ⚠️ {error?.message || "An error occurs"}
            </Text>
            // </Box>
          );
        },
      });
    }
  };

  return (
    <>
      <ScrollView style={{ height: "100%", width: width }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw`flex top-4 w-full h-full mb-10 flex-col gap-6 justify-center items-center p-4 `}
        >
          {/* <Image
            style={tw`w-[200px] top-5 rounded-xl h-[100px]`}
            source={logo}
            resizeMode="contain"
          /> */}
          <View style={tw`flex flex-col  justify-center items-center  `}>
            <Text
              allowFontScaling={false}
              style={tw`text-gray-700 text-[13px] font-semibold `}
            >
              Hey There,
            </Text>
            <Text
              allowFontScaling={false}
              style={tw`text-black text-[18px] font-bold `}
            >
              Create Your Account
            </Text>
          </View>

          <View
            style={tw` w-full  flex justify-start flex-col gap-2 items-start `}
          >
            <Text
              allowFontScaling={false}
              style={` text-[10px] font-bold text-black `}
            >
              Enter Your Name
            </Text>
            <View
              style={tw` w-full text-black flex justify-start flex-row gap-3 items-center rounded-lg bg-gray-200 p-2 h-[50px]`}
            >
              <TextInput
                onChangeText={(e) => handleChange("Name", e)}
                maxLength={40}
                keyboardType={`default`}
                autoComplete="off"
                placeholder="Name"
                style={tw` bg-gray-200 w-3/4 text-sm text-[${color}] rounded-lg p-2 h-[50px]`}
              />
            </View>
            {errorMessages.Name !== "" && (
              <Text
                allowFontScaling={false}
                style={tw`text-red-400 text-[10px]`}
              >
                {errorMessages.Name}
              </Text>
            )}
          </View>

          {/* <View
            style={tw` w-full  flex justify-start flex-col gap-2 items-start `}
          >
            <Text allowFontScaling={false} style={` text-[10px] font-bold text-black `}>
              Enter Your Email
            </Text>
            <View
              style={tw` w-full text-black flex justify-start flex-row gap-3 items-center rounded-lg bg-gray-200 p-2 h-[50px]`}
            >
              <Icon as={<Mail size={20} />} />
              <TextInput
                onChangeText={(e) => handleChange("Email", e)}
                maxLength={40}
                autoComplete="off"
                keyboardType={`email-address`}
                placeholder=""
                style={tw` bg-gray-200 text-sm w-3/4 text-[${color}] rounded-lg p-2 h-[50px]`}
              />
            </View>
            {errorMessages.Email !== "" && (
              <Text allowFontScaling={false} style={tw`text-red-400 text-[10px]`}>
                {errorMessages.Email}
              </Text>
            )}
          </View> */}

          <View
            style={tw` w-full  flex justify-start flex-col gap-2 items-start `}
          >
            <Text
              allowFontScaling={false}
              style={` text-[10px] font-bold text-black `}
            >
              Mobile Number
            </Text>
            <View
              style={tw` w-full text-black flex justify-start flex-row gap-3 items-center rounded-lg bg-gray-200 p-2 h-[50px]`}
            >
              <View
                style={[
                  { width: "15%" },
                  tw` text-black flex justify-start flex-row gap-2 items-center rounded-lg bg-gray-200 p-2 h-[50px]`,
                ]}
              >
                <Text allowFontScaling={false}>🇮🇳</Text>
                <Text allowFontScaling={false} style={tw`text-[${color}]`}>
                  +91
                </Text>
              </View>
              <TextInput
                onChangeText={(e) => handleChange("Mobile", e)}
                maxLength={10}
                keyboardType={`number-pad`}
                autoComplete="off"
                placeholder=""
                style={[
                  { width: "84%" },
                  tw`bg-gray-200 text-sm text-[${color}] rounded-lg p-2 h-[50px]`,
                ]}
              />
            </View>
            {errorMessages.Mobile !== "" && (
              <Text
                allowFontScaling={false}
                style={tw`text-red-400 text-[10px]`}
              >
                {errorMessages.Mobile}
              </Text>
            )}
          </View>

          {/* <View
            style={tw` w-full  flex justify-start flex-col gap-2 items-start `}
          >
            <Text allowFontScaling={false} style={`text-[10px] font-bold text-black `}>Create Pin</Text>
            <View
              style={tw` w-full text-black flex justify-start flex-row gap-3 items-center rounded-lg bg-gray-200 p-2 h-[50px]`}
            >
              <Icon as={<LockKeyhole size={20} />} />
              <TextInput
                onChangeText={(e) => handleChange("Pin", e)}
                maxLength={4}
                autoComplete="off"
                keyboardType={`number-pad`}
                placeholder="Enter Pin"
                style={tw` bg-gray-200 w-3/4 text-sm text-[${color}] rounded-lg p-2 h-[50px]`}
              />
            </View>
            {errorMessages.Pin !== "" && (
              <Text allowFontScaling={false} style={tw`text-red-400 text-[10px]`}>
                {errorMessages.Pin}
              </Text>
            )}
          </View> */}
          <View
            style={tw`  text-black flex justify-start w-full flex-row gap-2 items-center rounded-lg bottom-4  p-2 `}
          >
            <Text allowFontScaling={false} style={tw`text-sm right-1`}>
              Set Your Pin
            </Text>
            <View
              style={tw`  text-black flex justify-start flex-row gap-2 items-center rounded-lg  p-2`}
            >
              {pass === false ? (
                <TouchableOpacity onPressIn={() => setPass(true)}>
                  <Icon as={<Eye size={20} />} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPressIn={() => setPass(false)}>
                  <Icon as={<EyeOff size={20} />} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={tw`w-full text-black bottom-2 flex justify-center flex-col gap-0 items-center rounded-lg h-[60px]`}
          >
            <View
              style={tw`w-full text-black  flex justify-center bottom-6 flex-row gap-[${Number(
                width / 55
              )}]  items-center rounded-lg h-[60px]`}
            >
              {otp?.map((digit, index) => (
                <TextInput
                  key={String(index + 1)}
                  autoComplete="off"
                  secureTextEntry={pass}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  keyboardType={`number-pad`}
                  maxLength={1}
                  onKeyPress={({ nativeEvent }) => {
                    if (
                      nativeEvent.key === "Backspace" &&
                      index > 0 &&
                      !digit
                    ) {
                      inputRefs[index - 1]?.current?.focus();
                      handleOtpChange(index - 1, "");
                    }
                  }}
                  ref={inputRefs[index]}
                  style={tw`bg-gray-200 w-[60px] rounded-xl text-[${color}] text-xl text-center border border-gray-300 p-2 h-[60px]`}
                />
              ))}
            </View>
            {errorMessages.Pin !== "" && (
              <Text
                allowFontScaling={false}
                style={tw`text-red-400 left-1 text-[10px]`}
              >
                {errorMessages.Pin}
              </Text>
            )}
          </View>
          {loading === true ? (
            <TouchableOpacity
              style={tw`flex bg-[${color}] flex-row gap-3 w-full justify-center items-center  rounded-lg p-4 `}
            >
              <Spinner color={`#fff`} size="lg" />
            </TouchableOpacity>
          ) : (
            <Pressable
              onPress={() => HandleSignup(signupdata, HOST, API_KEY, otp)}
              style={tw`flex w-full justify-center bottom-3 items-center  rounded-lg  `}
            >
              <LinearGradient
                style={tw`flex w-full  justify-center items-center  rounded-lg p-4 `}
                colors={["#3897F9", "#3897F8"]}
              >
                <Text
                  allowFontScaling={false}
                  style={tw`text-white text-[18px] font-semibold `}
                >
                  Create Account
                </Text>
              </LinearGradient>
            </Pressable>
          )}
          <TouchableOpacity
            onPress={() => Navigation.navigate("SignIn")}
            style={tw`flex flex-row gap-1 justify-center items-center  `}
          >
            <Text
              allowFontScaling={false}
              style={tw`text-gray-900 text-[14px]  `}
            >
              You have Account
            </Text>
            <Text
              allowFontScaling={false}
              style={tw`text-gray-700 underline text-[${color}] text-[15px] font-semibold `}
            >
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => Navigation.navigate("Signup")}
            style={tw`flex flex-row gap-1 w-3/4 justify-center items-center  `}
          >
            <Text
              allowFontScaling={false}
              style={tw`text-gray-700 text-center text-[13px] font-semibold `}
            >
              By creating an account you agree to our and{" "}
              <Text
                allowFontScaling={false}
                style={tw`text-[${color}]  italic text-center text-[13px] font-bold `}
              >
                Terms of Service
              </Text>
              {" and "}
              <Text
                allowFontScaling={false}
                style={tw`text-[${color}]  italic text-center text-[13px] font-bold `}
              >
                Privacy Policy
              </Text>
              .
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}
