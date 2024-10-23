import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { PhoneCall, Mail, PhoneForwarded } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { UiDataProvider } from "../../../UiContaxt/UiContaxt";
import * as SecureStore from "expo-secure-store";
import { DataService } from "../../../DataFetcherContext/FetchedData";
import { Icon, Spinner, useToast } from "native-base";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import support from "../../../assets/tamp.webp";
import { Image, ImageBackground } from "expo-image";
const Term = () => {
  const { userData, setAuth } = DataService();
  const email = userData?.data?.mobileNo;

  const { color, HOST, API_KEY } = UiDataProvider();
  const toast = useToast();
  const [load, setLoad] = useState(false);
  const [basic, setBasic] = useState({
    oldpass: "",
    newpass: "",
    conpass: "",
  });

  const handleInputChange = (name, text) => {
    setBasic((prev) => ({
      ...prev,
      [name]: text,
    }));
  };

  const ChangePasswordHandle = (email) => {
    setLoad(true);
    try {
      // Validation for minimum password length
      if (basic.oldpass.length < 4 || basic.newpass.length < 4) {
        toast.show({
          position: "bottom",
          duration: 800,
          render: () => {
            return (
              <Text
                allowFontScaling={false}
                style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
              >
                Pin must be 4 characters long.
              </Text>
            );
          },
        });
        setLoad(false);
        return; // Exit the function if validation fails
      }
      if (String(basic.conpass) !== String(basic.newpass)) {
        toast.show({
          position: "bottom",
          duration: 800,
          render: () => {
            return (
              <Text
                allowFontScaling={false}
                style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
              >
                Pin Not Match
              </Text>
            );
          },
        });
        setLoad(false);
        return; // Exit the function if validation fails
      }

      axios
        .put(
          `https://${String(
            HOST
          )}.execute-api.ap-south-1.amazonaws.com/changePass?API_KEY=${API_KEY}`,
          {
            mobileNo: `${email}`,
            oldPassword: `${basic?.oldpass}`,
            newPassword: `${basic?.newpass}`,
          }
        )
        .then((res) => {
          if (res?.data?.message) {
            toast.show({
              position: "bottom",
              duration: 900,
              render: () => {
                return (
                  <Text
                    allowFontScaling={false}
                    style={tw`text-gray-500 rounded-lg bg-[${color}] text-white font-semibold text-xs p-2`}
                  >
                    🎉 Pin Changed Successfully ! 🎉
                  </Text>
                );
              },
            });
            SecureStore?.deleteItemAsync("userData");
            setTimeout(() => {
              setAuth(false);
            }, 500);
            setLoad(false);
          }
        })
        .catch((err) => {
          toast.show({
            position: "bottom",
            duration: 900,
            render: () => {
              return (
                <Text
                  allowFontScaling={false}
                  style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
                >
                  {err?.response?.data?.message || err.message}
                </Text>
              );
            },
          });
          setLoad(false);
        })
        .finally(() => {
          setLoad(false);
        });
    } catch (error) {
      // console.error(error);
      toast.show({
        position: "bottom",
        duration: 900,
        render: () => {
          return (
            <Text
              allowFontScaling={false}
              style={tw`text-gray-700 rounded-lg bg-red-400 text-white font-semibold text-xs p-2`}
            >
              {error.message}
            </Text>
          );
        },
      });
      setLoad(false);
    }
  };

  return (
    <View
      style={tw`flex w-full bg-white h-full justify-center  rounded-lg items-center flex-col p-6 gap-4`}
    >
      <View style={tw`flex flex-col  justify-center w-full items-center gap-2`}>
        <Text style={tw`text-xl font-bold`}>Terms & Condition</Text>
        <ScrollView>

          <Text style={styles.text}>
            Welcome to Adsmaker365! These terms and conditions outline the rules
            and regulations for the use of Adsmaker365 Website/Application.
          </Text>
          <Text style={styles.text}>
            By accessing this Website/Application, we assume you accept these
            terms and conditions. Do not continue to use Adsmaker365 if you do
            not agree to all of the terms and conditions stated on this page.
          </Text>

          <Text style={styles.subHeader}>Terminology</Text>
          <Text style={styles.text}>
            The following terminology applies to these Terms and Conditions,
            Privacy Statement and Disclaimer Notice and all Agreements:
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Client, You, Your:</Text> Refers to you,
            the person logged on this Website/Application and compliant to the
            Company's terms and conditions.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>
              The Company, Ourselves, We, Our, Us:
            </Text>{" "}
            Refers to our Company.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Party, Parties, or Us:</Text> Refers to
            both the Client and Ourselves.
          </Text>
          <Text style={styles.text}>
            All terms refer to the offer, acceptance, and consideration of
            payment necessary to undertake the process of our assistance to the
            Client in the most appropriate manner for the express purpose of
            meeting the Client's needs in respect of the provision of the
            Company's stated services, in accordance with and subject to,
            prevailing laws in India. Any use of the above terminology or other
            words in the singular, plural, capitalization and/or he/she or they
            are taken as interchangeable and therefore as referring to the same.
          </Text>

          <Text style={styles.subHeader}>Cookies</Text>
          <Text style={styles.text}>
            We employ the use of cookies. By accessing Adsmaker365, you agree to
            have read and are in agreement with Adsmaker365 Privacy Policy.
          </Text>
          <Text style={styles.text}>
            Most interactive Websites/Applications use cookies to let them
            retrieve the user's details for each visit. Our Website/Application
            uses cookies to enable the functionality of certain areas of the
            Website/Application and make the experience easier for people
            visiting our Website/Application. Some of our affiliate/advertising
            partners may also use cookies.
          </Text>

          <Text style={styles.subHeader}>License</Text>
          <Text style={styles.text}>
            Unless otherwise stated, Adsmaker365 and/or its licensors own the
            intellectual property rights for all material on Adsmaker365. You
            may access it from Adsmaker365 for your own personal use, subject to
            restrictions set in these terms and conditions.
          </Text>
          <Text style={styles.text}>
            You hereby grant Adsmaker365 a non-exclusive license to use,
            reproduce, edit and authorize others to use, reproduce and edit any
            or all of your data and details, submitted by you for eProfile, in
            any and all forms, formats, or media.
          </Text>

          <Text style={styles.text}>You must not:</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>•</Text> Republish material from
            Adsmaker365
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>•</Text> Sell, rent, or sub-license
            material from Adsmaker365
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>•</Text> Reproduce, duplicate or copy
            material from Adsmaker365
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>•</Text> Redistribute content from
            Adsmaker365
          </Text>

          <Text style={styles.text}>
            This agreement shall begin on the date hereof. Some parts of this
            Website/Application offer users an opportunity to post and exchange
            opinions and information in certain areas of the
            Website/Application. Adsmaker365 does not filter, edit, publish or
            review Comments prior to their presence on the Website/Application.
            Comments do not reflect the views and opinions of Adsmaker365, its
            agents and/or affiliates. Comments reflect the views and opinions of
            the person posting them. To the extent permitted by applicable laws,
            Adsmaker365 shall not be liable for the Comments or any liability,
            damages, or expenses caused and/or suffered as a result of any use
            of and/or posting of and/or appearance of the Comments on this
            Website/Application.
          </Text>
          <Text style={styles.text}>
            Adsmaker365 reserves the right to monitor and/or remove any Comment
            that can be considered inappropriate, offensive, or causes a breach
            of its Terms and Conditions.
          </Text>

          <Text style={styles.text}>You warrant and represent that:</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>•</Text> You are entitled to post the
            Comments on our Website/Application and have all necessary licenses
            and consents to do so;
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>•</Text> The Comments do not invade any
            intellectual property right, including without limitation copyright,
            patent, or trademark of any third party;
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>•</Text> The Comments do not contain any
            defamatory, libelous, offensive, indecent, or otherwise unlawful
            material, which is an invasion of privacy.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>•</Text> The Comments will not be used to
            solicit or promote business or custom or present commercial
            activities or unlawful activity.
          </Text>
          <Text style={styles.text}>
            You hereby grant Adsmaker365 a non-exclusive license to use,
            reproduce, edit and authorize others to use, reproduce and edit any
            of your Comments in any and all forms, formats, or media.
          </Text>

          <Text style={styles.subHeader}>Disclaimer</Text>
          <Text style={styles.text}>
            The creatives provided by Adsmaker365 are for promotion & branding
            purposes only and not to be reproduced, duplicated, copied, sold,
            resold, or exploited for any commercial purpose. Legal action will
            be taken if such activity comes to our attention.
          </Text>
          <Text style={styles.text}>
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties, and conditions relating to our
            Website/Application and the use of this Website/Application.
          </Text>

          <Text style={styles.subHeader}>Download Limit</Text>
          <Text style={styles.text}>
            A user can only download a certain amount of Images/Videos in their
            package of choice. The download limit in each package can be seen in
            premium options. This application is managed by RITESH FLEX
            PRINTING.
          </Text>

          <Text style={styles.subHeader}>Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about our Terms and Conditions, do not
            hesitate to contact us at adsmaker365@gmail.com.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});
export default Term;
