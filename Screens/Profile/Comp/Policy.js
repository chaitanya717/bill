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
const Policy = () => {
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
        <Text style={tw`text-xl font-bold`}>Privacy Policy</Text>
        <ScrollView>
          <Text style={styles.header}>Our Mission</Text>
          <Text style={styles.text}>
            Our mission is to bring everyone the inspiration to Promote Network
            Marketing business as their choice. To do that, we show you
            personalized content and ads we think you’ll be interested in based
            on information we collect for you. We only use that information
            where we have a proper legal basis for doing so. We wrote this
            policy to help you to understand what information we collect, how we
            use it and what choices you have about it. Because we’re an internet
            company, some of the concepts below are a little technical, but
            we’ve tried our best to explain things in a simple and clear way. We
            welcome your questions and comments on this policy. Adsmaker
            Infotech Pvt. Ltd built the Adsmaker365 application as Network
            marketing application to provide users with various options and
            ideas to expand their business with divergent ways of connection in
            the market or Advertisement Platform.
          </Text>

          <Text style={styles.subHeader}>Definition:</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>We, Us, Our:</Text> Individually and
            collectively refer to each entity being part of the platform.
            (Adsmaker365)
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>You, You’re, Yourself:</Text> Refer to the
            users. This Privacy Policy is a contract between you and the
            respective Adsmaker365 entity whose Website & Web Application You
            use or access or you otherwise deal with. This Privacy Policy shall
            be read together with the respective terms and condition of the
            Adsmaker365 entity and its respective Website or nature of business
            of the Website.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Platform:</Text> The word platform means
            the said services and business providing by Adsmaker365. Hereinafter
            referred as platform.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>User:</Text> A person who registered their
            name under said platform.
          </Text>

          <Text style={styles.subHeader}>
            When you give it to us or give us permission to obtain it
          </Text>
          <Text style={styles.text}>
            When you sign up for or use the said platform, you voluntarily share
            certain information including your name, email address, phone
            number, OTP, comments, and any other information you give us. The
            information that we request will be retained by us and used as
            described in this privacy policy.
          </Text>
          <Text style={styles.text}>
            The said application does use third services that may collect
            information used to identify you.
          </Text>

          <Text style={styles.subHeader}>
            We also get technical information when you use our platform
          </Text>
          <Text style={styles.text}>
            When you use a website, mobile application or other internet
            service, certain internet and electronic network activity
            information gets created and logged automatically. Here are some of
            the types of information we collect:
          </Text>

          <Text style={styles.subHeader}>Log data:</Text>
          <Text style={styles.text}>
            When you use Platform, our servers record information (“log data”),
            including information that your browser automatically sends whenever
            you visit a website, or that your mobile app automatically sends
            when you’re using it. This log data includes your Internet Protocol
            address (which we use to infer your approximate location), the
            address of and activity on websites you visit that incorporate the
            platform features, searches, browser type and settings, the date and
            time of your request, how you used Platform, cookie data and device
            data and statistics.
          </Text>

          <Text style={styles.subHeader}>Cookies:</Text>
          <Text style={styles.text}>
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your device’s internal
            memory. Some of the cookies we use are associated with your platform
            account (including information about you, such as the email address
            you gave us) and other cookies are not.
          </Text>
          <Text style={styles.text}>
            This service does not use these “cookies” explicitly. However, the
            application may use third party code and libraries that use
            “cookies” to collect information and improve their services. You
            have the option to either accept or refuse these cookies and know
            when a cookie is being sent to your device. If you choose to refuse
            our cookies, you may not be able to use some portion of this
            service.
          </Text>

          <Text style={styles.subHeader}>Device information:</Text>
          <Text style={styles.text}>
            In addition to log data, we collect information about the device
            you’re using the platform on, including the type of device,
            operating system, settings, unique device identifiers and crash data
            that helps us understand when something breaks.
          </Text>

          <Text style={styles.subHeader}>Clickstream data and inferences:</Text>
          <Text style={styles.text}>
            When you’re on Platform, we use your activity—such as which sector
            you click on, boards you create, and any text that you add in a
            comment or description—along with information you provided when you
            first signed up and information from our partners and advertisers to
            make inferences about you and your preferences. For example, if you
            click profession, we may infer you are engaged in the same
            profession. We may also infer information about your business or
            professional experience based on your activity. By these features,
            user may easily get the new designs, ideas and quotes relating to
            their activities.
          </Text>

          <Text style={styles.subHeader}>Business Transfer:</Text>
          <Text style={styles.text}>
            We may share your Personal Information or any other information
            collected and stored by the Service with our parent, subsidiaries
            and affiliates for internal reasons in connection with the provision
            of the Services to You. We also reserve the right to disclose and
            transfer all such information:
          </Text>
          <Text style={styles.text}>
            To a subsequent owner, co-owner or operator of the Services or
            applicable database.
          </Text>

          <Text style={styles.subHeader}>
            What we do with the info we collect
          </Text>
          <Text style={styles.text}>
            We have a legitimate interest for using your info in these ways.
            It's fundamental to what we do at platform and necessary in order to
            make Platform and its features relevant and personalized to you.
          </Text>
          <Text style={styles.text}>
            We also have a legitimate interest in making Platform safe and
            improving our product features, so you keep finding the inspiration
            you want. We give all benefit when we are using your information to:
          </Text>
          <Text style={styles.text}>
            In addition to the specific circumstances above, we’ll only use your
            information with your consent in order to:
          </Text>
          <Text style={styles.text}>
            Send you marketing materials by email, text, push notification or
            phone call depending on your account or operating system settings.
            Each time we send you marketing materials, we give you the option to
            unsubscribe.
          </Text>

          <Text style={styles.subHeader}>Service Providers</Text>
          <Text style={styles.text}>
            We may employ third-party companies and individuals due to the
            following reasons:
          </Text>
          <Text style={styles.text}>
            To facilitate our Service; To provide the Service on our behalf; To
            perform Service-related services; or To assist us in analyzing how
            our Service is used.
          </Text>
          <Text style={styles.text}>
            We want to inform users of this Service that these third parties
            have access to your Personal Information. The reason is to perform
            the tasks assigned to them on our behalf. However, they are
            obligated not to disclose or use the information for any other
            purpose.
          </Text>

          <Text style={styles.subHeader}>Security</Text>
          <Text style={styles.text}>
            When you sign up, you voluntarily permit us to access your contact
            list. However, the information we access will be purely and legally
            used by us only, for making your sharing of the said post easier for
            you. The said information is completely safe with us, and we will
            not be using that information to sell, resell, or for the company's
            personal or professional use/s or purpose/s. If you don't permit us
            to access your contact list, you won't be able to share the said
            post with your contacts.
          </Text>

          <Text style={styles.subHeader}>Contact Permission</Text>
          <Text style={styles.text}>
            We value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and we
            cannot guarantee its absolute security.
          </Text>

          <Text style={styles.subHeader}>Links to Other Sites</Text>
          <Text style={styles.text}>
            This Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by us. Therefore, we strongly advise
            you to review the Privacy Policy of these websites. We have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </Text>

          <Text style={styles.subHeader}>Children’s Privacy</Text>
          <Text style={styles.text}>
            These Services do not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from children
            under 13. In the case we discover that a child under 13 has provided
            us with personal information, we immediately delete this from our
            servers. If you are a parent or guardian and you are aware that your
            child has provided us with personal information, please contact us
            so that we will be able to do necessary actions.
          </Text>

          <Text style={styles.subHeader}>
            Governing Law and Dispute Resolution
          </Text>
          <Text style={styles.text}>
            This Policy shall be governed by and construed in accordance with
            the laws of India. The courts at Jehanbad (Bihar), India shall have
            exclusive jurisdiction in relation to any disputes arising out of or
            in connection with this Policy.
          </Text>

          <Text style={styles.subHeader}>Intellectual Property Rights</Text>
          <Text style={styles.text}>
            We are All ready Applied of my logo and Name for Trademark Act, it
            will we come in some days then we will upload on this. Therefore,
            any kind of stealing data and copying the name or content from the
            said platform amounting to infringement and platform may reserve a
            right to take action against infringer.
          </Text>

          <Text style={styles.subHeader}>Refund & cancellation policy</Text>
          <Text style={styles.text}>
            If at any time you are not satisfied with the quality of services of
            our application, Within 7 days of subscription purchase you may
            raise a ticket in our application's customer help and support with a
            reason for dissatisfaction or call customer care number of
            Adsmaker365. If your issue is found to be genuine, your subscription
            may be considered for a claim of credit, replacement or refund.
            Otherwise, your complaint will be noted and considered for the
            respective resolution. Furthermore, you hereby confirm and agree
            that you will not claim or allege anything against Adsmaker365
            concerning the digital content provided to you by the app.
          </Text>

          <Text style={styles.subHeader}>No Waiver</Text>
          <Text style={styles.text}>
            The rights and remedies available under this Policy may be exercised
            as often as necessary and are cumulative and not exclusive of rights
            or remedies provided by law. It may be waived only in writing. Delay
            in exercising or non-exercise of any such right or remedy does not
            constitute a waiver of that right or remedy, or any other right or
            remedy.
          </Text>

          <Text style={styles.subHeader}>Contact Us</Text>
          <Text style={styles.text}>
            If we change our privacy policies and procedures, we will post those
            changes on our website to keep you aware of what information we
            collect, how we use it and under what circumstances we may disclose
            it. Changes to this Privacy Policy are effective when they are
            posted on this page. If you have any questions or suggestions about
            our Privacy Policy, do not hesitate to contact us at
            adsmaker365@gmail.com.
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
    fontSize: 18,
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

export default Policy;
