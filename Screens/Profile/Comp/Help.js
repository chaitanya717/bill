import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { PhoneCall, Mail, PhoneForwarded } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { UiDataProvider } from "../../../UiContaxt/UiContaxt";
import * as SecureStore from "expo-secure-store";
import { DataService } from "../../../DataFetcherContext/FetchedData";
import { Icon, Spinner, useToast } from "native-base";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import support from "../../../assets/tamp.webp";
import { Image, ImageBackground } from "expo-image";
import whatsapp from "../../../assets/whatsappl.png";
import Gmail from "../../../assets/gmail.png";
import call from "../../../assets/call.png";
const Help = () => {
  const { userData, setAuth } = DataService();
  const email = userData?.data?.mobileNo;

  const { color, HOST, API_KEY } = UiDataProvider();
  const toast = useToast();
  const [load, setLoad] = useState(false);
  const [basic, setBasic] = useState({
    oldpass: "",
    newpass: "",
    conpass: "",
  });

  const handleInputChange = (name, text) => {
    setBasic((prev) => ({
      ...prev,
      [name]: text,
    }));
  };

  const ChangePasswordHandle = (email) => {
    setLoad(true);
    try {
      // Validation for minimum password length
      if (basic.oldpass.length < 4 || basic.newpass.length < 4) {
        toast.show({
          position: "bottom",
          duration: 800,
          render: () => {
            return (
              <Text
                allowFontScaling={false}
                style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
              >
                Pin must be 4 characters long.
              </Text>
            );
          },
        });
        setLoad(false);
        return; // Exit the function if validation fails
      }
      if (String(basic.conpass) !== String(basic.newpass)) {
        toast.show({
          position: "bottom",
          duration: 800,
          render: () => {
            return (
              <Text
                allowFontScaling={false}
                style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
              >
                Pin Not Match
              </Text>
            );
          },
        });
        setLoad(false);
        return; // Exit the function if validation fails
      }

      axios
        .put(
          `https://${String(
            HOST
          )}.execute-api.ap-south-1.amazonaws.com/changePass?API_KEY=${API_KEY}`,
          {
            mobileNo: `${email}`,
            oldPassword: `${basic?.oldpass}`,
            newPassword: `${basic?.newpass}`,
          }
        )
        .then((res) => {
          if (res?.data?.message) {
            toast.show({
              position: "bottom",
              duration: 900,
              render: () => {
                return (
                  <Text
                    allowFontScaling={false}
                    style={tw`text-gray-500 rounded-lg bg-[${color}] text-white font-semibold text-xs p-2`}
                  >
                    🎉 Pin Changed Successfully ! 🎉
                  </Text>
                );
              },
            });
            SecureStore?.deleteItemAsync("userData");
            setTimeout(() => {
              setAuth(false);
            }, 500);
            setLoad(false);
          }
        })
        .catch((err) => {
          toast.show({
            position: "bottom",
            duration: 900,
            render: () => {
              return (
                <Text
                  allowFontScaling={false}
                  style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
                >
                  {err?.response?.data?.message || err.message}
                </Text>
              );
            },
          });
          setLoad(false);
        })
        .finally(() => {
          setLoad(false);
        });
    } catch (error) {
      // console.error(error);
      toast.show({
        position: "bottom",
        duration: 900,
        render: () => {
          return (
            <Text
              allowFontScaling={false}
              style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
            >
              {error.message}
            </Text>
          );
        },
      });
      setLoad(false);
    }
  };

  return (
    <View
      style={tw`flex w-full bg-white h-full justify-center  rounded-lg items-center flex-col p-6 gap-4`}
    >
      <ImageBackground
        source={support}
        contentFit={`contain`}
        contentPosition={`center`}
        style={tw`w-full flex justify-center items-center h-full`}
      >
        <View
          style={tw`flex flex-row top-15 justify-center w-full items-center gap-8`}
        >
          <Pressable
            onPress={() => Linking.openURL("tel:+919229885383")}
            style={tw`p-2 border rounded-full flex  justify-center border-[${color}] border-2 items-center`}
          >
            <Image source={call} style={tw`w-[45px] h-[45px]`} />
          </Pressable>

          <Pressable
            onPress={() =>
              Linking.openURL("whatsapp://send?text=Hello&phone=+919229885383")
            }
            style={tw`p-2 border rounded-full flex  justify-center border-[${color}] border-2 items-center`}
          >
            <Image source={whatsapp} style={tw`w-[45px] h-[45px]`} />
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL("mailto:adsmaker365@gmail.com")}
            style={tw`p-2 border rounded-full flex  justify-center border-[${color}] border-2 items-center`}
          >
            <Image source={Gmail} style={tw`w-[45px] h-[45px]`} />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Help;
