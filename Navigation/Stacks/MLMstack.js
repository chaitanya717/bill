import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainEditor from "../../Screens/Editor/MainEditor";
import { ArrowLeft, Settings, Youtube } from "lucide-react-native";
import MainHomeScreen from "../../Screens/Home/MainHomeScreen";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Linking,
  Image,
  ScrollView,
} from "react-native";

import { useSelector } from "react-redux";
import { Icon } from "native-base";
import tw from "twrnc";
import { Menu } from "lucide-react-native";
import MLMProForm from "../../Forms/MLMProForm";
import SearchCompany from "../../FetchComp/SearchCompany/SearchCompany";
import MainForm from "../../Forms/MainForm";
import { useNavigation } from "@react-navigation/native";
import SkeletonLoader from "../../Loader/SkeletonLoader";
import { UiDataProvider } from "../../UiContaxt/UiContaxt";
import BuisnessName from "../../AppComp/BuisnessName";
import MainMlm from "../../Screens/Mlm/MainMlm";
import BannerSetting from "../../Screens/Setting/Setting";
import MainLogoSelect from "../../SelectLogo/MainLogoSelect";
import { DataService } from "../../DataFetcherContext/FetchedData";
import UpdateMLMProfile from "../../Screens/Mlm/Setting/UpdateMlm";
import MainPlans from "../../Screens/Plans/MainPlans";
export default function MLMStack() {
  const {
    authLoad,
    setAuthLoad,
    themecolor,
    setActionSheetVisible,
    actionSheetVisible,
    color,
    bannerSet,
    setBannerSet,
  } = UiDataProvider();

  const { dATAMLMUser } = DataService();

  const Stack = createStackNavigator();
  const Navigation = useNavigation();
  const SelectedForm = useSelector((state) => {
    return state.FormType;
  });

  const slideFromRight = ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  };


  const text = SelectedForm?.TypeForm;
  let formattedText = text.replace(/-/g, " ");
  const text2 = SelectedForm?.SubType;
  let formattedText2 = text.replace(/-/g, " ");


  return (
    <>
      <Stack.Navigator
        initialRouteName="mlm"
        screenOptions={{
          headerStyle: {
            height: 60,

            backgroundColor: `${themecolor}`,
          },
          headerShadowVisible: true,

          cardStyleInterpolator: slideFromRight,
        }}
      >
        <Stack.Screen
          options={{
            headerTitle: null,
            headerTitleStyle: { display: "none" },
            headerShown: authLoad && authLoad === true ? false : true,
            // headerRight: () => (
            //   <View
            //     style={tw`mr-5 flex flex-row gap-4 justify-center items-center`}
            //   >
            //     {/* <Text allowFontScaling={false} style={tw`text-black`}>left</Text> */}
            //     <TouchableOpacity
            //       onPress={() => Linking.openURL("https://youtube.com")}
            //       style={tw` flex flex-col justify-center items-center`}
            //     >
            //       <Icon
            //         size={7}
            //         color={`danger.500`}
            //         as={<Youtube name="person" />}
            //       />
            //       <Text allowFontScaling={false} style={tw`text-[7px] text-gray-800`}>Guide</Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity>
            //       <Icon
            //         size={5}
            //         color="muted.800"
            //         as={<BellDot name="person" />}
            //       />
            //     </TouchableOpacity>
            //   </View>
            // ),
            // headerLeft: () => (
            //   <TouchableOpacity style={tw`mr-5`}>
            //     {/* <Text allowFontScaling={false} style={tw`text-black`}>left</Text> */}
            //     <BuisnessName />
            //   </TouchableOpacity>
            // ),
          }}
          name="MLM"
          component={authLoad === true ? SkeletonLoader : MainMlm}
        />

        {/* <Stack.Screen options={{}} name="Template" component={HomeScreen} /> */}
        {/* <Stack.Screen
          options={{
            headerTitle: "Create MLM Profile",
          }}
          name="MLMForm"
          component={MLMProForm}
        /> */}

        <Stack.Screen
          options={{
            headerTitle: ``,
            headerShown: true,

            headerLeft: () => (
              <TouchableOpacity
                onPress={() => Navigation?.goBack()}
                style={tw`ml-3 flex flex-row gap-1`}
              >
                <Icon
                  size={5}
                  color="muted.700"
                  as={<ArrowLeft name="person" />}
                />
                <Text allowFontScaling={false}
                  style={tw`text-black text-[17px] font-semibold capitalize`}
                >
                  {String(formattedText2)}
                </Text>
              </TouchableOpacity>
            ),
          }}
          name="MainForm"
          component={MainForm}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: null,
            headerTitleStyle: { display: "none" },
            headerShown: authLoad && authLoad === true ? false : true,
            headerLeft: () => (
              <>
                <View
                  style={tw`flex flex-row  gap-2  justify-center items-center`}
                >
                  <TouchableOpacity
                    onPressIn={() => setActionSheetVisible(true)}
                    style={tw`flex flex-col p-1  justify-center items-start`}
                  >
                    <Icon as={<Menu color={color} size={30} />} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`flex flex-col p-1   justify-center items-start`}
                  >
                    <Text allowFontScaling={false} style={tw`text-[10px] font-semibold text-gray-600 `}>
                      My Company
                    </Text>
                    <Text allowFontScaling={false} style={[tw`text-[14px] font-bold text-[${color}]`]}>
                      {dATAMLMUser[0]?.Company?.CompName || "Company Name"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={tw`flex flex-col p-1 right-1 justify-center items-center`}
              >
                <Image
                  source={{
                    uri: dATAMLMUser[0]?.Company?.logo,
                  }}
                  resizeMode="contain"
                  width={40}
                  height={40}
                  style={tw`bg-gray-100 rounded-xl`}
                />
              </TouchableOpacity>
            ),
          }}
          name="mlm"
          component={MainMlm}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              height: 60,
            },
            headerTitle: `${String(
              formattedText === "Quate Banner" ||
                formattedText === "Quate BannerHome"
                ? "Motivational Banner"
                : formattedText2
            )}`,
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => Navigation.navigate("mlm")}
                style={tw`ml-3`}
              >
                <Text allowFontScaling={false} style={tw`text-black`}>left</Text>
                <Icon
                  size={5}
                  color="muted.700"
                  as={<ArrowLeft name="person" />}
                />
                {/* <Text allowFontScaling={false}>fhfgh</Text> */}
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => Navigation?.navigate("Setting", "nmenu")}
                style={tw`mr-3`}
              >
                <Text allowFontScaling={false} style={tw`text-black text-xs`}>left</Text>
                <Icon size={5} color="black" as={<Settings name="person" />} />
                {/* <Text allowFontScaling={false}>fhfgh</Text> */}
              </TouchableOpacity>
            ),
          }}
          name="Editor"
          component={MainEditor}
        />
        {/* <Stack.Screen
          name="Setting"
          options={{
            headerTitle: "Banner Settings ",
          }}
          component={BannerSetting}
        />
        <Stack.Screen
          name="UpdateMlmPro"
          options={{
            headerShown: false,
          }}
          component={UpdateMLMProfile}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="logosel"
          component={MainLogoSelect}
        /> */}
      </Stack.Navigator>
    </>
  );
}
