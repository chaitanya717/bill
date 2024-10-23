import React from "react";
import { View, Text, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { Skeleton } from "native-base";
import tw from "twrnc";

const { width: windowWidth } = Dimensions.get("window");

const SkeletonLoader = () => {
  return (
    <ScrollView>
      <SafeAreaView style={tw`flex flex-col bg-white p-4 h-full`}>
        {/* Header Skeleton */}

        {/* Content Skeleton */}
        <View style={tw`flex flex-col gap-3`}>
          <View style={tw`flex justify-center items-center mb-4`}>
            <Skeleton borderRadius={10} height={200} width={windowWidth - 40} />
          </View>
          <View style={tw`mb-4 rounded-lg`}>
          <Skeleton borderRadius={10} height={20} width={windowWidth - 40} />
        </View>

          <View
            style={tw`flex flex-col w-full justify-start items-start gap-2`}
          >
            <View style={tw`flex flex-row mb-4`}>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
             
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
            </View>
            <View style={tw`flex flex-row mb-4`}>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
             
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
            </View>
            <View style={tw`flex flex-row mb-4`}>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
             
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
            </View>
            <View style={tw`flex flex-row mb-4`}>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
             
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
            </View>
            <View style={tw`flex flex-row mb-4`}>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
             
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
            </View>
            <View style={tw`flex flex-row mb-4`}>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
             
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
            </View>
            <View style={tw`flex flex-row mb-4`}>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
             
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
            </View>
            <View style={tw`flex flex-row mb-4`}>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
             
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
            </View>
            <View style={tw`flex flex-row mb-4`}>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
             
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
              <View style={tw`flex-1 mr-2`}>
                <Skeleton
                  height={20}
                  borderRadius={10}
                  width={windowWidth / 4 - 20}
                />
              </View>
            </View>
          </View>



        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SkeletonLoader;
