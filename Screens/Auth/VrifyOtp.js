import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import axios from "axios";
import { Spinner, useToast } from "native-base";
import { UiDataProvider } from "../../UiContaxt/UiContaxt";
import { BackHandler } from "react-native";
import { DataService } from "../../DataFetcherContext/FetchedData";
import { LinearGradient } from "expo-linear-gradient";
export default function VerifyOtp() {
  const toast = useToast();
  // useEffect(() => {
  //   const backAction = () => {
  //     // Prevent going back by returning true
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const { color, HOST, API_KEY } = UiDataProvider();
  const { setAuth } = DataService();
  const Navigation = useNavigation();
  const route = useRoute();
  const { Email, Type } = route.params;
  const [load, setLoad] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(180); // Initial timer value in seconds (180 seconds = 3 minutes)
  const [canResend, setCanResend] = useState(false);
  useEffect(() => {
    // Timer function to decrement timer every second
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOTP = () => {
    setTimer(180); // Reset timer back to 3 minutes
    setCanResend(false);
    HandleResendOtp(); // Disable resend button again
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

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

  const HandleResendOtp = () => {
    try {
      axios
        .put(
          `https://${HOST}.execute-api.ap-south-1.amazonaws.com/forgetPass/?API_KEY=${API_KEY}`,
          {
            mobileNo: Email,
          }
        )
        .then((res) => {
          toast?.show({
            position: "bottom",
            duration: 1000,
            render: () => {
              return (
                <Text allowFontScaling={false}
                  style={tw`text-gray-500 rounded-lg bg-[${color}] text-white font-semibold text-xs p-2`}
                >
                  🎉 {res?.data?.message} 🎉
                </Text>
              );
            },
          });
        })
        .catch((err) => {
          toast.show({
            position: "bottom",
            duration: 1500,

            render: () => {
              return (
                <Text allowFontScaling={false}
                  style={tw`text-gray-500 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
                >
                  🙄 {err?.response?.data?.message || err.message}
                </Text>
              );
            },
          });
        });
    } catch (error) {
      toast.show({
        position: "bottom",
        duration: 1500,

        render: () => {
          return (
            <Text allowFontScaling={false}
              style={tw`text-gray-500 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
            >
              🙄 {error?.message || "An error occurred"}
            </Text>
          );
        },
      });
    }
  };

  const HandleVerifyOtp = () => {
    try {
      setLoad(true);
      const sixDigitOtp = otp.join(""); // Convert the array to a string
      axios
        .put(
          `https://${HOST}.execute-api.ap-south-1.amazonaws.com/verifyOtp/?API_KEY=${API_KEY}`,
          {
            mobileNo: Email,
            enteredOtp: sixDigitOtp,
          }
        )
        .then((res) => {
          toast.show({
            position: "bottom",
            duration:900,
            render: () => {
              return (
                <Text allowFontScaling={false}
                  style={tw`text-gray-500 rounded-lg bg-[${color}] text-white font-semibold text-xs p-2`}
                >
                  🎉 {res?.data?.message} 🎉
                </Text>
              );
            },
          });

          if (Type === "Signup") {
            if (res.data?.data?.mobileNo) {
              setLoad(false);

              const userDataString = JSON.stringify(res.data);
              SecureStore.setItemAsync("userData", userDataString);
              setTimeout(() => {
                setAuth(true);
                setLoad(false);
                setOtp(["", "", "", ""]);
              }, 1000);
            }
          } else {
            Navigation.navigate("ForgetPasswordOnly", {
              Email: res.data?.data?.mobileNo,
            });
            setLoad(false);
            setOtp(["", "", "", ""]);
          }
        })
        .catch((err) => {
          setLoad(false);
          setOtp(["", "", "", ""]);
          toast.show({
            position: "bottom",
            duration:900,
            render: () => {
              return (
                <Text allowFontScaling={false}
                  style={tw`text-gray-500 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
                >
                  🙄 {err?.response?.data?.message || err.message}
                </Text>
              );
            },
          });
        });
    } catch (error) {
      setLoad(false);

      toast.show({
        position: "bottom",
        duration:900,
        render: () => {
          return (
            <Text allowFontScaling={false}
              style={tw`text-gray-500 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
            >
              🙄 {error?.message || "An error occurred"}
            </Text>
          );
        },
      });
    }
  };

  const isOtpValid = otp.every((digit) => digit !== "");

  return (
    <View
      style={tw`flex mt-16 flex-col gap-6 justify-center items-center p-4 `}
    >
      <View style={tw`flex flex-col justify-center items-center`}>
        <Text allowFontScaling={false} style={tw`text-gray-700 text-[15px] font-semibold`}>
          Hey there,
        </Text>
        <Text allowFontScaling={false} style={tw`text-black text-xl font-bold`}>Enter 4-digit OTP</Text>
        <View style={tw`flex flex-row justify-center items-center gap-0`}>
          <Text allowFontScaling={false} style={tw`text-gray-800 text-sm font-bold`}>Send to :</Text>
          <Text allowFontScaling={false} style={tw`text-gray-700 text-xs font-bold underline`}>
            {" "}
            {Email}
          </Text>
        </View>
      </View>
      <View
        style={tw`w-full text-black flex justify-center flex-row gap-3 items-center rounded-lg h-[60px]`}
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
            style={tw`bg-gray-200 w-[50px] rounded-xl text-[${color}] text-xl text-center border border-gray-300 rounded-lg p-2 h-[60px]`}
          />
        ))}
      </View>

      <View style={tw`flex flex-row gap-2 justify-center items-center`}>
        {canResend && (
          <TouchableOpacity onPressIn={handleResendOTP}>
            <Text allowFontScaling={false} style={tw`text-[${color}] font-semibold`}>Resend Otp</Text>
          </TouchableOpacity>
        )}
        {!canResend && (
          <Text allowFontScaling={false} style={tw`text-[${color}] text-sm  font-semibold`}>
            Resend otp in : {formatTime(timer)}
          </Text>
        )}
      </View>

      {isOtpValid ? (
        load ? (
          <TouchableOpacity
            style={tw`flex bg-[${color}] justify-center items-center w-full rounded-lg p-4 `}
          >
            <Spinner size={`lg`} color={`#fff`} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={HandleVerifyOtp}
            style={tw`flex  justify-center items-center w-full rounded-lg `}
          >
            <LinearGradient
              style={tw`flex  justify-center items-center w-full rounded-lg p-4 `}
              colors={["#3897F9", "#3897F8"]}
            >
              <Text allowFontScaling={false} style={tw`text-white text-[18px] font-semibold`}>
                Lets Go
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity
          disabled={true}
          // onPress={HandleVerifyOtp}
          style={tw`flex bg-[${color}] justify-center items-center w-full rounded-lg p-4 `}
        >
          <Text allowFontScaling={false} style={tw`text-white text-[18px] font-semibold`}>Lets Go</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
