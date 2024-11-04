import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";

import { DataService } from "../../DataFetcherContext/FetchedData";
import MainHomeScreen from "./MainHomeScreen";

const Home = () => {
  const { dataUser, hit, setHit } = DataService();
  useEffect(() => {
    setHit(hit + 1);
  }, []);
  return (
    <>
      <MainHomeScreen />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
