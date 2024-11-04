import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
} from "react-native";
import { Spinner, useToast, Text } from "native-base";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { DataService } from "../../../DataFetcherContext/FetchedData";
// Import Lucide icons
import { PlusCircle, Trash2 } from "lucide-react-native";
import tw from "twrnc";
const BusiForm = ({ route, navigation }) => {
  const { selectedService } = route.params;
  const { width } = Dimensions.get("window");
  const [businessName, setBusinessName] = useState("");
  const [hrrate, setHrrate] = useState(0);
  const [driverPay, setDriverPay] = useState(0);
  const [businessOption, setBusinessOption] = useState([]);
  const { dataUser, hit, setHit } = DataService();
  const [hrFields, setHrFields] = useState([
    { name: "", mobile: "", active: true },
  ]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const availableOptions = selectedService?.options || [];
  const selServ = selectedService?.Service;

  const isjcb = availableOptions[0] === "JCB/Excavators";

  const validate = () => {
    const newErrors = {};

    // Validate business name
    if (!businessName) {
      newErrors.businessName = "Business name is required.";
    }
    if (!hrrate) {
      newErrors.hrrate = "HrRate is required.";
    }
    if (!driverPay && isjcb === false) {
      newErrors.hrrate = "Driver Rate is required.";
    }

    // Validate HR fields
    hrFields.forEach((hr, index) => {
      if (!hr.name) {
        newErrors[`hrName${index}`] = `HR name is required for HR ${
          index + 1
        }.`;
      }
      if (!hr.mobile) {
        newErrors[`hrMobile${index}`] = `HR mobile is required for HR ${
          index + 1
        }.`;
      } else if (!/^\d{10}$/.test(hr.mobile)) {
        newErrors[
          `hrMobile${index}`
        ] = `HR mobile must be a 10-digit number for HR ${index + 1}.`;
      }
      // if (!hr.rate) {
      //   newErrors[`hrRate${index}`] = `HR Rate is required for HR ${
      //     index + 1
      //   }.`;
      // }
    });

    return newErrors;
  };

  const handleHrChange = (index, field, value) => {
    const newHrFields = [...hrFields];
    newHrFields[index][field] = value;
    setHrFields(newHrFields);
    setErrors({
      ...errors,
      [`hrName${index}`]: null,
      [`hrMobile${index}`]: null,
      // [`hrRate${index}`]: null,
    });
  };

  const toggleActiveHR = (index) => {
    const newHrFields = [...hrFields];
    newHrFields[index].active = !newHrFields[index].active;
    setHrFields(newHrFields);
  };

  const addHrField = () => {
    setHrFields([...hrFields, { name: "", mobile: "", active: true }]);
  };

  const removeHrField = (index) => {
    const newHrFields = hrFields.filter((_, i) => i !== index);
    setHrFields(newHrFields);
  };

  const handleSubmit = async (selServ) => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://kops-enrty.vercel.app/api/businesses",
        {
          businessName,
          HrRate: hrrate,
          DriverPay: driverPay,
          businessType: selServ || "",
          businessOption: availableOptions[0],
          HR: hrFields,
          Active: true,
          userid: String(dataUser?.user?._id) || "",
        }
      );

      if (response.status === 201) {
        toast.show({
          status: "success",
          duration: 1000,
          render: () => {
            return (
              <Text
                allowFontScaling={false}
                style={tw`text-gray-500 rounded-lg bg-[#3897F9] text-white font-semibold text-xs p-2`}
              >
                🎉 Business created successfully! ! 🎉
              </Text>
            );
          },
        });
        setHit(hit + 1);
        navigation.navigate("Home");
      }
    } catch (error) {
      toast.show({
        description:
          error.response?.data?.message || "Failed to create business.",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Business Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Business Name"
            value={businessName}
            onChangeText={setBusinessName}
          />
          {errors.businessName && (
            <Text style={styles.errorText}>{errors.businessName}</Text>
          )}

          {isjcb ? null : <Text style={styles.label}> Driver Rate</Text>}
          {isjcb ? null : (
            <TextInput
              style={styles.input}
              placeholder="Rate"
              maxLength={10}
              keyboardType={`number-pad`}
              value={driverPay}
              onChangeText={setDriverPay}
            />
          )}
          {isjcb
            ? null
            : errors.hrrate && (
                <Text style={styles.errorText}>{errors.hrrate}</Text>
              )}
          <Text style={styles.label}>
            {" "}
            {isjcb ? `Driver` : `Workers`} Rate / {isjcb ? `Hour` : `Bag`}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Rate"
            maxLength={10}
            keyboardType={`number-pad`}
            value={hrrate}
            onChangeText={setHrrate}
          />
          {errors.hrrate && (
            <Text style={styles.errorText}>{errors.hrrate}</Text>
          )}
          <Text style={styles.label}>HR Details:</Text>
          {hrFields.map((hr, index) => (
            <View
              key={index}
              style={[
                tw`border border-[#ccc] rounded-xl p-2`,
                styles.hrDetailContainer,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="HR Name"
                value={hr.name}
                onChangeText={(value) => handleHrChange(index, "name", value)}
              />
              {errors[`hrName${index}`] && (
                <Text style={styles.errorText}>{errors[`hrName${index}`]}</Text>
              )}
              <TextInput
                style={styles.input}
                maxLength={10}
                placeholder="HR Mobile"
                value={hr.mobile}
                onChangeText={(value) => handleHrChange(index, "mobile", value)}
              />
              {errors[`hrMobile${index}`] && (
                <Text style={styles.errorText}>
                  {errors[`hrMobile${index}`]}
                </Text>
              )}
              {/* <TextInput
                style={styles.input}
                maxLength={6}
                placeholder="HR RATE"
                value={hr.rate}
                keyboardType={`number-pad`}
                onChangeText={(value) => handleHrChange(index, "rate", value)}
              />
              {errors[`hrRate${index}`] && (
                <Text style={styles.errorText}>{errors[`hrRate${index}`]}</Text>
              )} */}
              <View style={styles.switchContainer}>
                <Text>Active</Text>
                <Switch
                  value={hr.active}
                  onValueChange={() => toggleActiveHR(index)}
                />
              </View>
              <View style={tw`flex flex-row justify-start items-start `}>
                <TouchableOpacity
                  onPress={() => removeHrField(index)}
                  style={styles.removeButton}
                >
                  <Text>
                    <Trash2 size={24} color="red" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={addHrField} style={styles.addButton}>
            <Text style={tw`text-white font-bold`}>Add New</Text>
          </TouchableOpacity>

          {/* <Text style={styles.label}>Select Business Options:</Text>
            <FlatList
              data={availableOptions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (businessOption.includes(item)) {
                      setBusinessOption(businessOption.filter((option) => option !== item));
                    } else {
                      setBusinessOption([...businessOption, item]);
                    }
                  }}
                  style={[styles.optionButton, businessOption.includes(item) && styles.selectedOption]}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              numColumns={3}
            /> */}
          {/* {errors.businessOption && (
            <Text style={styles.errorText}>{errors.businessOption}</Text>
          )} */}

          <TouchableOpacity
            onPress={() => handleSubmit(selServ)}
            style={styles.submitButton}
          >
            <LinearGradient
              colors={["#3897F9", "#3897F9"]}
              style={styles.submitGradient}
            >
              {loading ? (
                <Spinner color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Create Business</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
  },
  formContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
    marginTop: 10,
    flex: 1,
  },
  selectedOption: {
    backgroundColor: "#d3d3d3",
  },
  optionText: {
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#000000",
    padding: 10,
    width: 100,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
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
  submitButton: {
    marginTop: 20,
  },
  submitGradient: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default BusiForm;
