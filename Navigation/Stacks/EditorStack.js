import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainForm from "../../Forms/MainForm";
import MLMProForm from "../../Forms/MLMProForm";
import { Text, TouchableOpacity } from "react-native";
import MainEditor from "../../Screens/Editor/MainEditor";
import { ArrowLeft } from "lucide-react-native";
import { Icon } from "native-base";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
export default function EditorStack() {
  const Stack = createStackNavigator();
  const Navigation = useNavigation();
  return (
    <>
      <Stack.Navigator initialRouteName="Editor">
        <Stack.Screen
          options={{
            headerLeft: () => (
              
              <TouchableOpacity
                onPress={() => Navigation.navigate("mlm")}
                style={tw`ml-3`}
              >
                {/* <Text allowFontScaling={false} style={tw`text-black`}>left</Text> */}
                <Icon
                  size={5}
                  color="muted.700"
                  as={<ArrowLeft name="person" />}
                />
              </TouchableOpacity>
            ),
          }}
          name="Editor"
          component={MainEditor}
        />
        <Stack.Screen name="Form" component={MainForm} />
        <Stack.Screen name="MLMForm" component={MLMProForm} />
        
      </Stack.Navigator>
    </>
  );
}
