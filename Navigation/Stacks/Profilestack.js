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
import MainHomeScreen from "../../Screens/Home/MainHomeScreen";
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
import { useNavigation } from "@react-navigation/native";

import { UiDataProvider } from "../../UiContaxt/UiContaxt";
import { DataService } from "../../DataFetcherContext/FetchedData";
import ChangePassword from "../../Screens/Profile/Comp/ChangePassword";
import MainProfile from "../../Screens/Profile/MainProfile";
import Help from "../../Screens/Profile/Comp/Help";
import Term from "../../Screens/Profile/Comp/Term";
import Policy from "../../Screens/Profile/Comp/Policy";

export default function ProfileStack() {
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
  const { dATAMLMUser, subscribe, fetchMlmUserData, userData } = DataService();
  const DataOfMlmSubscribe = subscribe?.LimitedData?.map((i) => {
    return i?.attributeToBeUpdated || i;
  });
  const userId = userData?.data?.mobileNo;
  useEffect(() => {
    fetchMlmUserData(userId);
  }, [userId]);
  const filteredData = DataOfMlmSubscribe?.filter((item) => {
    return (
      item?.Expire === false &&
      // new Date(item?.ValideUpto) > new Date() &&
      item?.Active === true
    );
  });

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
  let formattedText = text?.replace(/-/g, " ");
  const text2 = SelectedForm?.SubType;
  let formattedText2 = text2?.replace(/-/g, " ");
  // const initial = dATAMLMUser[0]?.Company?.CompName ? "Home" : "Company";
  return (
    <>
      <Stack.Navigator
        initialRouteName={`User`}
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
            headerShown: false,
            headerTitle: "My Profile",
          }}
          name="User"
          component={MainProfile}
        />
        <Stack.Screen
          name="changepass"
          options={{
            headerShown: false,
            // headerLeft: () => (
            //   <TouchableOpacity
            //     onPress={() => Navigation?.navigate("User")}
            //     style={tw`ml-3 flex flex-row gap-1`}
            //   >
            //     {/* <Icon
            //       size={5}
            //       color="muted.700"
            //       as={<ArrowLeft name="person" />}
            //     /> */}
            //     <Text allowFontScaling={false}
            //       style={tw`text-black text-[17px] font-semibold capitalize`}
            //     >
            //       Change Pin
            //     </Text>
            //   </TouchableOpacity>
            // ),
          }}
          component={ChangePassword}
        />
        <Stack.Screen
          name="Support"
          options={{
            headerShown: false,
          }}
          component={Help}
        />
        <Stack.Screen
          name="Term & Condition"
          options={{
            headerShown: false,
          }}
          component={Term}
        />
        <Stack.Screen
          name="policy"
          options={{
            headerShown: false,
          }}
          component={Policy}
        />
      </Stack.Navigator>
    </>
  );
}
