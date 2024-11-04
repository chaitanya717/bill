import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home,
  User,
  Gem,
  PlusCircle,
  Network,
  ShieldCheck,
} from "lucide-react-native";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import HomeStack from "./Stacks/HomeStack";
import { UiDataProvider } from "../UiContaxt/UiContaxt";
import ProfileStack from "./Stacks/Profilestack";
import { DataService } from "../DataFetcherContext/FetchedData";
import MainPlans from "../Screens/Plans/MainPlans";
import MainAdmin from "../Screens/Admin/MainAdmin";
const Tab = createBottomTabNavigator();
export default function TabNavigator() {
  const [actScreen, setActScreen] = useState();
  const navigation = useNavigation();

  const { dATAMLMUser } = DataService();
  const { authLoad, setAuthLoad, themecolor, bgcolor } = UiDataProvider();
  useEffect(() => {
    const unsubscribe = navigation?.addListener("state", () => {
      // Access the name of the active screen
      const activeScreenName = navigation?.getCurrentRoute().name;
      setActScreen(activeScreenName);
    });

    return unsubscribe;
  }, [navigation]);

  const color = "#3897F9";

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle:
            actScreen === "BusinessSelect" ||
            actScreen === "BuisnessForm" ||
            actScreen === "ListBusiness" ||
            actScreen === "addentry" ||
            actScreen === "report" ||
            actScreen === "Hr" ||
            // actScreen === "Home" ||
            authLoad === true
              ? {
                  // borderRadius: 20,
                  // backgroundColor:`${color}`,
                  height: 70,
                  display: "none",
                  backgroundColor: bgcolor,
                  // padding: 7,
                  // margin: 5,
                }
              : {
                  height: 68,
                  // borderRadius: 20,
                  backgroundColor: bgcolor,
                },

          tabBarShowLabel: true,

          tabBarLabelStyle: {
            color: color,
            // marginBottom: 5,
          },

          // tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ size, focused }) => {
            let iconComponent;
            if (route.name === "home") {
              iconComponent = (
                <>
                  <View
                    style={
                      focused
                        ? tw`flex flex-col  rounded-lg p-2  justify-center items-center`
                        : tw`flex flex-col justify-center items-center`
                    }
                  >
                    {focused ? (
                      <>
                        <View
                          style={tw` flex flex-col rounded-[120px] p-2 bg-[${color}] justify-center  items-center `}
                        >
                          <Home
                            width={25}
                            color={`#fff`}
                            strokeWidth={2}
                            style={tw`rounded-lg  `}
                          />
                          {/* <Text allowFontScaling={false}
                            style={tw`text-[#ffffff] font-semibold text-[9px]`}
                          >
                            {route.name}
                          </Text> */}
                        </View>
                      </>
                    ) : (
                      <>
                        <Home
                          width={25}
                          color={`black`}
                          strokeWidth={1.5}
                          style={tw``}
                        />
                      </>
                    )}
                  </View>
                </>
              );
            } else if (route.name === "user") {
              iconComponent = (
                <>
                  <View
                    style={
                      focused
                        ? tw`flex flex-col  rounded-lg p-2  justify-center items-center`
                        : tw`flex flex-col justify-center items-center`
                    }
                  >
                    {focused ? (
                      <>
                        <View
                          style={tw` flex flex-col rounded-[120px] p-2 bg-[${color}] justify-center items-center `}
                        >
                          <User
                            width={25}
                            color={"#fff"}
                            strokeWidth={2}
                            style={tw`rounded-lg  `}
                          />
                          {/* <Text allowFontScaling={false}
                            style={tw`text-[#ffffff] font-semibold text-[9px]`}
                          >
                            {route.name}
                          </Text> */}
                        </View>
                      </>
                    ) : (
                      <User
                        width={25}
                        strokeWidth={1.5}
                        color={`black`}
                        style={tw``}
                      />
                    )}
                  </View>
                </>
              );
            } else if (route.name === "Premium") {
              iconComponent = (
                <>
                  <View
                    style={
                      focused
                        ? tw`flex flex-col  rounded-lg p-2  justify-center items-center`
                        : tw`flex flex-col justify-center items-center`
                    }
                  >
                    {focused ? (
                      <>
                        <View
                          style={tw` flex flex-col rounded-[120px] p-2 bg-[${color}] justify-center items-center `}
                        >
                          <Gem
                            width={25}
                            color={"#fff"}
                            strokeWidth={2}
                            style={tw`rounded-lg  `}
                          />
                          {/* <Text allowFontScaling={false}
                            style={tw`text-[#ffffff] font-semibold text-[9px]`}
                          >
                            {route.name}
                          </Text> */}
                        </View>
                      </>
                    ) : (
                      <Gem
                        width={25}
                        strokeWidth={1.5}
                        color={`black`}
                        style={tw``}
                      />
                    )}
                  </View>
                </>
              );
            } else if (route.name === "Organization") {
              iconComponent = (
                <>
                  <View
                    style={
                      focused
                        ? tw`flex flex-col  rounded-lg p-2  justify-center items-center`
                        : tw`flex flex-col justify-center items-center`
                    }
                  >
                    {focused ? (
                      <>
                        <View
                          style={tw` flex flex-col rounded-[120px] p-2 bg-[${color}] justify-center items-center `}
                        >
                          <ShieldCheck
                            width={25}
                            color={"#fff"}
                            strokeWidth={2}
                            style={tw`rounded-lg  `}
                          />
                          {/* <Text allowFontScaling={false}
                            style={tw`text-[#ffffff] font-semibold text-[9px]`}
                          >
                            {route.name}
                          </Text> */}
                        </View>
                      </>
                    ) : (
                      <ShieldCheck
                        width={25}
                        strokeWidth={1.0}
                        color={`black`}
                        style={tw``}
                      />
                    )}
                  </View>
                </>
              );
            }
            return iconComponent;
          },
        })}
      >
        <Tab.Screen
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: {
              color: "black",
              fontSize: 9,
              fontWeight: "600",
              bottom: 9,
            },
          }}
          name="home"
          component={HomeStack}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Premium",
            tabBarLabelStyle: {
              color: "black",
              fontSize: 9,
              fontWeight: "600",
              bottom: 9,
            },
          }}
          name="Premium"
          component={MainPlans}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Admin",
            tabBarLabelStyle: {
              color: "black",
              fontSize: 9,
              fontWeight: "600",
              bottom: 9,
            },
          }}
          name="Organization"
          component={MainAdmin}
        />

        {/* 
        <Tab.Screen
          options={{
            tabBarLabel: "MLM",
            headerShown: false,
            headerTitle: ` `,
            tabBarLabelStyle: {
              color: `#636363`,
              fontSize: 9,
              marginBottom: 5,
            },
            headerLeft: () => (
              <TouchableOpacity style={tw`mr-5`}>
                <BuisnessName />
              </TouchableOpacity>
            ),
          }}
          name="Mlm"
          component={MLMStack}
        /> */}

        <Tab.Screen
          options={{
            headerTitle: "My Profile",
            headerShown: true,
            tabBarLabel: "My Profile",
            tabBarLabelStyle: {
              color: "black",
              fontSize: 9,
              fontWeight: "600",
              bottom: 9,
            },
          }}
          name="user"
          component={ProfileStack}
        />
      </Tab.Navigator>
    </>
  );
}
