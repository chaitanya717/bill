import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import tw from "twrnc";
import { Eye } from "lucide-react-native";
const Mainhr = ({ route }) => {
  const { selectedbusiness } = route.params;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHR, setSelectedHR] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredEntriesCount, setFilteredEntriesCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0); // State to hold total value of bag * hrrate
  const isJcb = selectedbusiness?.businessOption[0] === "JCB/Excavators";
  // Show or hide date pickers
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate.toISOString().split("T")[0]);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate.toISOString().split("T")[0]);
    }
  };

  const fetchData = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://kops-enrty.vercel.app/api/entries/userhr/${selectedbusiness?._id}`,
        {
          params: {
            startDate,
            endDate,
            limit: 20,
            page: 1,
          },
        }
      );
      setEntries(response.data.entries);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  function calculateTotal2(inputHours, rate) {
    // Parse the input string for hours and minutes
    const hoursMatch = inputHours?.match(/(\d+)\s*Hours?/i);
    const minutesMatch = inputHours?.match(/(\d+)\s*Mins?/i);

    // Extract hours and minutes, defaulting to 0 if not found
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

    // Convert total time to minutes and calculate the amount based on the rate
    const totalMinutes = hours * 60 + minutes;
    const calculatedAmount = (totalMinutes / 60) * rate; // Calculate total amount

    return parseFloat(calculatedAmount.toFixed(2));
  }
  const openHRModal = (hrname) => {
    // Filter entries to include only those where entry.hrname array includes the provided hrname string
    const hrEntries = entries.filter((entry) => entry.hrname.includes(hrname));

    // Set the selected HR entries and count
    setSelectedHR(hrEntries);
    setFilteredEntriesCount(hrEntries.length);

    function calculateTotal(inputHours, rate) {
      // Parse the input string for hours and minutes
      const hoursMatch = inputHours?.match(/(\d+)\s*Hours?/i);
      const minutesMatch = inputHours?.match(/(\d+)\s*Mins?/i);

      // Extract hours and minutes, defaulting to 0 if not found
      const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
      const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

      // Convert total time to minutes and calculate the amount based on the rate
      const totalMinutes = hours * 60 + minutes;
      const calculatedAmount = (totalMinutes / 60) * rate; // Calculate total amount

      return parseFloat(calculatedAmount.toFixed(2));
    }

    // Calculate the total value for bag * HrRate / hrcount
    const total = hrEntries.reduce((acc, entry) => {
      return (
        acc +
        (entry.bag * (selectedbusiness?.HrRate || 0)) /
          Number(entry.hrcount || 1)
      );
    }, 0);

    // Calculate the total amount based on hours and rate
    const total2 = hrEntries.reduce((acc, entry) => {
      return acc + calculateTotal(entry.hour, selectedbusiness?.HrRate || 0);
    }, 0);

    // Set the appropriate total value based on isJcb condition
    setTotalValue(isJcb ? total2 : total);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>HR (Workers)</Text> */}

      <View
        style={[
          tw`flex flex-row justify-center gap-15 items-center `,
          styles.datePickerContainer,
        ]}
      >
        <View style={[tw`flex flex-col justify-between items-start `]}>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={tw` flex justify-center mt-2 items-center p-3 bg-[#3897F9] rounded-xl`}
          >
            <Text style={tw`text-white font-medium`}>Start Date</Text>
          </TouchableOpacity>

          {showStartDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onStartDateChange}
            />
          )}
          {startDate && <Text style={tw``}> {startDate}</Text>}
        </View>
        <Text style={styles.totalEntries}>({entries.length})</Text>
        <View style={[tw`flex flex-col justify-between items-start `]}>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            style={tw` flex justify-center mt-2 items-center p-3 bg-[#3897F9] rounded-xl`}
          >
            <Text style={tw`text-white font-medium`}>End Date</Text>
          </TouchableOpacity>

          {showEndDatePicker && (
            <DateTimePicker
              textColor="#3897F9"
              value={new Date()}
              mode="date"
              display="default"
              onChange={onEndDateChange}
            />
          )}
          {endDate && <Text style={tw`top-1`}>{endDate}</Text>}
        </View>
      </View>

      <TouchableOpacity
        onPress={fetchData}
        style={tw`w-full flex justify-center mt-2 mb-2 items-center p-3 bg-[#3897F9] rounded-xl`}
      >
        {loading ? (
          <ActivityIndicator
            size={`small`}
            color="#fff"
            style={styles.loading}
          />
        ) : (
          <Text style={tw`text-white font-medium`}>Get Data</Text>
        )}
      </TouchableOpacity>

      {/* Total entries count */}

      {!endDate && !startDate ? null : (
        <Text style={tw`text-black font-medium mt-2 mb-2`}>
          All HR(Workers)
        </Text>
      )}

      {/* {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loading}
        />
      ) : ( */}
      {!endDate && !startDate ? null : (
        <FlatList
          data={selectedbusiness?.HR}
          style={{ marginBottom: 10, marginTop: 10 }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`border flex flex-row justify-between mb-3 items-center border-[#CCC]  rounded-xl`}
              onPress={() => openHRModal(String(item.name))}
            >
              <View style={[tw`flex flex-col gap-1`, styles.entry]}>
                <Text>Name: {item.name}</Text>
                <Text>Mobile: {item.mobile}</Text>
              </View>
              <Eye color="#3897F9" size={20} style={tw`mr-2`} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text>No entries found for the selected dates.</Text>
          }
        />
      )}
      {/* )} */}

      {/* Modal for HR entries */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <Text style={styles.modalTitle}>HR Entries</Text> */}

            {/* Filtered entries count in modal */}
            <Text style={styles.totalEntries}>
              From {startDate} To {endDate}
            </Text>
            <Text style={styles.totalEntries}>
              Total Entries Found: {filteredEntriesCount}
            </Text>
            <Text style={styles.totalEntries}>
              Hr Rate : {selectedbusiness?.HrRate}
              {isJcb ? " / Hour" : "/ Bag"}
            </Text>

            {/* Total value of bag * hrrate */}

            <Text style={styles.totalEntries}>
              Total Payment: ₹{totalValue}
            </Text>

            {selectedHR && selectedHR.length > 0 ? (
              <FlatList
                style={{ marginTop: 10 }}
                data={selectedHR}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View
                    style={[
                      tw`border mb-2 rounded-xl border-[#ccc]`,
                      styles.entry,
                    ]}
                  >
                    <Text style={[tw`text-black mb-2 font-medium`]}>
                      {item.date}
                    </Text>
                    <Text>Customer : {item.name}</Text>

                    {isJcb ? (
                      <Text>Hours: {item.hour}</Text>
                    ) : (
                      <Text>Bag: {item.bag}</Text>
                    )}
                    {isJcb ? (
                      <Text>
                        Total : ₹
                        {calculateTotal2(item.hour, selectedbusiness?.HrRate)}
                      </Text>
                    ) : (
                      <Text>
                        Total : ₹
                        {(item.bag * selectedbusiness?.HrRate) /
                          Number(item?.hrcount)}
                      </Text>
                    )}
                  </View>
                )}
              />
            ) : (
              <Text style={[tw`text-black mb-2 mt-2 font-medium`]}>
                No entries found for this HR.
              </Text>
            )}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={tw` flex justify-center mt-2 items-center p-3 bg-[#000] rounded-xl`}
            >
              <Text style={tw`text-white font-medium`}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Mainhr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  totalEntries: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 2,
  },
  loading: {
    marginVertical: 2,
  },
  entry: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
