import React, { useRef, useState, useEffect } from "react";

import { XCircle, EyeOffIcon, EyeIcon } from "lucide-react-native";
import {
  View,
  Text,
  ScrollView,
  Image,
  Switch,
  PanResponder,
  Animated,
  Pressable,
  Modal,
} from "react-native";
import tw from "twrnc";
import { UiDataProvider } from "../../UiContaxt/UiContaxt";
import TopUplineImages from "../../Forms/ImageForms/TopUplineImages";
import GroupOfImages from "../../Forms/ImageForms/GroupOfImages";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AllTempDataProvider } from "../../UiContaxt/TemplateDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SocialMedia from "../../Forms/Comp/SocialMedia";
import LogoInput from "../../Forms/ImageForms/LogoInput";
import { Icon } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { DataService } from "../../DataFetcherContext/FetchedData";
const BannerSetting = () => {
  const Navigation = useNavigation();
  const { userData } = DataService();
  const route = useRoute();
  const {
    bannerSet,
    setBannerSet,
    showTop,
    setShowTop,
    logosocial,
    setLogosocial,
    logoshow,
    setLogoshow,
    setActionSheetVisible,
    color,
  } = UiDataProvider();

  const {
    upline,
    setUpline,
    showcase,
    setShowcase,
    social,
    setSocial,
    logo,
    setLogo,
    logo1,
    setLogo1,
    logo2,
    setLogo2,
    company,
    predLogo,
    setPredLogo,
  } = AllTempDataProvider();
  const DataOfUSer = userData?.data;
  const storeData = (DataOfUSer) => {
    try {
      const jsonValue = JSON.stringify({
        upline,
        showcase,
      });
      // AsyncStorage?.setItem("MLM", jsonValue);
      const dataofshow = {
        showTop: showTop,
        logosocial: logosocial,
        logoshow: logoshow,
      };
      const jsonValue2 = JSON.stringify(dataofshow);
      AsyncStorage?.setItem(`${String(DataOfUSer?.mobileNo)}`, jsonValue);
      AsyncStorage?.setItem(
        `${String(DataOfUSer?.mobileNo + "show")}`,
        jsonValue2
      );
      Navigation.goBack();
      if (route?.params === "menu") {
        setActionSheetVisible(true);
      }
    } catch (error) {}
  };

  const handleSwitchToggle = () => {
    setShowTop(!showTop);
  };
  const toggleSwitch = () => setShowTop((previousState) => !previousState);
  const toggleSwitch2 = () => setLogoshow((previousState) => !previousState);
  const toggleSwitch3 = () => setLogosocial((previousState) => !previousState);
  const handleSwitchTogglelogo = () => {
    setLogoshow(!logoshow);
  };
  const handleSwitchTogglesocial = () => {
    setLogosocial(!logosocial);
  };

  return (
    <>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={bannerSet}
        onRequestClose={() => setBannerSet(false)}
      > */}
      <View
        style={[
          { width: "100%", height: "100%" },
          tw`  flex justify-start bg-white  items-center   `,
        ]}
      >
        <ScrollView
          style={[{ width: "100%", height: "100%", padding: 15 }]}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={tw`flex flex-col justify-center w-full mb-10  items-center  gap-6`}
          >
            <View
              style={tw`flex flex-col justify-between w-full   items-center  gap-4`}
            >
              <View
                style={tw`flex flex-row border border-gray-400 w-full p-2 rounded-lg justify-between gap-4 items-center`}
              >
                <Text
                  allowFontScaling={false}
                  style={tw`text-[13px] font-semibold `}
                >
                  Show Topupline Images{" "}
                </Text>
                <View
                  style={tw`flex flex-row bg-white  p-2 rounded-lg justify-center gap-6 items-center`}
                >
                  {/* {showTop === true ? (
                    <Pressable
                      onPress={() => setShowTop(!showTop)}
                      style={tw`p-2 ${
                        showTop === true ? `bg-[${color}]` : `bg-gray-200`
                      } rounded-lg `}
                    >
                      <Icon
                        size={10}
                        color={showTop === true ? `white` : `black`}
                        as={<EyeIcon />}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => setShowTop(!showTop)}
                      style={tw`p-2 ${`bg-gray-200`} rounded-lg `}
                    >
                      <Icon size={10} color={`black`} as={<EyeOffIcon />} />
                    </Pressable>
                  )} */}
                  <Switch
                    value={showTop}
                    // trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={showTop ? color : color}
                    onValueChange={toggleSwitch}
                  />
                </View>
              </View>
              <View
                style={tw`flex flex-row border w-full  border-gray-400 p-2 rounded-lg justify-between gap-4 items-center`}
              >
                <Text
                  allowFontScaling={false}
                  style={tw`text-[13px] font-semibold `}
                >
                  Show Company Logos{" "}
                </Text>
                <View
                  style={tw`flex flex-row bg-white  p-2 rounded-lg justify-center gap-6 items-center`}
                >
                  {/* {logoshow === true ? (
                    <Pressable
                      onPress={() => setLogoshow(!logoshow)}
                      style={tw`p-2 ${
                        logoshow === true ? `bg-[${color}]` : `bg-gray-200`
                      } rounded-lg `}
                    >
                      <Icon
                        size={10}
                        color={logoshow === true ? `white` : `black`}
                        as={<EyeIcon />}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => setLogoshow(!logoshow)}
                      style={tw`p-2 ${`bg-gray-200`} rounded-lg `}
                    >
                      <Icon size={10} color={`black`} as={<EyeOffIcon />} />
                    </Pressable>
                  )} */}
                  <Switch
                    value={logoshow}
                    // trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={showTop ? color : color}
                    onValueChange={toggleSwitch2}
                  />
                </View>
              </View>
              <View
                style={tw`flex flex-row border w-full  border-gray-400 p-2 rounded-lg justify-between gap-4 items-center`}
              >
                <Text
                  allowFontScaling={false}
                  style={tw`text-[13px] font-semibold `}
                >
                  Show Social Media{" "}
                </Text>
                <View
                  style={tw`flex  flex-row bg-white  p-2 rounded-lg justify-center gap-6 items-center`}
                >
                  {/* {logosocial === true ? (
                    <Pressable
                      onPress={() => setLogosocial(!logosocial)}
                      style={tw`p-2 ${
                        logosocial === true ? `bg-[${color}]` : `bg-gray-200`
                      } rounded-lg `}
                    >
                      <Icon
                        size={10}
                        color={logosocial === true ? `white` : `black`}
                        as={<EyeIcon />}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => setLogosocial(!logosocial)}
                      style={tw`p-2 ${`bg-gray-200`} rounded-lg `}
                    >
                      <Icon size={10} color={`black`} as={<EyeOffIcon />} />
                    </Pressable>
                  )} */}
                  <Switch
                    value={logosocial}
                    // trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={showTop ? color : color}
                    onValueChange={toggleSwitch3}
                  />
                </View>
              </View>
            </View>
            <LogoInput
              logo={logo}
              setLogo={setLogo}
              logo1={logo1}
              setLogo1={setLogo1}
              logo2={logo2}
              setLogo2={setLogo2}
              predLogo={predLogo}
              setPredLogo={setPredLogo}
              company={company}
            />
            <TopUplineImages upline={upline} setUpline={setUpline} />
            <View style={tw`h-[150px] w-full`}>
              <GroupOfImages showcase={showcase} setShowcase={setShowcase} />
            </View>
            <SocialMedia social={social} setSocial={setSocial} />
            <Pressable
              onPress={() => storeData(DataOfUSer)}
              style={tw`text-center w-full flex justify-center rounded-lg items-center`}
            >
              <LinearGradient
                style={tw`text-center w-full flex justify-center p-4 rounded-lg items-center`}
                colors={["#00bf63", "#005f33"]}
              >
                <Text
                  allowFontScaling={false}
                  style={tw`text-sm text-white font-semibold`}
                >
                  Save & Close{" "}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {/* </Modal> */}
    </>
  );
};

export default BannerSetting;
