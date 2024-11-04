import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import { XCircle, Trash2 } from "lucide-react-native";
import BuisnessName from "./../../../AppComp/BuisnessName";
import { DataService } from "../../../DataFetcherContext/FetchedData";

const EditBusinessModal = ({
  visible,
  onClose,
  business,
  onUpdate,
  fetchBusinesses,
}) => {
  const { DataOFServices, dataUser } = DataService();

  const availableOptions =
    DataOFServices?.find((item) => item.Service === business?.businessType)
      ?.options || [];

  const [businessName, setBusinessName] = useState("");
  const [hrrate, setHrrate] = useState("");
  const [businessOption, setBusinessOption] = useState([]);
  const [driverPay, setDriverPay] = useState(0);
  const [hrDetails, setHrDetails] = useState([
    { name: "", mobile: "", Active: false },
  ]);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (business) {
      setBusinessName(business.businessName);
      setHrrate(business?.HrRate?.toString() || "");
      setDriverPay(business?.DriverPay);
      setBusinessOption(business.businessOption || []);
      setHrDetails(business.HR || [{ name: "", mobile: "", Active: false }]);
      setIsActive(business.Active);
    } else {
      setBusinessName("");
      setHrrate("");
      setBusinessOption([]);
      setHrDetails([{ name: "", mobile: "", Active: false }]);
      setIsActive(false);
    }
  }, [business]);

  const isjcb = businessOption[0] === "JCB/Excavators";
  const handleUpdate = async (dataUser) => {
    if (!business?._id) {
      alert("Invalid business data. Please try again.");
      return;
    }
    if (!hrrate) {
      alert("Hr Rate is Required.");
      return;
    }
    if (!driverPay) {
      alert("Driver Rate is Required.");
      return;
    }

    const invalidHR = hrDetails.find((hr, index) => {
      if (!/^\d{10}$/.test(hr.mobile)) {
        alert(`HR mobile must be a 10-digit number for HR ${index + 1}.`);
        return true;
      }
      return false;
    });

    if (invalidHR) {
      return; // Exit if there's an invalid HR entry
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `https://kops-enrty.vercel.app/api/businesses/${business._id}`,
        {
          HrRate: Number(hrrate) || 0,
          driverPay,
          businessName,
          businessOption,
          HR: hrDetails,
          Active: isActive,
        }
      );
      onUpdate(response.data.business);
      onClose();
      fetchBusinesses(dataUser);
    } catch (error) {
      console.error(error);
      alert("Failed to update business details");
    } finally {
      setLoading(false);
    }
  };

  const toggleBusinessOption = (option) => {
    setBusinessOption((prevOptions) => {
      if (!Array.isArray(prevOptions)) return [option];
      if (prevOptions.includes(option)) {
        return prevOptions.filter((item) => item !== option);
      } else {
        return [...prevOptions, option];
      }
    });
  };

  const addHrDetail = () => {
    setHrDetails([...hrDetails, { name: "", mobile: "", Active: false }]);
  };

  const removeHrDetail = (index) => {
    const updatedHR = hrDetails.filter((_, i) => i !== index);
    setHrDetails(updatedHR);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Edit Business</Text>
          <TouchableOpacity onPress={onClose}>
            <XCircle size={24} color="red" />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Business Status</Text>
        <View
          style={[
            tw`p-2 mb-2 border rounded-[5px] border-[#ccc]`,
            styles.switchContainer,
          ]}
        >
          <Text>Business Status ({isActive ? "Active" : "Inactive"})</Text>
          <Switch value={isActive} onValueChange={setIsActive} />
        </View>
        <Text style={styles.label}>Business Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Business Name"
          value={businessName}
          onChangeText={setBusinessName}
        />

        {isjcb ? null : <Text style={styles.label}> Driver Rate</Text>}
        {isjcb ? null : (
          <TextInput
            style={styles.input}
            placeholder="Rate"
            keyboardType={`number-pad`}
            maxLength={10}
            value={driverPay}
            onChangeText={setDriverPay}
          />
        )}

        <Text style={styles.label}>
          {" "}
          {isjcb ? `Driver` : `Workers`} Rate / {isjcb ? `Hour` : `Bag`}{" "}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Rate"
          maxLength={10}
          value={hrrate}
          onChangeText={setHrrate}
        />
        <Text style={styles.label}>HR(Workers) Details</Text>
        {hrDetails.map((hr, index) => (
          <View
            key={index}
            style={[
              tw`border border-[#ccc] p-2 h-[230px] rounded-xl`,
              styles.hrDetailContainer,
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="HR Name"
              value={hr.name}
              onChangeText={(text) => {
                const updatedHR = [...hrDetails];
                updatedHR[index].name = text;
                setHrDetails(updatedHR);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile"
              maxLength={10}
              value={hr.mobile}
              onChangeText={(text) => {
                const updatedHR = [...hrDetails];
                updatedHR[index].mobile = text;
                setHrDetails(updatedHR);
              }}
            />
            {/* <TextInput
              style={styles.input}
              placeholder="RATE"
              value={hr.rate}
              onChangeText={(text) => {
                const updatedHR = [...hrDetails];
                updatedHR[index].rate = text;
                setHrDetails(updatedHR);
              }}
            /> */}
            <View style={styles.switchContainer}>
              <Text> HR Status ({hr.Active ? "Active" : "Inactive"})</Text>
              <Switch
                value={hr.Active}
                onValueChange={(value) => {
                  const updatedHR = [...hrDetails];
                  updatedHR[index].Active = value;
                  setHrDetails(updatedHR);
                }}
              />
            </View>
            <View style={tw`flex-1 justify-center p-2 items-start`}>
              <TouchableOpacity
                onPress={() => removeHrDetail(index)}
                style={[styles.removeButton]}
              >
                <Trash2 size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={addHrDetail} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>

        {/* <Text style={styles.label}>Services Options:</Text>
                <FlatList
                    style={[styles.flatList, tw`top-2`]}
                    data={availableOptions}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => toggleBusinessOption(item)}
                            style={[
                                styles.optionButton,
                                businessOption.includes(item) ? styles.selectedOption : null,
                            ]}
                        >
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    numColumns={3}
                /> */}

        <TouchableOpacity
          onPress={() => handleUpdate(dataUser)}
          disabled={loading}
          style={tw`mt-6 p-2`}
        >
          <LinearGradient
            colors={["#3897F9", "#3897F9"]}
            style={tw`rounded-lg p-4`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={tw`text-white text-lg font-semibold text-center`}>
                Update Business
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  hrDetailContainer: {
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    flex: 1,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#d3d3d3",
  },
  optionText: {
    color: "#000",
  },
  addButton: {
    backgroundColor: "#000000",
    borderRadius: 5,
    padding: 10,
    width: 100,
    alignItems: "center",
    marginVertical: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 5,
    width: 30,
    height: 30,
    alignItems: "center",
    marginTop: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "400",
  },
});

export default EditBusinessModal;
