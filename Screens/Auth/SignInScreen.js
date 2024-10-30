import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  Linking,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spinner } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Eye, EyeOff, LockKeyhole, Mail, PhoneCall } from "lucide-react-native";
import logo from "../../assets/adaptive-icon.png";
import { UiDataProvider } from "../../UiContaxt/UiContaxt";
import { KeyboardAvoidingView, Icon } from "native-base";
import axios from "axios";
import tw from "twrnc";
import { AllTempDataProvider } from "../../UiContaxt/TemplateDataContext";
import { useToast } from "native-base";
import { DataService } from "../../DataFetcherContext/FetchedData";
import { LinearGradient } from "expo-linear-gradient";
import * as Updates from "expo-updates";
export default function SignInScreen() {
  const [pass, setPass] = useState(true);
  const [rem, setRem] = useState("");
  const { isChecked, setIsChecked } = UiDataProvider();
  const { dataUser, setDataUser, setHit, hit } = DataService();
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    SplashDataFetch();
    getUserData();
  }, [HandleSigin]);

  async function onFetchUpdateAsync() {
    try {
      await Updates?.reloadAsync();
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
    }
  }

  const [dataspla, setDataspla] = useState("");

  const SplashDataFetch = async () => {
    const splashDataString = await AsyncStorage.getItem(JSON?.stringify("spl")); // Retrieve the data
    // Declare the variable to hold parsed data

    if (splashDataString) {
      // Check if splashDataString is not null or undefined

      const userData = JSON?.parse(splashDataString);

      setDataspla(userData); // Parse the JSON string
    }
  };

  const getUserData = async () => {
    try {
      const userDataString = await SecureStore.getItemAsync("userData");
      userDataSaved = JSON.parse(userDataString);
      setTimeout(() => {
        setHit(hit + 1);
      }, 1000);
    } catch (error) {
      // console.error("Error parsing JSON:", error.message);
      // Handle the error as needed, e.g., set a default value for userDataSaved
    }
  };

  const Navigation = useNavigation();
  const { setAuth } = DataService();
  const [loading, setLoading] = useState(false);
  const [swich, setSwich] = useState(true);
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

  const [loginData, setLoginData] = useState({
    Mobile: "",
    Email: "",
    Pin: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("remember");
        const userData = JSON.parse(userDataString);
        setRem(userData);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (rem) {
      const mobile = rem.Mobile || "";
      const pin = rem.pin || "";
      setLoginData({
        Mobile: mobile,
      });

      const otpArray = pin.length <= 3 ? ["", "", "", ""] : pin.split("");
      setOtp(otpArray);
    }
  }, [rem]);

  const { color, authLoad, setAuthLoad, HOST, API_KEY } = UiDataProvider();
  const [errorMessages, setErrorMessages] = useState({
    Mobile: "",
    Email: "",
    Pin: "",
  });

  // useEffect(() => {
  //   setLoginData({ Mobile: "", Email: "", Pin: "" });
  // }, [swich]);

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
    return password?.length >= 4;
  };

  const isValidMobile = (mobile) => {
    return mobile?.length === 10;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const HandleSigin = async (loginData, dataUser, otp) => {
    try {
      const { Mobile, Pin, Email } = loginData;

      if (Mobile && !isValidMobile(Mobile)) {
        setErrorMessages((prev) => ({
          ...prev,
          Mobile: "Mobile number should be exactly 10 digits",
        }));
        setLoading(false);
        return;
      }

      if (!isValidPassword(otp.join(""))) {
        setErrorMessages((prev) => ({
          ...prev,
          Pin: "Pin should be 4 digit long",
        }));
        setLoading(false);
        return;
      }
      if (Email && !isValidEmail(Email)) {
        setErrorMessages((prev) => ({
          ...prev,
          Email: "Enter valid Email Id",
        }));
        setLoading(false);
        return;
      }

      setLoading(true);
      axios
        .post(`${HOST}/api/auth/signin`, {
          mobileNumber: `${loginData.Mobile}`,
          pin: `${otp.join("")}`,
        })
        .then((res) => {
          if (res.data?.user) {
            const userDataString = JSON.stringify(res.data);

            SecureStore?.setItemAsync("userData", userDataString);
            if (isChecked === true) {
              const userDataString = JSON.stringify({
                Mobile: loginData?.Mobile,
                pin: otp?.join(""),
              });
              AsyncStorage?.setItem("remember", userDataString);
            }
            setTimeout(() => {
              getUserData();
              setAuth(true);
              setLoading(false);
            }, 2000);
            toast.show({
              position: "bottom",
              duration: 600,
              render: () => {
                return (
                  // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
                  <Text
                    allowFontScaling={false}
                    style={tw`text-gray-500 rounded-lg bg-[${color}] text-white font-semibold text-xs p-2`}
                  >
                    🎉 Login Successfully ! 🎉
                  </Text>
                  // </Box>
                );
              },
            });
          }
          // if (!res.data?.data?.isVerified) {
          //   setLoading(false);
          //   toast.show({
          //     position: "bottom",
          //     duration: 400,
          //     render: () => {
          //       return (
          //         // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
          //         <Text
          //           allowFontScaling={false}
          //           style={tw`text-gray-500 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
          //         >
          //           {res?.data?.message}!
          //         </Text>
          //         // </Box>
          //       );
          //     },
          //   });
          //   Navigation.navigate("Verify-Otp", {
          //     Email: res?.data?.data?.mobileNo,
          //     Type: "Signup",
          //   });
          // }
        })

        .catch((err) => {
          setLoading(false);
          setLoginData({ Mobile: loginData?.Mobile, Email: "", Pin: "" });
          setErrorMessages({ Pin: "" });
          setOtp(["", "", "", ""]);
          toast.show({
            position: "bottom",
            duration: 1000,
            render: () => {
              return (
                // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
                <Text
                  allowFontScaling={false}
                  style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
                >
                  🙄 {err?.response?.data?.message || err.message}
                </Text>
                // </Box>
              );
            },
          });
          if (err?.response?.data?.message === "User not found") {
            Navigation?.navigate("Signup");
          }
        })
        .finally(() => {});
    } catch (error) {
      setLoginData({ Mobile: loginData?.Mobile, Email: "", Pin: "" });
      setOtp(["", "", "", ""]);
      toast.show({
        position: "bottom",
        duration: 1000,
        render: () => {
          return (
            // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
            <Text
              allowFontScaling={false}
              style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
            >
              🙄 {err?.message || "An error occurred"}
            </Text>
            // </Box>
          );
        },
      });
    }
  };

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };
  const dismissKeyboard = () => {
    Keyboard?.dismiss();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        {/* {dataspla?.messge ? ( */}
        <View
          style={tw`flex w-[${Number(
            width
          )}px] mt-20 flex-col  gap-4 justify-center items-center p-4 `}
        >
          <Image
            style={tw`w-[200px] rounded-xl h-[100px]`}
            resizeMode="contain"
            source={logo}
          />

          <View
            style={tw`flex  flex-col gap-6 w-full justify-center items-center`}
          >
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
                Log In Your Account
              </Text>
            </View>
            {/* <View
            style={tw`flex flex-row  p-1 w-1/2 justify-start   items-start gap-3`}
          >
            <TouchableOpacity
              style={
                swich === true
                  ? tw`w-1/2 flex bg-[${color}] rounded-lg flex-row justify-center items-center`
                  : tw`w-1/2 bg-gray-300 rounded-lg flex flex-row justify-center items-center`
              }
              onPress={() => setSwich(true)}
            >
              {swich === true ? (
                <Icon as={<PhoneCall color="#fff" size={15} />} />
              ) : (
                <Icon as={<PhoneCall color="#1675C0" size={15} />} />
              )}
              <Text allowFontScaling={false}
                style={
                  swich === true
                    ? tw` p-2 text-center text-white font-bold rounded-lg text-xs`
                    : tw` p-2 text-center text-gray-700  font-bold rounded-lg text-xs`
                }
              >
                Phone
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                swich === false
                  ? tw`w-1/2 flex bg-[${color}] rounded-lg flex-row justify-center items-center`
                  : tw`w-1/2 bg-gray-300 rounded-lg flex flex-row justify-center items-center`
              }
              onPress={() => setSwich(false)}
            >
              {swich === false ? (
                <Icon as={<Mail color="#fff" size={15} />} />
              ) : (
                <Icon as={<Mail color="#1675C0" size={15} />} />
              )}
              <Text allowFontScaling={false}
                style={
                  swich === false
                    ? tw` p-2 text-center text-white font-bold rounded-lg text-xs`
                    : tw` p-2 text-center text-gray-700  font-bold rounded-lg text-xs`
                }
              >
                Email
              </Text>
            </TouchableOpacity>
          </View> */}

            {swich === true ? (
              <>
                <View
                  style={tw` w-full  flex justify-start flex-col gap-0 items-start `}
                >
                  <View
                    style={tw` w-full text-black flex justify-start flex-row gap-3 items-center rounded-lg bg-gray-200 p-2 h-[60px]`}
                  >
                    <View
                      style={[
                        { width: "15%" },
                        tw`text-black flex justify-start flex-row gap-2 items-center rounded-lg bg-gray-200 p-2 h-[60px]`,
                      ]}
                    >
                      <Text allowFontScaling={false}>🇮🇳</Text>
                      <Text
                        allowFontScaling={false}
                        style={tw`  text-[${color}] `}
                      >
                        +91
                      </Text>
                    </View>

                    <TextInput
                      maxLength={10}
                      keyboardType={`number-pad`}
                      autoComplete={"off"}
                      id="Mobile"
                      value={loginData?.Mobile}
                      placeholder="Enter Mobile No."
                      onChangeText={(e) => handleChange("Mobile", e)}
                      style={[
                        { width: "84%" },
                        tw` bg-gray-200 text-[${color}] rounded-lg p-2 h-[60px]`,
                      ]}
                    />
                  </View>
                  {errorMessages.Mobile !== "" && (
                    <Text
                      allowFontScaling={false}
                      style={tw`text-red-400 left-1 text-[10px]`}
                    >
                      {errorMessages.Mobile}
                    </Text>
                  )}
                </View>
              </>
            ) : (
              <>
                <View
                  style={tw` w-full  flex justify-start flex-col gap-1 items-start `}
                >
                  <View
                    style={tw` w-full text-black flex justify-start flex-row gap-3 items-center rounded-lg bg-gray-200 p-2 h-[60px]`}
                  >
                    <View
                      style={tw` w-[25px] text-black flex justify-start flex-row gap-2 items-center rounded-lg bg-gray-200 p-2 h-[60px]`}
                    >
                      <Icon as={<Mail size={20} />} />
                    </View>

                    <TextInput
                      maxLength={50}
                      keyboardType={`default`}
                      autoComplete={"off"}
                      placeholder="Email Id"
                      onChangeText={(e) => handleChange("Email", e)}
                      style={tw` bg-gray-200 w-3/4 rounded-lg p-2 h-[60px]`}
                    />
                  </View>
                  {errorMessages.Email !== "" && (
                    <Text
                      allowFontScaling={false}
                      style={tw`text-red-400 text-[10px]`}
                    >
                      {errorMessages.Email}
                    </Text>
                  )}
                </View>
              </>
            )}
            <View
              style={tw` w-[${width}px]  bottom-2 p-2  flex justify-center flex-col gap-1 items-center `}
            >
              {/* <View
                style={tw` w-full text-black flex  justify-start flex-row gap-8 items-center rounded-lg bg-gray-200 p-2 h-[60px]`}
              >
                <View
                  style={tw` w-[25px] text-black flex justify-start flex-row gap-2 items-center rounded-lg bg-gray-200 p-2 h-[60px]`}
                >
                  <Icon as={<LockKeyhole size={20} />} />
                </View>

                <TextInput
                  aria-hidden={true}
                  maxLength={6}
                  placeholder="Enter Pin"
                  autoComplete={"off"}
                  keyboardType={`number-pad`}
                  secureTextEntry={pass}
                  onChangeText={(e) => handleChange("Pin", e)}
                  style={tw` bg-gray-200 w-3/5  rounded-lg p-2 h-[60px]`}
                />
                <View
                  style={tw` w-[25px] text-black flex justify-start flex-row gap-2 items-center rounded-lg bg-gray-200 p-2 h-[60px]`}
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
              </View> */}

              <View
                style={tw` w-full text-black flex justify-start flex-row gap-2 items-center rounded-lg bottom-4  p-2 h-[60px]`}
              >
                <Text allowFontScaling={false} style={tw`text-sm left-1`}>
                  Enter Your Pin
                </Text>
                <View
                  style={tw`  text-black flex justify-start flex-row gap-2 items-center rounded-lg  p-2 h-[60px]`}
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
                style={tw`w-full text-black bottom-4 flex justify-center flex-row gap-[${Number(
                  width / 55
                )}] items-center rounded-lg h-[60px]`}
              >
                {otp?.map((digit, index) => (
                  <TextInput
                    key={String(index + 1)}
                    clearButtonMode={`always`}
                    autoComplete="off"
                    secureTextEntry={pass}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(index, value)}
                    keyboardType={`number-pad`}
                    maxLength={1}
                    ref={inputRefs[index]}
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
              <View
                style={[
                  { width: "95%" },
                  tw`flex flex-row   justify-between items-center  `,
                ]}
              >
                <TouchableOpacity
                  onPress={handleCheckboxToggle}
                  style={styles.checkboxContainer}
                >
                  <View
                    style={[styles.checkbox, isChecked ? styles.checked : null]}
                  />
                  <Text allowFontScaling={false} style={styles.label}>
                    Remember Me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => Navigation.navigate("ForgetPassword")}
                  style={tw`flex flex-row gap-1 left-2 justify-center items-center  `}
                >
                  <Text
                    allowFontScaling={false}
                    style={tw`text-gray-700 underline text-[${color}] text-center top-0 text-[14px] font-semibold `}
                  >
                    Forget PIN?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {loading === true ? (
              <TouchableOpacity
                style={tw`flex bg-[${color}] w-full flex-row gap-3 justify-center items-center  rounded-lg p-4 `}
              >
                <Spinner color={`#fff`} size="lg" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPressIn={() => HandleSigin(loginData, HOST, otp)}
                style={tw`flex  justify-center bottom-4 items-center w-full rounded-xl `}
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#00bf63", "#005f33"]}
                  // style={styles.button}
                  style={tw`flex justify-center items-center w-full rounded-lg p-4 `}
                >
                  <Text
                    allowFontScaling={false}
                    style={tw`text-white text-[18px] font-semibold `}
                  >
                    Login Now
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={() => Navigation.navigate("Signup")}
            style={tw`flex flex-row gap-1 justify-center items-center  `}
          >
            <Text
              allowFontScaling={false}
              style={tw`text-gray-900 text-[14px] `}
            >
              Don't have an Account
            </Text>
            <Text
              allowFontScaling={false}
              style={tw`text-gray-700 underline text-[${color}] text-[15px] font-semibold `}
            >
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row gap-1 w-3/4 justify-center items-center  `}
          >
            <Text
              allowFontScaling={false}
              style={tw`text-gray-700 text-center text-[13px] font-semibold `}
            >
              By creating an account you agree to our and{" "}
              <Text
                onPress={() => Navigation?.navigate("terms")}
                allowFontScaling={false}
                style={tw`text-[${color}]  italic text-center text-[13px] font-bold `}
              >
                Terms of Service
              </Text>
              {" and "}
              <Text
                onPress={() => Navigation?.navigate("policys")}
                allowFontScaling={false}
                style={tw`text-[${color}]  italic text-center text-[13px] font-bold `}
              >
                Privacy Policy
              </Text>
              .
            </Text>
          </TouchableOpacity>
        </View>
        {/* ) : (
        <Text>space</Text>
        )} */}
      </TouchableWithoutFeedback>
    </>
  );
}
const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999",
    marginRight: 5,
  },
  checked: {
    backgroundColor: "#0e245c",
  },
  label: {
    fontSize: 16,
  },
});
