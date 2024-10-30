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

  const validate = () => {
    const newErrors = {};
    if (!businessName) newErrors.businessName = "Business name is required.";

    hrFields.forEach((hr, index) => {
      if (!hr.name)
        newErrors[`hrName${index}`] = `HR name is required for HR ${
          index + 1
        }.`;
      if (!hr.mobile)
        newErrors[`hrMobile${index}`] = `HR mobile is required for HR ${
          index + 1
        }.`;
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
                style={tw`text-gray-500 rounded-lg bg-[#00df63] text-white font-semibold text-xs p-2`}
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
              colors={["#00bf63", "#00bf63"]}
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
