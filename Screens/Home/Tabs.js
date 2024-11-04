import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import tw from "twrnc";
import {
  PlusCircle,
  FolderDown,
  UserSquareIcon,
  Table2,
  FileEdit,
  Briefcase,
} from "lucide-react-native"; // Import Lucide icons
import { useNavigation } from "@react-navigation/native";
import LIstBuisness from "./COMP/LIstBuisness";

const Tabs = () => {
  const Navigation = useNavigation();

  return (
    // <ScrollView>
    <View style={tw`flex-1 flex-col  gap-1 justify-start items-center p-1`}>
      {/* First Row */}
      <View style={tw`flex-row h-[110px] justify-between w-full`}>
        <TouchableOpacity
          onPressIn={() => Navigation.navigate("BusinessSelect")}
          style={tw`flex-1 m-2 p-4 bg-[#F5F5F5] rounded-xl items-center`}
        >
          <PlusCircle color="#3897F9" size={32} style={tw`mb-2`} />
          <Text style={tw`text-black text-center`}>Add Businesses</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={tw`text-black  h-[20px]`}>My Businesses</Text> */}
      <LIstBuisness />
    </View>
    // </ScrollView>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
