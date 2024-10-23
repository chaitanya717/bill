import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import ProfileCard from "./Comp/ProfileCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import join from "../../assets/join.png";

import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { DataService } from "../../DataFetcherContext/FetchedData";
import { UiDataProvider } from "../../UiContaxt/UiContaxt";
const MainProfile = () => {
  const Navigation = useNavigation();
  const { dATAMLMUser } = DataService();
  const { color } = UiDataProvider();
  return (
    <>
      <ProfileCard />
    </>
  );
};

export default MainProfile;

const styles = StyleSheet.create({});
