import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./TabNavigator";
import { UiDataProvider } from "../UiContaxt/UiContaxt";
import { DataService } from "../DataFetcherContext/FetchedData";
import AuthStack from "./Stacks/AuthStack";

import { Network } from "expo-network";
import { View, Text, Image,SafeAreaView,StatusBar } from "react-native";
import internet from "../assets/internet.gif";
import { useToast } from "native-base";
import * as SecureStore from "expo-secure-store";
import tw from "twrnc";
export default function MainNavigator() {
  const [isConnected, setIsConnected] = useState(true);
  const { color } = UiDataProvider();
  const toast = useToast();
  useEffect(() => {
    const checkNetworkStatus = async () => {
      try {
        const response = await fetch("https://www.google.com", {
          method: "HEAD",
        });
        const isOnline = response?.ok;
        setIsConnected(isOnline);
        toast.show({
          position: "bottom",
          duration: 600,
          render: () => {
            return (
              // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={2}>
              <Text
                allowFontScaling={false}
                style={tw`text-gray-500 rounded-lg bg-[${color}] text-white font-semibold text-xs p-2`}
              >
                🎉 You Are online 🎉
              </Text>
              // </Box>
            );
          },
        });
      } catch (error) {
        setIsConnected(false); // Update isConnected immediately if network check fails
        toast.show({
          position: "bottom",
          duration: 1500,
          render: () => {
            return (
              // <Box bg={`gray.100`} px="2" py="1" p={2} rounded={`3xl`} mb={0}>
              <Text
                allowFontScaling={false}
                style={tw`text-gray-500 rounded-lg bg-red-500 text-white font-semibold text-xs p-2`}
              >
                You Are offline
              </Text>
              // </Box>
            );
          },
        });
      }
    };

    // Initial check
    checkNetworkStatus();

    // Subscribe to network state changes
    const unsubscribe = Network?.addNetworkChangeListener(({ isConnected }) => {
      setIsConnected(isConnected);
    });

    // Cleanup the event listener when the component is unmounted
    return () => {
      unsubscribe?.remove();
    };
  }, []);

  const { auth, getUserData, dATAMLMUser, fetchMlmUserData, userData } =
    DataService();
  const [show, setShow] = useState(true);

  setTimeout(() => {
    setShow(false);
  }, 3000);

  useEffect(() => {
    const getUser = async () => {
      try {
        await getUserData();
      } catch (error) {}
    };
    getUser();
  }, [auth]);

  return (
    <>
   
        <StatusBar
          animated={true}
          backgroundColor={color}
        />
      {isConnected === true ? (
        <NavigationContainer>
          {/* { auth === true ? (
            <MainTabNavigator />
          ) : (
           
          )} */}
           <MainTabNavigator />
           {/* <AuthStack /> */}
        </NavigationContainer>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            gap: 1,
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            style={{ width: 25, height: 25 }}
            resizeMode="contain"
            source={internet}
          />
          <Text allowFontScaling={false} style={tw`text-xs top-1 `}>
            No Internet Connection !
          </Text>
        </View>
        
      )}
      
    </>
  );
}
