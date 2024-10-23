import React from "react";
import { View, Text, SafeAreaView, Dimensions, Image } from "react-native";
import logo from "../assets/ads.gif";
import tw from "twrnc";

const Onboarding = () => {
  return (
    <SafeAreaView
      style={tw`flex flex-col bg-white p-4 h-full justify-center items-center`}
    >
      <Image
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
        source={logo}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
