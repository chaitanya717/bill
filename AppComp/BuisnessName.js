import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import tw, { style } from "twrnc";
import { UiDataProvider } from "../UiContaxt/UiContaxt";
import { useNavigation } from "@react-navigation/native";
const BuisnessName = () => {
  const { color, themecolor, bname, fetchBName, imagesBn } = UiDataProvider();

  useEffect(() => {
    fetchBName();
  }, []);

  const Navi = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => Navi?.navigate("Buisness")}
        style={tw`flex flex-row ml-3 gap-2 justify-center items-start`}
      >
        <Image
          style={tw`rounded-xl bg-gray-200`}
          width={35}
          height={35}
          source={{ uri: imagesBn?.uri }}
          contentFit={`contain`}
        
          contentPosition={`center`}
        />
        <View style={tw`flex flex-col justify-center items-start`}>
          <Text allowFontScaling={false}  style={tw`text-[10px] font-semibold text-gray-600 `}>
            My Business
          </Text>
          <Text allowFontScaling={false} style={[tw`text-[14px] font-bold text-[${color}]`]}>
            {bname?.bname || "Add Business"}
            {` `}
            {`>`}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default BuisnessName;
