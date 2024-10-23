import React from "react";
import { View, Text, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { Skeleton } from "native-base";
import tw from "twrnc";

const { width: windowWidth } = Dimensions.get("window");

const PremiumLoader = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={tw`flex flex-col bg-white p-4 h-full`}>
        {/* Header Skeleton */}
        {/* <View style={tw`mb-4 rounded-lg`}>
          <Skeleton borderRadius={10} height={20} width={windowWidth - 40} />
        </View>
        <View style={tw`mb-4`}>
          <Skeleton borderRadius={10} height={10} width={windowWidth - 40} />
        </View> */}

        {/* Content Skeleton */}
        <View style={tw`flex flex-col gap-3`}>
          <View style={tw`flex justify-center items-center mb-4`}>
            <Skeleton borderRadius={10} height={200} width={windowWidth - 40} />
          </View>
          <View style={tw`flex justify-center items-center mb-4`}>
            <Skeleton borderRadius={10} height={200} width={windowWidth - 40} />
          </View>
          <View style={tw`flex justify-center items-center mb-4`}>
            <Skeleton borderRadius={10} height={200} width={windowWidth - 40} />
          </View>
          <View style={tw`flex justify-center items-center mb-4`}>
            <Skeleton borderRadius={10} height={200} width={windowWidth - 40} />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PremiumLoader;
