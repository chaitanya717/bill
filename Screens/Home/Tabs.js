import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { Home, Settings, User, Info, Heart, Search ,PlusCircle,Users,Grip,FolderDown,Receipt,UserSquareIcon} from "lucide-react-native"; // Import Lucide icons

const Tabs = () => {
  return (
    <View style={tw`flex-1 flex-col gap-3 justify-start items-center p-4`}>
      {/* First Row */}
      <View style={tw`flex-row h-[110px] justify-between w-full`}>
        <TouchableOpacity style={tw`flex-1 m-2 p-4 bg-[#F5F5F5]  shadow-2xl rounded-xl items-center`}>
          <PlusCircle color="#00df63" size={32} style={tw`mb-2`} />
          <Text style={tw`text-black text-center`}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-1 m-2 p-4 bg-[#F5F5F5]  shadow-2xl rounded-xl items-center`}>
          <Grip color="#00df63" size={32} style={tw`mb-2`} />
          <Text style={tw`text-black text-center`}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-1 m-2 p-4 bg-[#F5F5F5]  shadow-2xl rounded-xl items-center`}>
          <Users color="#00df63" size={32} style={tw`mb-2`} />
          <Text style={tw`text-black text-center`}>Customers</Text>
        </TouchableOpacity>
      </View>

      {/* Second Row */}
      <View style={tw`flex-row h-[110px] justify-between w-full`}>
        <TouchableOpacity style={tw`flex-1 m-2 p-4 bg-[#F5F5F5]  shadow-2xl rounded-xl items-center`}>
          <Receipt color="#00df63" size={32} style={tw`mb-2`} />
          <Text style={tw`text-black text-center`}>Invoices</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-1 m-2 p-4 bg-[#F5F5F5]  shadow-2xl rounded-xl items-center`}>
          <FolderDown color="#00df63" size={32} style={tw`mb-2`} />
          <Text style={tw`text-black text-center`}>Export CSV</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-1 m-2 p-4 bg-[#F5F5F5]  shadow-2xl rounded-xl items-center`}>
          <UserSquareIcon color="#00df63" size={32} style={tw`mb-2`} />
          <Text style={tw`text-black text-center`}>HR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
