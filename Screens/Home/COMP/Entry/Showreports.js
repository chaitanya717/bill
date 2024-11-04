import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { useToast } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  Backpack,
  CalendarCheck,
  CalendarSearch,
  ChevronLeftCircle,
  ChevronRightCircle,
  Edit2,
  Edit3,
  Eye,
  FileDown,
  SlidersHorizontal,
  Trash2,
} from "lucide-react-native";
import tw from "twrnc";
import EditEntryModal from "./EditEntry";
import ExportToCSV from "./ExportToCsv";
import BuisnessName from "./../../../../AppComp/BuisnessName";
const Showreports = ({ route }) => {
  const navigation = useNavigation();
  const { selectedbusiness } = route?.params;
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterModalVisiblexp, setFilterModalVisiblexp] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusinessOption, setSelectedBusinessOption] = useState(null);
  const [selectedExportOption, setSelectedExportOption] = useState(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userId = selectedbusiness?._id;
  const limit = 20;
  const toast = useToast();
  const [modalVisiblee, setModalVisiblee] = useState(false);
  const hrOptions = ["HR1", "HR2", "HR3"];
  const modeOptions = ["Cash", "Card"];
  const statusOptions = ["Pending", "Completed"];
  const { hoursString, totalAmountString } = calculateTotal(
    selectedEntry?.hour,
    selectedEntry?.hrrate
  );

  const handleEditButtonPress = () => {
    setModalVisiblee(true);
  };
  const isJcb = selectedbusiness?.businessOption[0] === "JCB/Excavators";
  const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    const year = date?.getFullYear();
    const month = String(date?.getMonth() + 1).padStart(2, "0");
    const day = String(date?.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const businessOptions = selectedbusiness?.businessOption;
  const expOption = ["📈 Excel", "📑 CSV"];
  const paymentOptions = ["Pending", "Done"];

  const DriverAmount = Number(selectedbusiness?.HrRate);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://kops-enrty.vercel.app/api/entries/user/${userId}`,
        {
          params: {
            date: convertDateFormat(selectedDate),
            limit,
            page: currentPage,
          },
        }
      );
      setEntries(response.data.entries);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching entries: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [selectedDate, currentPage]);

  const handleDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleEntryPress = (entry) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const formatTimeampm = (date) => {
    // Convert to Date object if 'date' is a valid timestamp or string
    date = date instanceof Date ? date : new Date(date);

    if (isNaN(date)) return ""; // Check if 'date' is valid

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours.toString().padStart(2, "0") : "12"; // the hour '0' should be '12'

    return `${hours}:${minutes} ${ampm}`;
  };
  const sendInvoice = (item) => {
    const message = isJcb
      ? `
 🔔 Reminder For Payment 🔔

 ${selectedbusiness?.businessName} 

📆 Date: ${convertDateFormat(item?.date)} 

👨‍💼 Name: ${item?.name} 
☎️ Mobile Number: ${item?.mobile} 

✅ Start Time : ${formatTimeampm(item?.starttime)}
✅ End Time : ${formatTimeampm(item?.endtime)}

✅ Per Hour Amount : ${item?.rate}
✅ Total Working Hours : ${item?.hour}

✅ Total Amount: ₹${item?.total}


Your Payment is Pending...
Pay The Amount As Soon As Possible.

Thank you ! 😊 
`
      : `
         🔔 Reminder For Payment 🔔  

${selectedbusiness?.businessName}

📆 Date: ${convertDateFormat(item?.date)} 

👨‍💼 Name: ${item?.name} 
☎️ Mobile Number: ${item?.mobile} 

✅ Toal Bags: ${item?.bag}
✅ Per Bag Amount : ${item?.rate}

✅ Total Amount: ₹${Number(Number(item?.bag) * Number(item?.rate))}


Your Payment is Pending...
Pay The Amount As Soon As Possible.

Thank you ! 😊

`;

    const url = `whatsapp://send?text=${encodeURIComponent(message)}&phone=+91${
      item?.mobile
    }`;

    Linking.openURL(url).catch((err) => {
      Alert.alert(
        "Error",
        "Make sure you have WhatsApp installed on your device."
      );
    });
  };

  const renderEntry = ({ item }) => {
    return (
      <View
        style={[tw`flex flex-row justify-between items-center`, styles.entry]}
      >
        <View style={tw`flex flex-col gap-2 justify-between items-start`}>
          <Text>Name: {item.name}</Text>
          <Text>Total: ₹{item?.total || "0"}</Text>
          {item.paymentStatus?.status === "Pending" ? null : (
            <View style={tw`flex-row items-center`}>
              <Text>Payment Status:{` `}</Text>
              <View style={tw`bg-[#F3F3F3] p-1 rounded-xl`}>
                <Text
                  style={
                    item.paymentStatus?.status === "Pending"
                      ? tw`text-xs font-medium text-red-500`
                      : tw`text-xs font-medium text-green-500`
                  }
                >
                  {" " + item.paymentStatus?.status || "Status 0" + " "}
                </Text>
              </View>
            </View>
          )}
          {/* <Text>Business Option: {item.businessOption}</Text> */}
          {item.paymentStatus?.status === "Pending" ? (
            <TouchableOpacity
              onPress={() => sendInvoice(item)}
              style={tw`bg-[#3897F9] text-white p-2 mt-2 rounded-xl`}
            >
              <Text style={tw` text-white font-medium text-xs `}>
                Send Reminder 🔔
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={tw`flex flex-col gap-6 justify-between items-center`}>
          <TouchableOpacity onPress={() => handleEntryPress(item)}>
            <Eye color="#3897F9" size={20} style={tw``} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditButtonPress}>
            <Edit3 color="black" size={20} style={tw``} />
          </TouchableOpacity>
          <EditEntryModal
            isVisible={modalVisiblee}
            onClose={() => setModalVisiblee(false)}
            item={item}
            hrOptions={hrOptions}
            modeOptions={modeOptions}
            selectedbusiness={selectedbusiness}
            statusOptions={statusOptions}
            fetchEntries={fetchEntries}
          />
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Confirm Deletion",
                "Are you sure you want to delete this entry?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    onPress: () => handleDeleteEntry(item?._id), // Call delete function
                    style: "destructive",
                  },
                ],
                { cancelable: true }
              );
            }}
          >
            <Trash2 color="red" size={20} style={tw``} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesQuery = entry.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesBusinessOption = selectedBusinessOption
      ? entry.businessOption === selectedBusinessOption
      : true;
    const matchesPaymentStatus = selectedPaymentStatus
      ? entry.paymentStatus?.status === selectedPaymentStatus
      : true;

    return matchesQuery && matchesBusinessOption && matchesPaymentStatus;
  });

  const resetFilters = () => {
    setSelectedBusinessOption(null);
    setSelectedPaymentStatus(null);
    setSearchQuery("");
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      // Call your API to delete the entry
      const response = await fetch(
        `https://kops-enrty.vercel.app/api/entries/${entryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        toast.show({
          position: "top",
          duration: 1000,
          render: () => {
            return (
              <Text
                allowFontScaling={false}
                style={tw`text-white rounded-lg bg-red-500 text-white font-semibold text-xs p-2`}
              >
                ❌ Failed to delete the entry ❌
              </Text>
            );
          },
        });
      }

      // Update your local state to reflect the deletion
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry._id !== entryId)
      );

      // Show success toast
      toast.show({
        position: "top",
        duration: 1000,
        render: () => {
          return (
            <Text
              allowFontScaling={false}
              style={tw`text-white rounded-lg bg-[#3897F9] text-white font-semibold text-xs p-2`}
            >
              🎉 Entry Deleted Successfully! 🎉
            </Text>
          );
        },
      });
    } catch (error) {
      console.error("Error deleting entry:", error);

      // Show error toast
      toast.show({
        position: "top",
        duration: 1000,
        render: () => {
          return (
            <Text
              allowFontScaling={false}
              style={tw`text-white rounded-lg bg-red-500 text-white font-semibold text-xs p-2`}
            >
              ❌ Error Deleting Entry! Please try again. ❌
            </Text>
          );
        },
      });
    }
  };

  function calculateTotal(inputHours, rate) {
    // Parse the input string for hours and minutes
    const hoursMatch = inputHours?.match(/(\d+)\s*Hours/i);
    const minutesMatch = inputHours?.match(/(\d+)\s*Mins/i);

    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

    // Total minutes
    const totalMinutes = hours * 60 + minutes;
    const calculatedAmount = (totalMinutes / 60) * rate; // Calculate total amount

    // Format the output for hours and minutes
    const formattedHours = Math.floor(totalMinutes / 60);
    const formattedMinutes = totalMinutes % 60;

    // Prepare the output strings
    const hoursString = `${formattedHours} hour${
      formattedHours !== 1 ? "s" : ""
    } ${formattedMinutes} min${formattedMinutes !== 1 ? "s" : ""}`;
    const totalAmountString = `${calculatedAmount.toFixed(2)}`;

    return { hoursString, totalAmountString };
  }

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    const formattedMinutes = String(minutes).padStart(2, "0"); // Ensure two-digit minutes
    return `${formattedHour}:${formattedMinutes} ${period}`;
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{selectedbusiness?.businessName}</Text>

        <View style={tw`flex flex-row justify-between items-center`}>
          {/* Search Input */}
          <TextInput
            style={[tw`rounded-xl border border-[#d3d3d3]`, styles.searchInput]}
            placeholder="Search by name"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Filters Button */}
          {/* <Button title="Filters" onPress={() => setFilterModalVisible(true)} /> */}
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={tw`w-[40px]  h-[40px] border border-[#d3d3d3] flex justify-center items-center rounded-xl`}
          >
            <CalendarSearch color="#010101" size={25} style={tw``} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterModalVisible(true)}
            style={tw`w-[40px]  h-[40px] border border-[#d3d3d3] flex justify-center items-center rounded-xl`}
          >
            <SlidersHorizontal color="#010101" size={25} style={tw``} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterModalVisiblexp(true)}
            style={tw`w-[40px]  h-[40px] border border-[#d3d3d3] flex justify-center items-center rounded-xl`}
          >
            <FileDown color="#010101" size={25} style={tw``} />
          </TouchableOpacity>
        </View>

        {/* Filter Options Modal */}
        <Modal
          animationType={`fade`}
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* <Text style={styles.modalTitle}>Filter Options</Text> */}
              {/* <Text style={tw`text-[17px] mb-3 font-bold`}>
                Select Business Option
              </Text> */}
              {/* <View style={tw`flex flex-col flex-wrap gap-1`}>
                {businessOptions?.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedBusinessOption(option);
                    }}
                    style={[
                      option === selectedBusinessOption
                        ? tw`bg-black rounded-xl`
                        : tw`bg-[#f1f1f1] rounded-xl`,
                      tw`w-[48%]  p-2`, // Ensures two items per row with padding
                      styles.option,
                    ]}
                  >
                    <Text
                      style={[
                        option === selectedBusinessOption
                          ? tw`font-bold text-white`
                          : tw`font-bold text-black`,
                        styles.option,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View> */}

              <Text style={tw`text-[17px] mt-3 mb-3 font-bold`}>
                Select Payment Status:
              </Text>
              <View style={tw` flex flex-col justify-center items-start gap-2`}>
                {paymentOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedPaymentStatus(option);
                    }}
                    style={[
                      option === selectedPaymentStatus
                        ? tw`bg-black p-2 rounded-xl`
                        : tw`bg-[#f1f1f1] p-2 rounded-xl `,
                    ]}
                  >
                    <Text
                      style={[
                        option === selectedPaymentStatus
                          ? tw`font-bold text-white `
                          : tw`font-bold text-black  `,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={() => setFilterModalVisible(false)}
                  style={tw`bg-black p-4 rounded-full items-center`} // Adjust colors and padding as needed
                >
                  <Text style={tw`text-white font-bold`}>Apply</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={resetFilters}
                  style={tw`bg-black p-4 rounded-full items-center`} // Adjust colors and padding as needed
                >
                  <Text style={tw`text-white font-bold`}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setFilterModalVisible(false)}
                  style={tw`bg-black p-4 rounded-full items-center`} // Adjust colors and padding as needed
                >
                  <Text style={tw`text-white font-bold`}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={`fade`}
          transparent={true}
          visible={filterModalVisiblexp}
          onRequestClose={() => setFilterModalVisiblexp(false)}
        >
          <View style={styles.modalContainer}>
            <View
              style={tw`flex flex-col justify-center bg-white p-3 w-[90%] rounded-xl items-center  gap-1`}
            >
              <ExportToCSV
                filteredEntries={filteredEntries}
                BuisnessName={
                  selectedbusiness?.businessName +
                  "_" +
                  convertDateFormat(new Date())
                }
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={tw` p-3 rounded-full items-center`} // Adjust colors and padding as needed
                >
                  {/* <Text style={tw`text-white font-bold`}>Export</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setFilterModalVisiblexp(false)}
                  style={tw`bg-black p-3 rounded-full items-center`} // Adjust colors and padding as needed
                >
                  <Text style={tw`text-white font-bold`}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Text style={tw`text-start font-bold text-[14px] mt-1 ml-2`}>
          Date: {convertDateFormat(selectedDate)} {``}{" "}
          {`Total(${filteredEntries?.length})`}
        </Text>
        {isLoading ? (
          <ActivityIndicator
            style={tw`flex mt-20 justify-center items-center`}
            size="large"
            color="#3897F9"
          />
        ) : (
          <FlatList
            data={filteredEntries}
            style={tw`mt-2`}
            keyExtractor={(item) => item._id["$oid"]}
            renderItem={renderEntry}
            ListEmptyComponent={
              <Text style={tw`text-center text-[18px] mt-15`}>
                No entries available
              </Text>
            }
          />
        )}

        {isLoading ? null : (
          <View style={styles.pagination}>
            <TouchableOpacity
              disabled={currentPage === 1}
              onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              style={tw`bg-gray-200 p-2 rounded-full items-center`} // Adjust colors and padding as needed
            >
              <ChevronLeftCircle color="#010101" size={25} style={tw``} />
            </TouchableOpacity>

            <Text
              style={tw`text-sm`}
            >{`Page ${currentPage} of ${totalPages}`}</Text>

            <TouchableOpacity
              onPress={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              style={tw`bg-gray-200 p-2 rounded-full items-center`} // Adjust colors and padding as needed
            >
              <ChevronRightCircle color="#010101" size={25} style={tw``} />
            </TouchableOpacity>
          </View>
        )}

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
          >
            <View style={tw`bg-white p-5 rounded-lg w-11/12 max-w-lg`}>
              <ScrollView>
                {selectedEntry && (
                  <>
                    <Text style={tw`text-lg font-bold mb-4`}>
                      Entry Details
                    </Text>

                    <Text style={tw`text-base mb-2`}>
                      <Text style={tw`font-semibold`}>Business:</Text>{" "}
                      {selectedEntry.businessOption}
                    </Text>
                    <Text style={tw`text-base mb-2`}>
                      <Text style={tw`font-semibold`}>Name:</Text>{" "}
                      {selectedEntry.name}
                    </Text>
                    <Text style={tw`text-base mb-2`}>
                      <Text style={tw`font-semibold`}>Mobile:</Text>{" "}
                      {selectedEntry.mobile}
                    </Text>
                    <Text style={tw`text-base mb-2`}>
                      <Text style={tw`font-semibold`}>Date:</Text>{" "}
                      {convertDateFormat(selectedEntry.date)}
                    </Text>
                    {isJcb ? (
                      <Text style={tw`text-base mb-2`}>
                        <Text style={tw`font-semibold`}>Start Time:</Text>{" "}
                        {formatTime(selectedEntry.starttime)}
                      </Text>
                    ) : null}
                    {isJcb ? (
                      <Text style={tw`text-base mb-2`}>
                        <Text style={tw`font-semibold`}>End Time:</Text>{" "}
                        {formatTime(selectedEntry.endtime)}
                      </Text>
                    ) : null}
                    <Text style={tw`text-base mb-2`}>
                      <Text style={tw`font-semibold`}>
                        {isJcb ? "Total Hours" : "Total Bags"}:
                      </Text>{" "}
                      {isJcb
                        ? selectedEntry.hour || "0"
                        : selectedEntry.bag || "0"}
                    </Text>
                    <Text style={tw`text-base mb-2`}>
                      <Text style={tw`font-semibold`}>
                        {isJcb ? "Per Hour Rate" : "Per Bag Rate"}:
                      </Text>{" "}
                      {selectedEntry.rate || "0"}
                    </Text>

                    <Text style={tw`text-base font-semibold mt-4`}>
                      {isJcb ? `Driver` : `Worker`} Names:
                    </Text>
                    {selectedEntry.hrname && selectedEntry.hrname.length > 0 ? (
                      selectedEntry.hrname.map((hr, index) => (
                        <Text key={index} style={tw`text-base ml-2`}>
                          - {hr}
                        </Text>
                      ))
                    ) : (
                      <Text style={tw`text-base ml-2`}>
                        No HR names available
                      </Text>
                    )}

                    <Text style={tw`text-base mb-2 mt-3`}>
                      <Text style={tw`font-semibold`}>
                        {isJcb ? "Driver" : "Total Workers"}:
                      </Text>{" "}
                      {selectedEntry.hrcount || "0"}
                    </Text>
                    <Text style={tw`text-base mb-2`}>
                      <Text style={tw`font-semibold`}>
                        {isJcb ? "Driver Rate/Hour" : "Worker Rate/Bag"}:
                      </Text>{" "}
                      {selectedEntry.hrrate || "0"}
                    </Text>
                    <Text style={tw`text-base mb-1`}>
                      <Text style={tw`font-semibold`}>
                        {isJcb ? "Driver Total" : "Worker Total"}:
                      </Text>{" "}
                      ₹
                      {isJcb
                        ? totalAmountString || "0"
                        : selectedEntry.bag * selectedEntry.hrrate || "0"}
                    </Text>

                    {isJcb ? null : (
                      <Text style={tw`text-base mb-5`}>
                        <Text style={tw`font-semibold`}>
                          {isJcb ? "Driver" : "Per Worker Amount"}:
                        </Text>{" "}
                        ₹
                        {Math?.abs(
                          Number(
                            (Number(selectedEntry.bag) *
                              Number(selectedEntry.hrrate)) /
                              Number(selectedEntry.hrcount)
                          )
                        ).toFixed(2) || "0"}
                      </Text>
                    )}

                    {/* <Text style={tw`text-base mb-2`}>
                      <Text style={tw`font-semibold`}>Driver Amount:</Text> ₹
                      {DriverAmount}
                    </Text> */}

                    <Text style={tw`text-base mb-3`}>
                      <Text style={tw`font-semibold`}>Fuel Amount:</Text> ₹
                      {Number(selectedEntry.diesel) || "0"}
                    </Text>
                    <Text style={tw`text-base mb-2`}>
                      <Text style={tw`font-semibold`}>Payment Status:</Text>{" "}
                      {selectedEntry.paymentStatus?.status || "Status 0"}
                    </Text>
                    <Text style={tw`text-base mb-5`}>
                      <Text style={tw`font-semibold`}>Payment Mode:</Text>{" "}
                      {selectedEntry.paymentStatus?.mode || "Mode 0"}
                    </Text>

                    <Text style={tw`text-base mb-2`}>
                      <Text style={tw`font-semibold`}>Total Amount:</Text> ₹
                      {selectedEntry.total || "0"}
                    </Text>
                    {isJcb ? (
                      <Text style={tw`text-base mb-2`}>
                        <Text style={tw`font-semibold`}>Total Spend:</Text> ₹
                        {Number(totalAmountString) +
                          Number(selectedEntry.diesel) || "0"}
                      </Text>
                    ) : (
                      <Text style={tw`text-base mb-2`}>
                        <Text style={tw`font-semibold`}>Total Spend:</Text> ₹
                        {Number(selectedEntry?.bag) *
                          Number(selectedEntry?.hrrate) +
                          Number(selectedEntry?.diesel) +
                          Number(Number(DriverAmount)) || "0"}
                      </Text>
                    )}

                    <Text style={tw`text-base mb-2`}>
                      <Text style={tw`font-semibold`}>Total Profit:</Text> ₹
                      {isJcb
                        ? selectedEntry.total -
                            Number(totalAmountString) -
                            Number(selectedEntry.diesel) || "0"
                        : selectedEntry.total -
                          Number(
                            Number(selectedEntry?.bag) *
                              Number(selectedEntry?.hrrate) +
                              Number(selectedEntry?.diesel) +
                              Number(Number(DriverAmount)) || "0"
                          )}
                    </Text>

                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={tw`bg-black mt-3 p-2 rounded-xl items-center`}
                    >
                      <Text style={tw`text-white font-bold`}>Close</Text>
                    </TouchableOpacity>
                  </>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  entry: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 8,
  },
  searchInput: {
    height: 40,
    width: "60%",
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  option: {
    padding: 1,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  activeFilters: {
    backgroundColor: "#d3d3d3",
    padding: 10,
    marginVertical: 10,
  },
  activeFilterText: {
    fontSize: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});

export default Showreports;
