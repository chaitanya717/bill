import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
  Linking,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
const EdiEntryModel = ({
  isVisible,
  onClose,
  selectedbusiness,
  item,
  fetchEntries,
}) => {
  const toast = useToast();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    userid: selectedbusiness?.userid,
    date: new Date(),
    mobile: "",
    businessOption: "",
    bag: "",
    rate: "",
    hrrate: "",
    hrname: [],
    diesel: "",
    total: "",
    paymentMode: "",
    paymentStatus: "",
  });

  const isJcb = selectedbusiness?.businessOption[0] === "JCB/Excavators";
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const openStartTimePicker = () => setShowStartPicker(true);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item?.name || "",
        userid: item?.userid || "",
        date: item?.date ? new Date(item?.date) : new Date(),
        mobile: item?.mobile || "",
        businessOption: item?.businessOption || "",
        bag: item?.bag ? item.bag.toString() : "", // Convert to string
        rate: item?.rate ? item.rate.toString() : "", // Convert to string
        diesel: item?.diesel ? item.diesel.toString() : "", // Convert to string
        total: item?.total ? item.total.toString() : "", // Convert to string
        hrname: item?.hrname || [],
        hrrate: item?.hrrate,
        paymentMode: item?.paymentStatus?.mode || "",
        paymentStatus: item?.paymentStatus?.status || "",
      });
      setStartTime(new Date(item?.starttime)); // Correctly parsing the start time
      setEndTime(new Date(item?.endtime));
      setTotalHours(item?.hour);
      setTotalAmount(item?.total);
    }
  }, [item]);

  useEffect(() => {
    calculateTotalHoursAndAmount(startTime, endTime);
  }, [startTime, endTime, formData?.rate]);
  // Open end time picker
  const openEndTimePicker = () => setShowEndPicker(true);

  // Handle start time change
  const onStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setShowStartPicker(false);
    setStartTime(currentTime);
    calculateTotalHoursAndAmount(startTime, currentTime);
  };

  // Handle end time change
  const onEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setShowEndPicker(false);
    setEndTime(currentTime);
    calculateTotalHoursAndAmount(startTime, currentTime);
  };

  // Function to calculate total hours
  const hourlyRate = Number(formData?.rate); // Set your hourly rate

  const calculateTotalHoursAndAmount = (start, end) => {
    const diffInMs = Math.abs(end - start); // Difference in milliseconds
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to total minutes

    const hours = Math.floor(diffInMinutes / 60); // Get the whole hours
    const minutes = diffInMinutes % 60; // Remaining minutes after hours

    // Calculate the total amount based on hours and minutes
    const totalAmount = (hours + minutes / 60) * hourlyRate;

    setTotalHours(
      `${hours} Hour${hours !== 1 ? "s" : ""} ${minutes} Min${
        minutes !== 1 ? "s" : ""
      }`
    );
    setTotalAmount(totalAmount.toFixed(2)); // Limit to 2 decimal places for currency
  };
  const formatTime = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return "Invalid date"; // or return a default time string
    }
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatTimeampm = (date) => {
    if (!date) return ""; // Handle case where date is undefined or null

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours.toString().padStart(2, "0") : "12"; // the hour '0' should be '12'

    return `${hours}:${minutes} ${ampm}`;
  };
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isTotalEdited, setIsTotalEdited] = useState(false); // track if user edits total manually
  // Handle form updates
  const handleChange = (field, value) => {
    setFormData((prevState) => {
      // Calculate total if rate or bag changes and if total hasn't been edited manually
      if ((field === "rate" || field === "bag") && !isTotalEdited) {
        const rate =
          field === "rate" ? parseFloat(value) : parseFloat(prevState.rate);
        const bag =
          field === "bag" ? parseFloat(value) : parseFloat(prevState.bag);
        const total = isNaN(rate * bag) ? "" : (rate * bag).toString();
        return { ...prevState, [field]: value, total };
      }
      return { ...prevState, [field]: value };
    });
  };

  const handleTotalChange = (value) => {
    setIsTotalEdited(true); // enable manual editing
    setFormData((prevState) => ({ ...prevState, total: value }));
  };

  const handleHRSelect = (hr) => {
    if (isJcb) {
      // If it's JCB, set hrname to only the selected hr
      setFormData((prevState) => ({
        ...prevState,
        hrname: [hr], // Allow only one selection
      }));
    } else {
      // Otherwise, toggle the selection as before
      setFormData((prevState) => ({
        ...prevState,
        hrname: prevState.hrname.includes(hr)
          ? prevState.hrname.filter((name) => name !== hr)
          : [...prevState.hrname, hr],
      }));
    }
  };

  const handleSubmit = async (selectedbusiness, formData, item) => {
    const fields = Object.entries(formData);
    for (const [field, value] of fields) {
      if (field === "bag" || field === "total") continue;
      if (!value || (Array.isArray(value) && value.length === 0)) {
        alert(`${field} is required.`);
        return;
      }
    }
    const convertDateFormat = (dateString) => {
      // Create a Date object from the input string
      const date = new Date(dateString);

      // Extract the year, month, and day
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };
    setLoading(true);
    try {
      const response = await fetch(
        `https://kops-enrty.vercel.app/api/entries/${item?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData?.name,
            userid: selectedbusiness?._id,
            date: convertDateFormat(formData?.date),
            mobile: formData.mobile,
            bag: formData.bag || "1",
            rate: formData.rate,
            starttime: startTime,
            endtime: endTime,
            hour: totalHours || formData.bag,
            hrname: formData.hrname,
            businessOption: selectedbusiness?.businessOption[0],
            hrcount: formData?.hrname?.length,
            hrrate: formData?.hrrate,
            diesel: formData?.diesel,
            total: isJcb
              ? totalAmount
              : Number(formData?.bag) * Number(formData.rate),
            paymentStatus: {
              mode: formData.paymentMode,
              status: formData.paymentStatus,
            },
          }),
        }
      );
      const result = await response.json();

      if (result?._id) {
        onClose();
        toast.show({
          position: "top",
          duration: 1000,
          render: () => {
            return (
              // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
              <Text
                allowFontScaling={false}
                style={tw`text-white rounded-lg bg-[#3897F9] text-white font-semibold text-xs p-2`}
              >
                🎉 Entry Updated Successfully ! 🎉
              </Text>
              // </Box>
            );
          },
        });
        onClose();
        fetchEntries();
        const message = isJcb
          ? `
✨✨ ${selectedbusiness?.businessName} ✨✨

📆 Date: ${convertDateFormat(formData?.date)} 

👨‍💼 Name: ${formData?.name} 
☎️ Mobile Number: ${formData?.mobile} 

✅ Start Time : ${formatTimeampm(startTime)}
✅ End Time : ${formatTimeampm(endTime)}

✅ Per Hour Amount : ${formData?.rate}
✅ Total Working Hours : ${totalHours}

✅ Total Amount: ₹${totalAmount}


Your Payment is Pending...
Pay The Amount As Soon As Possible.

Thank you ! 😊 
`
          : `
✨✨ ${selectedbusiness?.businessName} ✨✨

📆 Date: ${convertDateFormat(formData?.date)} 

👨‍💼 Name: ${formData?.name} 
☎️ Mobile Number: ${formData?.mobile} 

✅ Toal Bags: ${formData?.bag}
✅ Per Bag Amount : ${formData?.rate}

✅ Total Amount: ₹${Number(Number(formData?.bag) * Number(formData?.rate))}


Your Payment is Pending...
Pay The Amount As Soon As Possible.

Thank you ! 😊

`;
        const sendInvoice = () => {
          // const message = `
          // ${selectedbusiness?.businessName}
          // INVOICE DETAILS
          // Name : ${formData?.name} \n
          //                  Mobile Number : ${formData?.mobile} \n
          // `;

          const url = `whatsapp://send?text=${encodeURIComponent(
            message
          )}&phone=+91${formData?.mobile}`;

          Linking.openURL(url).catch((err) => {
            Alert.alert(
              "Error",
              "Make sure you have WhatsApp installed on your device."
            );
          });
        };
        // sendInvoice();
      }
    } catch (error) {
      toast.show({
        position: "bottom",
        duration: 600,
        render: () => {
          return (
            <Text
              allowFontScaling={false}
              style={tw`text-gray-500 rounded-lg bg-red-500 text-white font-semibold text-xs p-2`}
            >
              {error?.message}
            </Text>
          );
        },
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const hrOptions = selectedbusiness?.HR?.map((hr) => hr.name);
  const hrbusinessOption = selectedbusiness?.businessOption?.map((hr) => hr);
  const modeOptions = ["Cash", "Online"];
  const statusOptions = ["Pending", "Done"];

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <ScrollView contentContainerStyle={tw`p-6 bg-white`}>
        <TouchableOpacity
          style={tw`flex justify-center mb-4  top-2 items-end`}
          onPress={onClose}
        >
          <Text style={tw`text-sm rounded-xl text-white bg-black p-3  mb-0`}>
            Close
          </Text>
        </TouchableOpacity>
        <View
          style={tw`bg-[#f5f5f5] p-2 rounded-xl h-[70px] mb-3 flex justify-start items-center`}
        >
          <Text style={tw`text-2xl font-semibold  mb-0`}>
            {selectedbusiness?.businessName}
          </Text>
          <Text style={tw`text-sm font-medium  mb-5`}>
            {selectedbusiness?.businessType}
          </Text>
        </View>
        <Text style={tw`font-semibold mb-2`}>Customer Name</Text>
        <TextInput
          placeholder="Name"
          style={tw`border p-2 border-[#ccc] mb-4 rounded-lg`}
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <Text style={tw`font-semibold mb-2`}>Issue Date</Text>
        <TouchableOpacity
          style={tw`border p-2 border-[#ccc] mb-4 rounded-lg`}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{formData.date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={formData.date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || formData.date;
              setShowDatePicker(false);
              handleChange("date", currentDate);
            }}
          />
        )}
        <Text style={tw`font-semibold mb-2`}>Customer Mobile</Text>
        <TextInput
          placeholder="Mobile"
          maxLength={10}
          style={tw`border p-2 border-[#ccc] mb-4 rounded-lg`}
          keyboardType="phone-pad"
          value={formData.mobile}
          onChangeText={(text) => handleChange("mobile", text)}
        />
        {/* <Text style={tw`font-semibold mb-2`}>Service For / Crop</Text>
        <View style={tw`flex-row flex-wrap mb-4`}>
          {hrbusinessOption?.map((Bo) => (
            <TouchableOpacity
              key={Bo}
              onPress={() => handleChange("businessOption", Bo)}
              style={[
                tw`p-2 border rounded-lg m-1`, // Adds margin between items
                { width: "40%" }, // Each item takes 48% of the container's width to create a 2-column grid
                formData.businessOption === Bo
                  ? { backgroundColor: "#000" }
                  : { backgroundColor: "#f9f9f9" },
              ]}
            >
              <Text
                style={
                  formData?.businessOption === Bo
                    ? tw`text-white text-center`
                    : tw`text-black text-center`
                }
              >
                {Bo}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}
        {isJcb ? null : (
          <>
            <Text style={tw`font-semibold mb-2`}>Bag</Text>
            <TextInput
              placeholder="Bag"
              style={tw`border p-2 border-[#ccc] mb-4 rounded-lg`}
              keyboardType="numeric"
              value={formData.bag}
              onChangeText={(text) => handleChange("bag", text)}
            />
          </>
        )}
        {isJcb ? (
          <Text style={tw`font-semibold mb-2`}>Rate / Hour</Text>
        ) : (
          <Text style={tw`font-semibold mb-2`}>Rate / Bag</Text>
        )}
        <TextInput
          placeholder="Rate"
          style={tw`border p-2 border-[#ccc] mb-4 rounded-lg`}
          keyboardType="numeric"
          value={formData.rate}
          onChangeText={(text) => handleChange("rate", text)}
        />
        {isJcb ? (
          <View style={{ padding: 3 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
              Select Start and End Time
            </Text>

            {/* Start Time */}
            <TouchableOpacity
              onPress={openStartTimePicker}
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <Text>Start Time: {formatTime(startTime)}</Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startTime}
                is24Hour={false}
                mode="time"
                display={`inline`}
                onChange={onStartTimeChange}
              />
            )}

            {/* End Time */}
            <TouchableOpacity
              onPress={openEndTimePicker}
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                marginBottom: 2,
              }}
            >
              <Text>End Time: {formatTime(endTime)}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endTime}
                is24Hour={false}
                mode="time"
                display={`inline`}
                onChange={onEndTimeChange}
              />
            )}

            {/* Total Hours */}
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                color: "#000000",
                fontWeight: "400",
                marginBottom: 10,
              }}
            >
              Total Hours: {totalHours} : ₹{totalAmount}
            </Text>
          </View>
        ) : null}
        {isJcb ? (
          <Text style={tw`font-semibold mb-2`}>Select Driver</Text>
        ) : (
          <Text style={tw`font-semibold mb-2`}>Worker Names</Text>
        )}

        <View style={tw`flex-row flex-wrap mb-4`}>
          {hrOptions?.map((hr) => (
            <TouchableOpacity
              key={hr}
              onPress={() => handleHRSelect(hr)}
              style={[
                tw`p-2 border rounded-lg mr-2 mb-2`,
                formData.hrname.includes(hr) ||
                (isJcb &&
                  formData.hrname.length === 1 &&
                  formData.hrname[0] === hr)
                  ? { backgroundColor: "#000" }
                  : { backgroundColor: "#f9f9f9" },
              ]}
            >
              <Text
                style={
                  formData.hrname.includes(hr) ||
                  (isJcb && formData.hrname[0] === hr)
                    ? tw`text-white`
                    : tw`text-black`
                }
              >
                {hr}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={tw`font-semibold mb-2`}>Fuel(Amount)</Text>
        <TextInput
          placeholder="Diesel"
          style={tw`border p-2 border-[#ccc] mb-4 rounded-lg`}
          keyboardType="numeric"
          value={formData.diesel}
          onChangeText={(text) => handleChange("diesel", text)}
        />
        <Text style={tw`font-semibold mb-2`}>Payment Mode</Text>
        <View style={tw`flex-row mb-4`}>
          {modeOptions?.map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => handleChange("paymentMode", mode)}
              style={[
                tw`p-2 border rounded-lg mr-2`,
                formData.paymentMode === mode
                  ? { backgroundColor: "#000" }
                  : { backgroundColor: "#f9f9f9" },
              ]}
            >
              <Text
                style={
                  formData.paymentMode === mode
                    ? tw`text-white`
                    : tw`text-black`
                }
              >
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={tw`font-semibold mb-2`}>Payment Status</Text>
        <View style={tw`flex-row mb-4`}>
          {statusOptions?.map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => handleChange("paymentStatus", status)}
              style={[
                tw`p-2 border  rounded-lg mr-2`,
                formData.paymentStatus === status
                  ? { backgroundColor: "#000" }
                  : { backgroundColor: "#f9f9f9" },
              ]}
            >
              <Text
                style={
                  formData.paymentStatus === status
                    ? tw`text-white`
                    : tw`text-black`
                }
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={tw`font-semibold border rounded-lg border-[#ccc] p-3 text-start mb-2`}
        >
          Total Amount : ₹{isJcb ? totalAmount : Number(Number(formData?.total))}
        </Text>
        <TouchableOpacity
          onPress={() => handleSubmit(selectedbusiness, formData, item)}
        >
          
          <LinearGradient
            colors={["#3897F9", "#3897F8"]}
            style={tw`p-4 rounded-lg mb-1 mt-2`}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={tw`text-center text-white font-semibold`}>
                Update Entry
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

export default EdiEntryModel;
