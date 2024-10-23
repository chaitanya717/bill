import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "twrnc";
import whts from "../assets/whatsapp.gif";
const Whatsapp = ({ Link }) => {
  return (
    <TouchableOpacity
      style={tw`absolute bottom-5 right-3 rounded-full  w-[60px] h-[60px]`}
      onPress={() =>
        Linking.openURL("whatsapp://send?text=Hello&phone=+919229885383")
      }
    >
      <Image
        source={whts}
        resizeMode={`contain`}
        resizeMethod={`scale`}
        style={tw`w-[60px] h-[60px] bg-white rounded-full`}
      />
    </TouchableOpacity>
  );
};

export default Whatsapp;

const styles = StyleSheet.create({});
