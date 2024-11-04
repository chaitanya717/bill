import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Share,
  Linking,
  Pressable,
} from "react-native";
import { Path, Svg } from "react-native-svg";
import React from "react";
import { DataService } from "../../../DataFetcherContext/FetchedData";
import tw from "twrnc";
import {
  User,
  CircleUserRound,
  MailCheck,
  ArrowRightCircle,
  PhoneCall,
  StarIcon,
  Lock,
  UserCircle,
  Instagram,
  Facebook,
  X,
  Youtube,
  SmilePlus,
  Headphones,
  LucideMonitorPause,
  Contact2Icon,
  PhoneIncoming,
} from "lucide-react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, QuestionIcon } from "native-base";
import { UiDataProvider } from "../../../UiContaxt/UiContaxt";
import ProfileImage from "./ProfileImage";
import ChangePassword from "./ChangePassword";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AllTempDataProvider } from "../../../UiContaxt/TemplateDataContext";
import { PhoneCallIcon, MessagesSquare } from "lucide-react-native";
import * as Updates from "expo-updates";

const ProfileCard = () => {
  const { dataUser, setAuth } = DataService();
  const { color, bgcolor } = UiDataProvider();
  const Navigation = useNavigation();
  const logOut = async () => {
    await SecureStore?.deleteItemAsync("userData");
    setTimeout(() => {
      setAuth(false);
    }, 700);
  };

  const shareApp = async () => {
    try {
      const url =
        "https://play.google.com/store/apps/details?id=com.Admaker365.app";
      // Replace 'com.example.app' with the actual package name of your app on Google Play Store
      const message = `Check out my app: ${url}`;

      await Share.share({
        message: message,
      });
    } catch (error) {
      // console.error("Error sharing app:", error);
    }
  };

  return (
    <View style={[{ width: "100%", height: "100%", backgroundColor: "#fff" }]}>
      <ScrollView
        style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            {
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              marginBottom: 10,
              marginTop: 10,
            },
            tw`  p-2 flex flex-col gap-6 justify-start items-center`,
          ]}
        >
          <ProfileImage />

          <View
            style={[
              { width: "95%" },
              tw`flex    flex-col  justify-center items-center gap-3`,
            ]}
          >
            <View
              style={tw`flex flex-col w-full   justify-center items-start p-2  border border-gray-400 rounded-lg gap-2`}
            >
              <View
                style={tw`flex flex-row left-2 justify-center items-center gap-1`}
              >
                {/* <UserRound /> */}
                <User width={20} color={`#808080`} style={tw`rounded-lg  `} />
                <Text
                  allowFontScaling={false}
                  style={tw`text-[13px] text-gray-500`}
                >
                  Name
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={tw`text-[14px] text-[${color}] font-bold  left-2 `}
              >
                {dataUser?.user?.username}
              </Text>
            </View>

            <View
              style={tw`flex flex-col w-full justify-center items-start p-2  border border-gray-400 rounded-lg gap-2`}
            >
              <View
                style={tw`flex flex-row left-2 justify-center items-center gap-2`}
              >
                {/* <UserRound /> */}
                <PhoneCall
                  width={20}
                  color={`#808080`}
                  style={tw`rounded-lg  `}
                />
                <Text
                  allowFontScaling={false}
                  style={tw`text-[13px] text-gray-500`}
                >
                  Mobile Number
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={tw`text-[12px] text-[${color}] font-bold left-2 `}
              >
                +91-{dataUser?.user?.mobileNumber}
              </Text>
            </View>
          </View>

          {/* <Pressable
            onPress={shareApp}
            style={tw`flex  bg-[${bgcolor}] flex-row gap-4 w-full justify-start items-center  rounded-lg p-4 `}
          >
            <Icon as={<Share2Icon color={color} size={25} />} />
            <Text allowFontScaling={false} style={[tw`text-[16px] font-bold text-black`]}>
              Share AdsMaker365
            </Text>
          </Pressable> */}
          <Pressable
            onPress={() => Linking.openURL("https://wa.me")}
            style={tw`flex bg-[${bgcolor}] flex-row gap-4 w-[95%] justify-start items-center  rounded-lg p-4 `}
          >
            <Icon as={<PhoneCallIcon color={color} size={25} />} />
            <Text
              allowFontScaling={false}
              style={[tw`text-[15px] font-medium text-gray-700`]}
            >
              Connect With Whatsapp
            </Text>
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL("tel:+917387427755")}
            style={tw`flex bg-[${bgcolor}] flex-row gap-4 w-[95%] justify-start items-center  rounded-lg p-4 `}
          >
            <Icon as={<PhoneIncoming color={color} size={25} />} />
            <Text
              allowFontScaling={false}
              style={[tw`text-[15px] font-medium text-gray-700`]}
            >
              Call For Support
            </Text>
          </Pressable>

          <Pressable
            onPress={() => Linking.openURL("https://wa.me")}
            style={tw`flex bg-[${bgcolor}] flex-row gap-4 w-full justify-start items-center  rounded-lg p-4 `}
          >
            <Icon
              style={tw`border rounded-full border-[${color}]`}
              as={<Lock color={color} size={20} />}
            />
            <Text
              allowFontScaling={false}
              style={[tw`text-[15px] font-medium text-gray-700`]}
            >
              Privacy Policy
            </Text>
          </Pressable>

          <Pressable
            onPress={() => Linking.openURL("https://wa.me")}
            style={tw`flex bg-[${bgcolor}] flex-row gap-4 w-full justify-start items-center  rounded-lg p-4 `}
          >
            <Icon
              style={tw`border rounded-full border-[${color}]`}
              as={<LucideMonitorPause color={color} size={20} />}
            />
            <Text
              allowFontScaling={false}
              style={[tw`text-[15px] font-medium text-gray-700`]}
            >
              Term & Condition
            </Text>
          </Pressable>

          <Pressable
            style={tw`flex bg-[${bgcolor}] flex-row gap-4 w-full justify-start items-center  rounded-lg p-4 `}
          >
            <Icon
              style={tw`border rounded-full border-[${color}]`}
              as={<SmilePlus color={color} size={20} />}
            />
            <View style={tw`flex flex-row gap-6 justify-between items-center`}>
              <Text
                allowFontScaling={false}
                style={[tw`text-[15px] font-medium text-gray-700`]}
              >
                Follow Us
              </Text>
              <Icon
                onPress={() => Linking.openURL("https://www.instagram.com")}
                style={tw`border rounded-full border-[${color}]`}
                as={<Instagram color={color} size={20} />}
              />
              <Icon
                onPress={() => Linking.openURL("https://www.facebook.com")}
                style={tw`border rounded-full border-[${color}]`}
                as={<Facebook color={color} size={20} />}
              />
              <Svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M0.841797 0.880005L7.87961 11.14L0.990859 19.12H2.51711L8.55367 12.1225L13.3537 19.12H19.1202L11.7674 8.40157L18.2559 0.880005H16.7343L11.0924 7.41625L6.60836 0.880005H0.841797ZM2.6643 1.84H6.10305L17.2977 18.16H13.859L2.6643 1.84Z"
                  fill="black"
                />
              </Svg>
              <Icon
                onPress={() => Linking.openURL("https://www.youtube.com")}
                style={tw`border rounded-full border-[${color}]`}
                as={<Youtube color={color} size={20} />}
              />
            </View>
          </Pressable>

          <View
            style={tw`flex justify-center flex-col gap-2 items-center rounded-lg w-full top-5 p-3`}
          >
            <Pressable
              onPress={logOut}
              style={tw`flex flex-row justify-between items-center`}
            >
              <Text allowFontScaling={false} style={tw`text-red-500 font-bold`}>
                LogOut
              </Text>
              {/* <ArrowRightCircle
                width={20}
                color={{ color }}
                style={tw`rounded-lg  `}
              /> */}
            </Pressable>
            <Text allowFontScaling={false} style={tw`text-[${color}]`}>
              App Version 8.0.1
            </Text>
            <Text
              allowFontScaling={false}
              style={tw`text-[${color}] font-semibold`}
            >
              Made in India.
            </Text>
            {/* <Text
              onPress={() => Linking.openURL("https://alancesec.com")}
              allowFontScaling={false}
              style={tw`text-[${color}] font-semibold `}
            >
              Developed & Secured By AlanceSec
            </Text> */}
          </View>
          <View style={tw` rounded-lg w-full top-5 p-3`}>
            <Pressable
              style={tw`flex flex-row justify-between items-center`}
            ></Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileCard;

// {dATAMLMUser[0]?.UserName ? (
//   <>
//     <View
//       style={[
//         { width: "95%" },
//         tw`flex flex-col gap-3 justify-between items-center`,
//       ]}
//     >
//       <View
//         style={[
//           { width: "25%" },
//           tw`   rounded-xl   flex flex-col justify-center  items-center`,
//         ]}
//       >
//         <ProfileImage />
//       </View>
//       <View
//         style={[
//           { width: "95%" },
//           tw`flex    flex-col  justify-center items-center gap-3`,
//         ]}
//       >
//         <View
//           style={tw`flex flex-col w-full   justify-center items-start p-2  border border-gray-400 rounded-lg gap-2`}
//         >
//           <View
//             style={tw`flex flex-row left-2 justify-center items-center gap-1`}
//           >
//             {/* <UserRound /> */}
//             <User
//               width={20}
//               color={`#808080`}
//               style={tw`rounded-lg  `}
//             />
//             <Text
//               allowFontScaling={false}
//               style={tw`text-[13px] text-gray-500`}
//             >
//               Name
//             </Text>
//           </View>
//           <Text
//             allowFontScaling={false}
//             style={tw`text-[14px] text-[${color}] font-bold  left-2 `}
//           >
//             {dATAMLMUser[0]?.UserName}
//           </Text>
//         </View>
//         <View
//       style={tw`flex flex-col w-full justify-center items-start p-2  border border-gray-400 rounded-lg gap-2`}
//     >
//       <View
//         style={tw`flex flex-row left-2 justify-center items-center gap-2`}
//       >
//         <UserRound />
//         <MailCheck
//           width={20}
//           color={`#808080`}
//           style={tw`rounded-lg  `}
//         />
//         <Text allowFontScaling={false} style={tw`text-[13px] text-gray-500`}>Email ID</Text>
//       </View>
//       <Text allowFontScaling={false}
//         style={tw`text-[12px] text-[${color}] font-bold underline left-2 `}
//       >
//         {userData?.data?.emailId}
//       </Text>
//     </View>
//         <View
//           style={tw`flex flex-col w-full justify-center items-start p-2  border border-gray-400 rounded-lg gap-2`}
//         >
//           <View
//             style={tw`flex flex-row left-2 justify-center items-center gap-2`}
//           >
//             {/* <UserRound /> */}
//             <PhoneCall
//               width={20}
//               color={`#808080`}
//               style={tw`rounded-lg  `}
//             />
//             <Text
//               allowFontScaling={false}
//               style={tw`text-[13px] text-gray-500`}
//             >
//               Mobile Number
//             </Text>
//           </View>
//           <Text
//             allowFontScaling={false}
//             style={tw`text-[12px] text-[${color}] font-bold left-2 `}
//           >
//             +91-{userData?.data?.mobileNo}
//           </Text>
//         </View>
//       </View>
//     </View>
//     <View style={{ width: "95%" }}>
//       {/* <ChangePassword email={userData?.data?.mobileNo} setAuth={setAuth} /> */}
//       <Pressable
//         onPress={() => Navigation?.navigate("changepass")}
//         style={tw`flex flex-row justify-center items-center w-full rounded-lg `}
//       >
//         <LinearGradient
//           style={tw`flex flex-row justify-center w-full items-center p-3 rounded-lg `}
//           colors={["#3897F9", "#3897F8"]}
//         >
//           <Text
//             allowFontScaling={false}
//             style={tw`text-white font-bold`}
//           >
//             Change My PIN
//           </Text>
//         </LinearGradient>
//       </Pressable>
//     </View>
//     <View
//       style={tw`bg-white shadow-sm p-2 flex flex-col gap-2  rounded-lg w-full top-5 `}
//     >
//       <Text
//         allowFontScaling={false}
//         style={[tw`text-[14px] font-title text-gray-600 p-1`]}
//       >
//         Help & Support
//       </Text>
//       <Pressable
//         onPress={() =>
//           Linking.openURL(
//             "whatsapp://send?text=Hello&phone=+919229885383"
//           )
//         }
//         style={tw`flex bg-[${bgcolor}] flex-row gap-4 w-full justify-start items-center  rounded-lg p-4 `}
//       >
//         <Icon as={<MessagesSquare color={color} size={25} />} />
//         <Text
//           allowFontScaling={false}
//           style={[tw`text-[15px] font-medium text-gray-700`]}
//         >
//           Chat With an Expert
//         </Text>
//       </Pressable>
//       <Pressable
//         onPress={() => Linking.openURL("https://adsmaker365.com")}
//         style={tw`flex bg-[${bgcolor}] flex-row gap-4 w-full justify-start items-center  rounded-lg p-4 `}
//       >
//         <Icon
//           style={tw`border rounded-full border-[${color}]`}
//           as={<QuestionIcon color={color} size={25} />}
//         />
//         <Text
//           allowFontScaling={false}
//           style={[tw`text-[15px] font-medium text-gray-700`]}
//         >
//           FAQs
//         </Text>
//       </Pressable>
//       <Pressable
//         onPress={() => Navigation?.navigate("Support")}
//         style={tw`flex bg-[${bgcolor}] flex-row gap-4 w-full justify-start items-center  rounded-lg p-4 `}
//       >
//         <Icon
//           style={tw`border rounded-full border-[${color}]`}
//           as={<PhoneCall color={color} size={25} />}
//         />
//         <Text
//           allowFontScaling={false}
//           style={[tw`text-[15px] font-medium text-gray-700`]}
//         >
//           Help & Support
//         </Text>
//       </Pressable>
//     </View>
//     <View
//       style={tw`bg-white shadow-sm p-2 flex flex-col gap-2  rounded-lg w-full top-5 `}
//     >
//       <Text
//         allowFontScaling={false}
//         style={[tw`text-[14px] font-title text-gray-600 p-1`]}
//       >
//         About App
//       </Text>
//       <Pressable
//         onPress={() =>
//           Linking.openURL("https://forms.gle/8EJiDYuDTeHp6RZt6")
//         }
//         style={tw`flex bg-[${bgcolor}] flex-row gap-4 w-full justify-start items-center  rounded-lg p-4 `}
//       >
//         <Icon as={<StarIcon color={color} size={20} />} />
//         <Text
//           allowFontScaling={false}
//           style={[tw`text-[15px] font-medium text-gray-700`]}
//         >
//           Feedback & Review
//         </Text>
//       </Pressable>
//       <Pressable
//         onPress={() => Navigation?.navigate("policy")}
//         style={tw`flex bg-[${bgcolor}] flex-row gap-4 w-full justify-start items-center  rounded-lg p-4 `}
//       >
//         <Icon
//           style={tw`border rounded-full border-[${color}]`}
//           as={<Lock color={color} size={20} />}
//         />
//         <Text
//           allowFontScaling={false}
//           style={[tw`text-[15px] font-medium text-gray-700`]}
//         >
//           Privacy Policy
//         </Text>
//       </Pressable>

//       <Pressable
//         onPress={() => Navigation?.navigate("Term & Condition")}
//         style={tw`flex bg-[${bgcolor}] flex-row gap-4 w-full justify-start items-center  rounded-lg p-4 `}
//       >
//         <Icon
//           style={tw`border rounded-full border-[${color}]`}
//           as={<LucideMonitorPause color={color} size={20} />}
//         />
//         <Text
//           allowFontScaling={false}
//           style={[tw`text-[15px] font-medium text-gray-700`]}
//         >
//           Term & Condition
//         </Text>
//       </Pressable>

//       <Pressable
//         style={tw`flex bg-[${bgcolor}] flex-row gap-4 w-full justify-start items-center  rounded-lg p-4 `}
//       >
//         <Icon
//           style={tw`border rounded-full border-[${color}]`}
//           as={<SmilePlus color={color} size={20} />}
//         />
//         <View
//           style={tw`flex flex-row gap-6 justify-between items-center`}
//         >
//           <Text
//             allowFontScaling={false}
//             style={[tw`text-[15px] font-medium text-gray-700`]}
//           >
//             Follow Us
//           </Text>
//           <Icon
//             onPress={() =>
//               Linking.openURL(
//                 "https://www.instagram.com/adsmaker365/?igsh=eGxzd2VueGFhYndz&utm_source=qr"
//               )
//             }
//             style={tw`border rounded-full border-[${color}]`}
//             as={<Instagram color={color} size={20} />}
//           />
//           <Icon
//             onPress={() =>
//               Linking.openURL(
//                 "https://www.facebook.com/AdsMaker365?mibextid=PlNXYD"
//               )
//             }
//             style={tw`border rounded-full border-[${color}]`}
//             as={<Facebook color={color} size={20} />}
//           />
//           <Svg
//             width="20"
//             height="20"
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <Path
//               d="M0.841797 0.880005L7.87961 11.14L0.990859 19.12H2.51711L8.55367 12.1225L13.3537 19.12H19.1202L11.7674 8.40157L18.2559 0.880005H16.7343L11.0924 7.41625L6.60836 0.880005H0.841797ZM2.6643 1.84H6.10305L17.2977 18.16H13.859L2.6643 1.84Z"
//               fill="black"
//             />
//           </Svg>
//           <Icon
//             onPress={() =>
//               Linking.openURL("https://www.youtube.com/@adsmaker365")
//             }
//             style={tw`border rounded-full border-[${color}]`}
//             as={<Youtube color={color} size={20} />}
//           />
//         </View>
//       </Pressable>
//     </View>
//   </>
// ) : null}
