import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text } from "react-native";
import { Icon } from "native-base";
import MainPlans from "../../Screens/Plans/MainPlans";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
export default function PremiumStack() {
  const Stack = createStackNavigator();
  const Navigation = useNavigation();

  const slideFromRight = ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  };
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          cardStyleInterpolator: slideFromRight,
        }}
        initialRouteName="Premium Plans"
      >
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => Navigation?.goBack()}
                style={tw`ml-3 flex flex-row gap-1`}
              >
                <Icon
                  size={5}
                  color="muted.700"
                  as={<ArrowLeft name="person" />}
                />
                <Text
                  allowFontScaling={false}
                  style={tw`text-black text-[17px] font-semibold capitalize`}
                >
                  Premium Plans
                </Text>
              </TouchableOpacity>
            ),
          }}
          name="Premium Plans"
          component={MainPlans}
        />
        {/* <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Checkout"
          component={Checkout}
        /> */}
        {/* <Stack.Screen
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 12, // Set the font size here
            },
            headerTitle:
              " Please Don't Refresh or Go back, Payment is processing ",
            headerLeft: () => {
              null;
            },
          }}
          name="Razorpay"
          component={RazorpayScreen}
        /> */}
      </Stack.Navigator>
    </>
  );
}
