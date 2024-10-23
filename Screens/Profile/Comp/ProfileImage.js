import React, { useState, useEffect } from "react";
import { Image, View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import {
  XCircle,
  ImagePlus,
  Edit3,
  Camera,
  GalleryHorizontal,
  Delete,
  Trash,
} from "lucide-react-native";
import { Icon } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import tw from "twrnc";
import { UiDataProvider } from "../../../UiContaxt/UiContaxt";

const IMAGE_KEY = "profileImage";

export default function ProfileImage() {
  const { color,imageUri, setImageUri } = UiDataProvider();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    retrieveImage();
  }, []);

  const retrieveImage = async () => {
    try {
      const savedImageUri = await SecureStore.getItemAsync(IMAGE_KEY);
      if (savedImageUri) {
        setImageUri(savedImageUri);
      }
    } catch (error) {
      // console.error("Error retrieving image from SecureStore:", error);
    }
  };

  const saveImage = async (uri) => {
    try {
      await SecureStore.setItemAsync(IMAGE_KEY, uri);
    } catch (error) {
      // console.error("Error saving image to SecureStore:", error);
    }
  };

  const pickImage = async (source) => {
    let result;
    if (source === "camera") {
      result = await ImagePicker?.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      setVisible(false);
    } else if (source === "gallery") {
      result = await ImagePicker?.launchImageLibraryAsync({
        mediaTypes: ImagePicker?.MediaTypeOptions?.Images,
        allowsEditing: true,
        quality: 1,
      });
      setVisible(false);
    }

    if (!result.canceled) {
      setImageUri(result?.assets[0]?.uri);
      saveImage(result?.assets[0]?.uri);
    }
  };

  const deleteImage = async () => {
    try {
      await SecureStore?.deleteItemAsync(IMAGE_KEY);
      setImageUri(null);
      setVisible(false);
    } catch (error) {
      // console.error("Error deleting image from SecureStore:", error);
    }
  };

  return (
    <>
      {imageUri ? (
        <View style={tw`flex items-start justify-start bg-transparent`}>
          <TouchableOpacity onPressIn={() => setVisible(!visible)}>
            <Image
              source={{ uri: imageUri }}
              style={[{ width: 80, height: 80 }, tw`rounded-full`]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={tw`flex justify-center bg-white rounded-full items-center border border-gray-400 p-4 `}
        >
          <Pressable
            onPress={() => setVisible(!visible)}
            style={tw`w-[50px] h-[40px] gap-3 justify-center items-center`}
          >
            <ImagePlus color="black" size={30} />
          </Pressable>
          <Text allowFontScaling={false} style={tw`text-[8px]`}>Upload Image..</Text>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPressIn={() => setVisible(false)}
          // Close modal when tapped outside
        >
          {/* Transparent view that allows touches to pass through */}
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
            }}
          />
        </TouchableOpacity>

        <View
          style={[
            { width: "100%", height: "20%" },
            { pointerEvents: "auto" },

            tw`  flex justify-center bg-gray-50  items-center  shadow-xl`,
          ]}
        >
          <View
            style={tw`flex flex-row gap-20 w-full top-0   justify-center items-center`}
          >
            {imageUri && (
              <View style={tw`flex flex-col gap-1 justify-center items-center`}>
                <TouchableOpacity
                  style={tw`bg-[${color}] p-3 rounded-full`}
                  onPressIn={deleteImage}
                >
                  <Icon as={<Trash size={30} color="#fff" />} />
                </TouchableOpacity>
                <Text allowFontScaling={false} style={tw`text-sm font-semibold`}>Delete</Text>
              </View>
            )}
            <View style={tw`flex flex-col gap-1 justify-center items-center`}>
              <TouchableOpacity
                style={tw`bg-[${color}] p-3 rounded-full`}
                onPressIn={() => pickImage("gallery")}
              >
                <Icon as={<ImagePlus size={30} color="#fff" />} />
              </TouchableOpacity>
              <Text allowFontScaling={false} style={tw`text-sm font-semibold`}>Gallery</Text>
            </View>
            <View style={tw`flex flex-col gap-1 justify-center items-center`}>
              <TouchableOpacity
                style={tw`bg-[${color}] p-3 rounded-full`}
                onPressIn={() => pickImage("camera")}
              >
                <Icon as={<Camera size={30} color="#fff" />} />
              </TouchableOpacity>
              <Text allowFontScaling={false} style={tw`text-sm font-semibold`}>Camera</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
