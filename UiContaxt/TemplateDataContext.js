import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { useDisclose } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
const TemplateDataContext = createContext();

function TempDataContaxt({ children }) {
  const [mlmdata, setMlmdata] = useState([]);
  const [selForm, setSelForm] = useState(true);
  const themecolor = "#fff";

  const MlmUserName = mlmdata?.mobile?.FullName;
  const [achv, setAchv] = useState({
    name: "",
    Price: "",
  });
  const [basic, setBasic] = useState({
    FullName: MlmUserName,
    TeamCity: "",
  });

  useEffect(() => {
    getImage();
  }, []);
  const [social, setSocial] = useState("");
  const [selected, setSelected] = useState([]);

  const getImage = async () => {
    try {
      let user;
      const userDataOflogin = await SecureStore?.getItemAsync("userData");
      const userDataOfKLAtest = JSON?.parse(userDataOflogin);
      if (userDataOfKLAtest) {
        user = userDataOfKLAtest?.data?.mobileNo;
      } else {
        return null;
      }
      const userDataString = await AsyncStorage?.getItem(
        `${String(user || "")}`
      );
      const userData = JSON?.parse(userDataString);
      if (userData) {
        setShowcase(userData?.showcase || []);
        setUpline(userData?.upline || []);
      } else {
        setShowcase([]);
        setUpline([]);
      }
    } catch (error) {
      return null;
    }
  };

  const [income, setIncome] = useState("");
  const [day, setDay] = useState("");
  const [service, setService] = useState("");
  const [images, setImages] = useState(null);
  const [proof, setProof] = useState(null);
  const [predLogo, setPredLogo] = useState("");
  const [logo, setLogo] = useState("");
  const [logo1, setLogo1] = useState("");
  const [logo2, setLogo2] = useState("");
  const [upline, setUpline] = useState([]);
  const [achive, setAchive] = useState([]);
  const [showcase, setShowcase] = useState([]);

  const [editId, setEditId] = useState(1);
  const [resize, setResize] = useState({ imageID: 1, value: 130 });
  const [resizeCom, setResizeCom] = useState({ imageID: "", value: 230 });
  const [resizeComH, setResizeComH] = useState({ imageID: "", value: 60 });
  const [flip, setFlip] = useState({ imageID: 1, value: 1 });
  const [rotate, setRotate] = useState({ imageID: 1, value: 0 });
  const [opacity, setOpacity] = useState({ imageID: 1, value: 0 });
  const [hardness, setHardness] = useState({ imageID: 1, value: 0 });
  const [uplineLogo, setUplineLogo] = useState("");

  const [openAction, setOpenAction] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  const [company, setCompany] = useState({});

  const [sponserImage, setSponserImage] = useState({});

  const [sponDetails, setSponDetails] = useState({
    FullName: "",
    role: "",
    Mobile: "",
  });

  const [selFormM, setSelFormM] = useState(true);
  const [selFormMType, setSelFormMType] = useState(true);

  useEffect(() => {
    fetchMlmData();
  }, []);

  const fetchMlmData = async () => {
    try {
    } catch (error) {}
  };

  const [cheif, setCheif] = useState({
    FullName: "",
    role: "",
  });

  const [chiefImage, setChiefImage] = useState(null);

  const [host, setHost] = useState({
    FullName: "",
    role: "",
  });

  const [meetid, setMeetid] = useState({
    ID: "",
    Password: "",
    Type: "",
  });

  const [hostImage, setHostImage] = useState(null);

  const [meet, setMeet] = useState({
    TeamName: "",
    Date: "",
    Time: "",
  });

  const [selOn, setSelOn] = useState("ZOOM");

  const [selPer, setSelPer] = useState("Day");
  const [msBs, setMsBs] = useState("Mr");
  const [msBsp, setMsBsp] = useState("Mr");
  return (
    <>
      <TemplateDataContext.Provider
        value={{
          msBs,
          setMsBs,
          msBsp,
          setMsBsp,
          cheif,
          setCheif,
          selOn,
          setSelOn,
          selFormM,
          setSelFormM,
          selFormMType,
          setSelFormMType,
          chiefImage,
          setChiefImage,
          meetid,
          setMeetid,
          hostImage,
          setHostImage,
          host,
          setHost,
          meet,
          setMeet,
          achv,
          setAchv,
          basic,
          setBasic,
          income,
          setIncome,
          day,
          setDay,
          service,
          setService,
          images,
          setImages,
          upline,
          setUpline,
          showcase,
          setShowcase,
          social,
          setSocial,
          selected,
          setSelected,
          logo,
          setLogo,
          logo1,
          setLogo1,
          logo2,
          setLogo2,
          resize,
          setResize,
          flip,
          setFlip,
          rotate,
          setRotate,
          openAction,
          setOpenAction,
          editId,
          setEditId,
          isOpen,
          onOpen,
          onClose,
          company,
          setCompany,
          mlmdata,
          fetchMlmData,
          setProof,
          proof,
          setResizeCom,
          resizeCom,
          resizeComH,
          setResizeComH,
          opacity,
          setOpacity,
          hardness,
          setHardness,
          themecolor,
          sponserImage,
          setSponserImage,
          sponDetails,
          setSponDetails,
          selForm,
          setSelForm,
          achive,
          setAchive,
          predLogo,
          setPredLogo,
          uplineLogo,
          setUplineLogo,
          selPer,
          setSelPer,
          setMlmdata,
          getImage,
        }}
      >
        {children}
      </TemplateDataContext.Provider>
    </>
  );
}

const AllTempDataProvider = () => {
  return useContext(TemplateDataContext);
};

export { TempDataContaxt, AllTempDataProvider, TemplateDataContext };
