import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ArrowLeft,
  Settings,
  Youtube,
  User,
  Menu,
  Download,
} from "lucide-react-native";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Linking,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";
import { Icon } from "native-base";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";
import SkeletonLoader from "../../Loader/SkeletonLoader";
import { UiDataProvider } from "../../UiContaxt/UiContaxt";

import Home from "../../Screens/Home/Home";
import { AllTempDataProvider } from "../../UiContaxt/TemplateDataContext";
import SelectBusType from "../../Screens/Home/COMP/SelectBusType";
import BusiForm from "../../Screens/Home/COMP/BusiForm";
import LIstBuisness from "../../Screens/Home/COMP/LIstBuisness";
import { DataService } from "../../DataFetcherContext/FetchedData";
import Crentry from "../../Screens/Home/COMP/Entry/Crentry";
import ShowReports from "../../Screens/Home/COMP/Entry/Showreports";
import Mainhr from "../../Screens/Home/COMP/HR/Mainhr";
import MainPlans from "../../Screens/Plans/MainPlans";

export default function HomeStack() {
  const {
    authLoad,
    setAuthLoad,
    themecolor,
    bannerSet,
    setBannerSet,
    color,
    setActionSheetVisible,
    actionSheetVisible,
    bgcolor,
  } = UiDataProvider();
  const { dataUser } = DataService();

  const Navigation = useNavigation();

  const Stack = createStackNavigator();

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

  return (
    <>
      <StatusBar />
      <Stack.Navigator
        initialRouteName={`Home`}
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
            headerShown: true,
            headerRight: () => (
              <View
                style={tw`mr-5 flex flex-row gap-4 justify-center items-center`}
              >
                {/* <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("https://www.youtube.com/@adsmaker365")
                  }
                  style={tw` flex flex-col justify-center items-center`}
                >
                  <Icon
                    size={7}
                    color={`danger.500`}
                    as={<Youtube name="person" />}
                  />
                  <Text
                    allowFontScaling={false}
                    style={tw`text-[7px] text-gray-800`}
                  >
                    Guide
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={tw`flex flex-col p-1 bg-gray-100 rounded-full  right-0 justify-center items-center`}
                ></TouchableOpacity>
              </View>
            ),
            headerLeft: () => (
              // <TouchableOpacity style={tw`mr-5`}>
              //   <BuisnessName />
              // </TouchableOpacity>
              <>
                <View
                  style={tw`flex flex-row  gap-0  justify-center items-center`}
                >
                  <TouchableOpacity
                    // onPress={() => setActionSheetVisible(true)}
                    style={tw`flex flex-col p-1  justify-center items-start`}
                  ></TouchableOpacity>
                  <TouchableOpacity
                    style={tw`flex flex-col p-1   justify-center items-start`}
                  >
                    <Text
                      allowFontScaling={false}
                      style={tw`text-[14px] font-semibold text-gray-600 `}
                    >
                      Hi,
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={[tw`text-[16px] font-bold text-[${color}]`]}
                    >
                      {dataUser?.user?.username || ""}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ),
          }}
          name="Home"
          component={authLoad === true ? SkeletonLoader : Home}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Select Services",
          }}
          name="BusinessSelect"
          component={SelectBusType}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Create Business",
          }}
          name="BuisnessForm"
          component={BusiForm}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Your Businesses",
          }}
          name="ListBusiness"
          component={LIstBuisness}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Add Entry",
          }}
          name="addentry"
          component={Crentry}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Reports",
          }}
          name="report"
          component={ShowReports}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "HR (Workers)",
          }}
          name="Hr"
          component={Mainhr}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Plans",
          }}
          name="Plan"
          component={MainPlans}
        />
      </Stack.Navigator>
    </>
  );
}
