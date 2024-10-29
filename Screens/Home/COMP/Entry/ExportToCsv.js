import React from "react";
import { View, Alert, Text, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing"; // Import the Sharing module
import XLSX from "xlsx";
import tw from "twrnc";

const ExporttoCsv = ({ filteredEntries, BuisnessName }) => {
  // Function to format data according to your requirements
  const formatDataForCSV = () => {
    return filteredEntries.map((entry, index) => ({
      SRNO: index + 1,
      id: entry?._id,
      name: entry.name,
      mobile: entry.mobile,
      businessOption: entry.businessOption,
      date: entry.date,
      bag: entry.bag,
      rate: entry.rate,
      hrcount: entry.hrcount,
      diesel: entry.diesel,
      total: entry.total,
      paymentMode: entry.paymentStatus.mode,
      paymentStatus: entry.paymentStatus.status,
      businessId: entry.userid,
    }));
  };

  const exportToCSV = async () => {
    try {
      const formattedData = formatDataForCSV();

      // Convert formatted data to worksheet
      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");

      // Create CSV data and file URI
      const csvData = XLSX.write(wb, { type: "binary", bookType: "csv" });
      const fileUri = `${FileSystem.documentDirectory}${BuisnessName}.csv`;

      // Write the CSV data to file
      await FileSystem.writeAsStringAsync(fileUri, csvData, {
        encoding: FileSystem.EncodingType.ASCII,
      });

      Alert.alert("Success", `File saved to: ${fileUri}`);

      // Share the CSV file
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      Alert.alert("Error", "There was an error exporting the file.");
    }
  };

  return (
    <TouchableOpacity
      onPress={exportToCSV}
      style={tw`bg-black p-3 mt-10 rounded-full items-center`} // Adjust colors and padding as needed
    >
      <Text style={tw`text-white font-bold`}>📑 Export To Excel</Text>
    </TouchableOpacity>
  );
};

export default ExporttoCsv;
