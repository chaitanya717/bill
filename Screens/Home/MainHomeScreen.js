import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import tw from "twrnc";
import axios from "axios";
import { CalendarSearchIcon } from "lucide-react-native";

import { AllTempDataProvider } from "../../UiContaxt/TemplateDataContext";

import { DataService } from "../../DataFetcherContext/FetchedData";

import Whatsapp from "../../AppComp/Whatsapp";
import Tabs from "./Tabs";
import LIstBuisness from "./COMP/LIstBuisness";



const MainHomeScreen = () => {
  const { themecolor } = AllTempDataProvider();
  const { dATAMLMUser } = DataService();

  return (
    <>
      <View style={tw`bg-[${themecolor}] h-full`}>
      <Tabs/>
      </View>
    </>
  );
};

export default MainHomeScreen;
