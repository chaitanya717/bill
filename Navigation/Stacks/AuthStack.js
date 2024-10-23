import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../../Screens/Auth/SignInScreen";
import VerifyOtp from "../../Screens/Auth/VrifyOtp";
import Signup from "../../Screens/Auth/Signup";
import ForgetPassword from "../../Screens/Auth/ForgetPassword";
import SetNewPassword from "../../Screens/Auth/SetNewPassword";
import Policy from "../../Screens/Profile/Comp/Policy";
import Term from "../../Screens/Profile/Comp/Term";
export default function AuthStack() {
  const Stack = createStackNavigator();

  const slideFromRight = ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current?.progress.interpolate({
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
        initialRouteName={`SignIn`}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: slideFromRight,
        }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Privacy Policy",
          }}
          name="policys"
          component={Policy}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Term & Condition",
          }}
          name="terms"
          component={Term}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Verify-Otp"
          component={VerifyOtp}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerTitle: "Forget Password",
          }}
          name="ForgetPassword"
          component={ForgetPassword}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerTitle: "Forget Password",
          }}
          name="ForgetPasswordOnly"
          component={SetNewPassword}
        />
        {/* <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Splash"
          component={SpalshScreen}
        /> */}
      </Stack.Navigator>
    </>
  );
}
