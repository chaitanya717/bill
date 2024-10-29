import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./TabNavigator";
import { UiDataProvider } from "../UiContaxt/UiContaxt";
import { DataService } from "../DataFetcherContext/FetchedData";
import AuthStack from "./Stacks/AuthStack";

import { Network } from "expo-network";
import { View, Text, Image, SafeAreaView, StatusBar } from "react-native";
import internet from "../assets/internet.gif";
import { useToast } from "native-base";
import * as SecureStore from "expo-secure-store";
import tw from "twrnc";
export default function MainNavigator() {
  const [isConnected, setIsConnected] = useState(true);
  const { color } = UiDataProvider();
  const toast = useToast();
 

  const { auth, getUserData,  } =
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
      <StatusBar animated={true} backgroundColor={color} />
      {isConnected === true ? (
        <NavigationContainer>
          {auth  === true ?
           <MainTabNavigator /> 
           : <AuthStack />}
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
