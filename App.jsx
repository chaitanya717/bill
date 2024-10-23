import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, Linking, BackHandler } from "react-native";
import MainNavigator from "./Navigation/MainNavigator";
import { UiContaxt } from "./UiContaxt/UiContaxt";
import * as ScreenCapture from "expo-screen-capture";
import { useCallback } from "react";
import { Spinner, NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { TempDataContaxt } from "./UiContaxt/TemplateDataContext";
import { useFonts } from "expo-font";
import { FetchedData } from "./DataFetcherContext/FetchedData";
import Store from "./Redux/Store";
import { EditorContaxtGlobal } from "./UiContaxt/EditorContext";
import Constants from "expo-constants";
import axios from "axios";

import { usePushNotifications } from "./usePushNotifications";

export default function App() {
  const [isCheckingForUpdate, setIsCheckingForUpdate] = useState(false);
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  // useEffect(() => {
  //   async function preventScreenCapture() {
  //     await ScreenCapture?.preventScreenCaptureAsync();
  //   }
  //   preventScreenCapture();

  //   return () => {
  //     ScreenCapture?.allowScreenCaptureAsync();
  //   };
  // }, []);

  // const CheckUpdate = (availableVersion, currentVersion) => {
  //   setIsCheckingForUpdate(availableVersion !== currentVersion);
  //   return availableVersion !== currentVersion;
  // };

  // const hndlup = () => {
  //   Linking.openURL(
  //     "https://play.google.com/store/apps/details?id=com.Admaker365.app"
  //   );

  //   BackHandler.exitApp();
  // };

  // useEffect(() => {
  //   const checkForUpdates = async () => {
  //     try {
  //       const res = await axios.get("https://phonepe-ten.vercel.app/version");
  //       const data = res.data;
  //       const currentVersion = "10"; // Replace with the actual current version
  //       const availableVersion = data.version; // Adjust based on your actual data structure
  //       if (availableVersion && CheckUpdate(availableVersion, currentVersion)) {
  //         Alert.alert(
  //           "Update Available",
  //           "A new update is available. Please update the app now. Otherwise You Cannot Use App !",
  //           [
  //             {
  //               text: "Update",
  //               onPress: async () => {
  //                 try {
  //                   hndlup();
  //                 } catch (error) {}
  //               },
  //             },
  //           ],
  //           { cancelable: false }
  //         );
  //       }
  //     } catch (error) {}
  //   };

  //   checkForUpdates();
  // }, []);

  // const [fontsLoaded] = useFonts({
  //   "GreatVibes-Regular": require("./assets/Fonts/GreatVibes-Regular.ttf"),
  //   "FloryannaDemo-pnlK": require("./assets/Fonts/FloryannaDemo-pnlK.ttf"),
  //   "ChrustyRock-ORLA": require("./assets/Fonts/ChrustyRock-ORLA.ttf"),
  //   Khand: require("./assets/Fonts/Khand.ttf"),
  //   "CanisteDemoSemibold-vLAZ": require("./assets/Fonts/CanisteDemoSemibold-vLAZ.ttf"),
  //   Poppins: require("./assets/Fonts/Poppins.ttf"),
  //   ShortBaby: require("./assets/Fonts/ShortBaby-Mg2w.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return (
  //     // You might want to return a loading indicator or splash screen here
  //     <View>{/* <Text>Loading...</Text> */}</View>
  //   );
  // }

  return (
    <>
      <NativeBaseProvider>
        <Provider store={Store}>
          <TempDataContaxt>
            <UiContaxt>
              <EditorContaxtGlobal>
                <FetchedData>
                  <MainNavigator />
                </FetchedData>
              </EditorContaxtGlobal>
            </UiContaxt>
          </TempDataContaxt>
        </Provider>
      </NativeBaseProvider>
    </>
  );
}
