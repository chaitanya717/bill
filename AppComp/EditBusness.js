import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { XCircle, ImagePlus } from "lucide-react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Icon, Spinner, useToast } from "native-base";
import tw from "twrnc";
import { UiDataProvider } from "../UiContaxt/UiContaxt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const EditBuisness = () => {
  const Navi = useNavigation();
  const {
    color,
    themecolor,
    bnCall,
    setBnCall,
    bname,
    setBname,
    imagesBn,
    setImagesBn,
    fetchBName,
  } = UiDataProvider();

  const [showModal, setShowModal] = useState(false);
  const toast = useToast();

  const handleInputChange = (name, text) => {
    setBname((prev) => ({
      ...prev,
      [name]: text,
    }));
  };

  useEffect(() => {
    fetchBName();
  }, []);

  const saveBName = async (bname, img, bnCall) => {
    try {
      setShowModal(true);
      setTimeout(() => {
        const DataBuisness = {
          logo: img,
          info: bname,
        };
        AsyncStorage.setItem("bname", JSON.stringify(DataBuisness));
        setShowModal(false);
        toast.show({
          position: "bottom",
          duration:900,
          render: () => {
            return (
              <Text allowFontScaling={false}
                style={tw`text-gray-500 rounded-lg bg-[${color}] text-white font-semibold text-xs p-2`}
              >
                🎉 {`Buisness Profile Updated Sucessfully`}! 🎉
              </Text>
            );
            W;
          },
        });
        fetchBName();
        Navi?.goBack();
      }, 1000);
    } catch (error) {}
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker?.launchImageLibraryAsync({
        mediaTypes: ImagePicker?.MediaTypeOptions?.Images,
        allowsEditing: true,
        // aspect: [16, 5],
        quality: 1,
      });

      if (result && !result.canceled) {
        setImagesBn({ uri: result?.assets[0]?.uri || "ubu" });
      }
    } catch (error) {}
  };

  const deleteImage = () => {
    setImagesBn(null);
  };

  return (
    <>
      <ScrollView
        style={tw`bg-[${themecolor}] w-full h-full`}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={tw`flex flex-col  w-full p-10 justify-center items-start gap-5`}
        >
          {imagesBn?.uri ? (
            <View style={{ marginRight: 10, marginTop: 1 }}>
              <TouchableOpacity onPress={deleteImage}>
                <Icon color={`danger.400`} as={<XCircle size={20} />} />
              </TouchableOpacity>
              <Image
                source={{ uri: imagesBn?.uri }}
                style={{ borderRadius: 20, width: 100, height: 100 }}
                contentFit={`contain`}
                contentPosition={`center`}
              />
            </View>
          ) : (
            <View
              style={tw`flex flex-col w-full justify-center items-start gap-3`}
            >
              <Text allowFontScaling={false} style={tw`text-[12px]  text-gray-600 `}>Logo</Text>
              <TouchableOpacity
                onPress={pickImage}
                style={tw`border     rounded-lg border-gray-300 p-7 flex flex-col justify-center items-center`}
              >
                <ImagePlus style={tw``} color="black" size={25} />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={tw`flex flex-col w-full justify-center items-start gap-3`}
          >
            <Text allowFontScaling={false} style={tw`text-[12px] text-gray-600 `}>Business Name</Text>
            <TextInput
              value={bname?.bname}
              maxLength={40}
              autoComplete={"off"}
              onChangeText={(e) => handleInputChange("bname", e)}
              placeholder="Business Name"
              style={tw`p-2 border border-gray-400 text-[12px] font-semibold text-[${color}] rounded-lg w-full`}
            />
          </View>
          <View
            style={tw`flex flex-col w-full justify-center items-start gap-3`}
          >
            <Text allowFontScaling={false} style={tw`text-[12px] text-gray-600 `}>Mobile No</Text>
            <TextInput
              value={bname?.mobileNo}
              maxLength={10}
              keyboardType={`phone-pad`}
              autoComplete={"off"}
              onChangeText={(e) => handleInputChange("mobileNo", e)}
              placeholder="Mobile No"
              style={tw`p-2 border border-gray-400 text-[12px] font-semibold text-[${color}] rounded-lg w-full`}
            />
          </View>
          <View
            style={tw`flex flex-col w-full justify-center items-start gap-3`}
          >
            <Text allowFontScaling={false} style={tw`text-[12px] text-gray-600 `}>Address</Text>
            <TextInput
              value={bname?.adress}
              maxLength={40}
              autoComplete={"off"}
              onChangeText={(e) => handleInputChange("adress", e)}
              placeholder="Address"
              style={tw`p-2 border border-gray-400 text-[12px] font-semibold text-[${color}] rounded-lg w-full`}
            />
          </View>
          <View
            style={tw`flex flex-col w-full justify-center items-start gap-3`}
          >
            <Text allowFontScaling={false} style={tw`text-[12px] text-gray-600 `}>Website</Text>
            <TextInput
              value={bname?.website}
              autoComplete={"off"}
              maxLength={60}
              onChangeText={(e) => handleInputChange("website", e)}
              placeholder="www.example.com"
              style={tw`p-2 border border-gray-400 text-[12px] font-semibold text-[${color}] rounded-lg w-full`}
            />
          </View>
          {showModal === true ? (
            <TouchableOpacity
              style={tw`bg-[${color}] w-full rounded-xl p-3 flex justify-center items-center`}
            >
              <Spinner color={`#fff`} size={`sm`} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => saveBName(bname, imagesBn, bnCall)}
              style={tw`bg-[${color}] w-full rounded-xl p-3 flex justify-center items-center`}
            >
              <Text allowFontScaling={false} style={tw`text-sm text-white  font-semibold`}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default EditBuisness;
