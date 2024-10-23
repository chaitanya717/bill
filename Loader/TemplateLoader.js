import React from "react";
import { View, Text, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { Skeleton } from "native-base";
import tw from "twrnc";

const { width: windowWidth } = Dimensions.get("window");

const TemplateLoader = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={tw`flex flex-row   h-[90px]`}
    >
      {/* Header Skeleton */}
      {/* <View style={tw`mb-4 rounded-lg`}>
          <Skeleton borderRadius={10} height={20} width={windowWidth - 40} />
        </View>
        <View style={tw`mb-4`}>
          <Skeleton borderRadius={10} height={10} width={windowWidth - 40} />
        </View> */}

      {/* Content Skeleton */}

      <View
        style={tw`flex flex-row w-full h-[90px] justify-start items-start gap-2`}
      >
        <Skeleton height={90} borderRadius={10} width={90} />

        <Skeleton height={90} borderRadius={10} width={90} />

        <Skeleton height={90} borderRadius={10} width={90} />

        <Skeleton height={90} borderRadius={10} width={90} />

        <Skeleton height={90} borderRadius={10} width={90} />

        <Skeleton height={90} borderRadius={10} width={90} />
      </View>
    </ScrollView>
  );
};

export default TemplateLoader;
