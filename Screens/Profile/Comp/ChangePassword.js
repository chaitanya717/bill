import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { UiDataProvider } from "../../../UiContaxt/UiContaxt";
import * as SecureStore from "expo-secure-store";
import { DataService } from "../../../DataFetcherContext/FetchedData";
import { Spinner, useToast } from "native-base";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";

const ChangePassword = () => {
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
              <Text allowFontScaling={false}
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
              <Text allowFontScaling={false}
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
              duration:900,
              render: () => {
                return (
                  <Text allowFontScaling={false}
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
            duration:900,
            render: () => {
              return (
                <Text allowFontScaling={false}
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
        duration:900,
        render: () => {
          return (
            <Text allowFontScaling={false}
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
      style={tw`flex ${`w-full`} bg-white h-full justify-center  rounded-lg items-center flex-col p-6 gap-4`}
    >
      <View style={tw`flex w-full  flex-col justify-start items-start  gap-2`}>
        <Text allowFontScaling={false} style={tw`text-[14px] left-0 text-gray-800 font-title`}>
          Old Pin *
        </Text>
        <TextInput
          value={basic?.oldpass}
          autoComplete="off"
          keyboardType={`number-pad`}
          onChangeText={(text) => handleInputChange("oldpass", text)}
          placeholder=""
          maxLength={4}
          style={tw`w-full text-[12px] text-[${color}] font-semibold border border-gray-500 p-2 rounded-lg`}
        />
      </View>
      <View style={tw`flex w-full  flex-col justify-start items-start   gap-2`}>
        <Text allowFontScaling={false} style={tw`text-[14px] left-0 text-gray-800 font-title`}>
          New Pin *
        </Text>
        <TextInput
          value={basic?.newpass}
          autoComplete="off"
          maxLength={4}
          keyboardType={`number-pad`}
          onChangeText={(text) => handleInputChange("newpass", text)}
          placeholder=""
          style={tw`w-full text-[12px] text-[${color}] font-semibold border border-gray-500 p-2 rounded-lg`}
        />
      </View>
      <View style={tw`flex w-full  flex-col justify-start items-start   gap-2`}>
        <Text allowFontScaling={false} style={tw`text-[14px] left-0 text-gray-800 font-title`}>
          Confirm Pin *
        </Text>
        <TextInput
          value={basic?.conpass}
          autoComplete="off"
          maxLength={4}
          keyboardType={`number-pad`}
          onChangeText={(text) => handleInputChange("conpass", text)}
          placeholder=""
          style={tw`w-full text-[12px] text-[${color}] font-semibold border border-gray-500 p-2 rounded-lg`}
        />
      </View>
      {load === true ? (
        <View style={tw`bg-[${color}] rounded-lg w-full p-3`}>
          <TouchableOpacity
            style={tw`flex flex-row justify-center items-center`}
          >
            <Spinner color={`#fff`} />
          </TouchableOpacity>
        </View>
      ) : (
        // <View style={tw`bg-[${color}] rounded-lg w-full p-3`}>
        <LinearGradient
          style={tw`rounded-xl w-full p-3`}
          colors={["#00bf63", "#005f33"]}
        >
          <Pressable
          disabled={load}
            onPress={() => ChangePasswordHandle(email)}
            style={tw`flex flex-row justify-center items-center`}
          >
            <Text allowFontScaling={false} style={tw`text-white font-bold`}>Change PIN</Text>
          </Pressable>
        </LinearGradient>
        // </View>
      )}
    </View>
  );
};

export default ChangePassword;
