import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import { Check } from "lucide-react-native";
import { DataService } from "../../../DataFetcherContext/FetchedData";

const SelectBusType = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const { DataOFServices } = DataService();

  const filteredTypes = DataOFServices.filter((item) =>
    item.Service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      navigation.navigate("BuisnessForm", { selectedService: selectedType });
    }
  };

  const renderBusinessType = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelect(item)}
      style={[
        tw`flex flex-col items-center justify-center m-2 p-4 border rounded-lg`,
        selectedType?.id === item.id
          ? tw`border-green-500`
          : tw`border-gray-300`,
      ]}
    >
      {selectedType?.id === item.id && <Check color="#00bf63" />}
      {/* Display Service name */}
      <Text style={tw`text-center`}>{item.Service}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={tw`flex-1 bg-white p-4`}>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
          placeholder="Search Business Type"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        <FlatList
          data={filteredTypes}
          renderItem={renderBusinessType}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />

        <TouchableOpacity
          onPress={handleContinue}
          disabled={!selectedType}
          style={tw`flex justify-center bottom-4 items-center w-full rounded-xl`}
        >
          <LinearGradient
            colors={["#00bf63", "#005f33"]}
            style={tw`flex justify-center items-center w-full rounded-lg p-4`}
          >
            <Text
              allowFontScaling={false}
              style={tw`text-white text-[18px] font-semibold`}
            >
              Continue
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SelectBusType;

const styles = StyleSheet.create({});
