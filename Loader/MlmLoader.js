import React from "react";
import { View, Text, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { Skeleton } from "native-base";
import tw from "twrnc";

const { width: windowWidth } = Dimensions.get("window");

const MlmLoader = () => {
  return (
    <ScrollView style={{ width: "100%" }}>
      <SafeAreaView
        style={tw`flex flex-col w-full justify-center items-center bg-white p-2 h-full`}
      >
        <View style={tw`flex flex-col justify-center items-center gap-8`}>
          <View
            style={tw`flex flex-row w-full h-[80px] justify-start items-start gap-3`}
          >
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
          </View>
          <View
            style={tw`flex flex-row w-full h-[80px] justify-start items-start gap-3`}
          >
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
          </View>
          <View
            style={tw`flex flex-row w-full h-[80px] justify-start items-start gap-3`}
          >
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
          </View>

          <View
            style={tw`flex flex-row w-full h-[80px] justify-start items-start gap-3`}
          >
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
          </View>
          <View
            style={tw`flex flex-row w-full h-[80px] justify-start items-start gap-3`}
          >
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
          </View>
          <View
            style={tw`flex flex-row w-full h-[80px] justify-start items-start gap-3`}
          >
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
          </View>
          <View
            style={tw`flex flex-row w-full h-[80px] justify-start items-start gap-3`}
          >
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
          </View>
          <View
            style={tw`flex flex-row w-full h-[80px] justify-start items-start gap-3`}
          >
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
            <Skeleton height={`20`} borderRadius={10} width={`20`} />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MlmLoader;
