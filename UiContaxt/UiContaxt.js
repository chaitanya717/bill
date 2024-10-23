import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
// import LinearGradient from "react-native-linear-gradient";
import * as SecureStore from "expo-secure-store";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDisclose } from "native-base";
import { Text } from "react-native";

const UiProContext = createContext();

const bdge = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dutpoqbev/image/upload/v1703166289/badge/BANNER_fhgh9y.png",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dutpoqbev/image/upload/v1703166308/badge/banner_2_bcwkks.png",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dutpoqbev/image/upload/v1703166366/badge/banner_xtapet.png",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dutpoqbev/image/upload/v1703166398/badge/bannenr_png_p7cypw.png",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dutpoqbev/image/upload/v1703166414/badge/BANNER_djynfz.png",
  },
];
const IncomeName = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dutpoqbev/image/upload/v1703166530/incomename/letter_2_otmtup.png",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dutpoqbev/image/upload/v1703166506/incomename/THIS_WEAK_INCOME_ntpexg.png",
  },
];

function UiContaxt({ children }) {
  const [fontSel, setFontSel] = useState("ChrustyRock-ORLA");

  const [bannerSet, setBannerSet] = useState(false);

  const [auth, setAuth] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openResizer, setOpenResizer] = useState(true);
  const [openResizerId, setOpenResizerId] = useState("");
  const [frame, setFrame] = useState("");
  const [badgeHor, setBadgeHor] = useState("");
  const [badgeGen1, setBadgeGen1] = useState();
  const [badgeGen2, setBadgeGen2] = useState();
  const [nameBack, setNameBack] = useState();
  const [prback, setPrback] = useState();
  const [prbadge, setPrbadge] = useState();
  const [prgem, setPrgem] = useState();
  const [gem, setGem] = useState();
  const [authLoad, setAuthLoad] = useState(false);
  const [showTop, setShowTop] = useState(null);
  const [logoshow, setLogoshow] = useState(null);
  const [logosocial, setLogosocial] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [bnCall, setBnCall] = useState(0);
  const [selProf, setSelProf] = useState("Bus");
  const [rmopen, setRmOpen] = useState(false);
  const [imgRm, setImgRm] = useState("");
  const [tpremove, setTpremove] = useState(false);
  const [imgTprem, setImgTprem] = useState("");
  const [shremove, setShremove] = useState(false);
  const [imgShrem, setImgShrem] = useState("");
  const [size, setSize] = useState(100);
  const [sizeBdg, setSizeBdg] = useState(100);
  const [rotate, setRotate] = useState(0);
  const [isFlipped, setIsFlipped] = useState(1);
  const [ed, setEd] = useState(false);
  const [edit, setEdit] = useState("");
  const [edBadge, setEdBadge] = useState(false);
  const [dim, setDim] = useState({ w: 0, h: 0 });
  const [bname, setBname] = useState({
    bname: "",
    mobileNo: "",
    adress: "",
    website: "",
  });
  const [clFil, setClFil] = useState("SP");
  const [bNFil, setBNFil] = useState("");
  const [bnsFil, setBnsFil] = useState("");
  const [imagesBn, setImagesBn] = useState({});
  const fetchBName = async () => {
    try {
      const nameb = await AsyncStorage?.getItem("bname");
      const json = JSON.parse(nameb);
      setBname(json?.info || {});
      setImagesBn(json?.logo || {});
    } catch (error) {}
  };
  const [imageUri, setImageUri] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclose();
  const themecolor = "#fff";
  const API_KEY = "ADS360KEY";
  const HOST = "cvmhznb2u7";

  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const CreateProfileApi = `https://${HOST}.execute-api.ap-south-1.amazonaws.com/CreateMlmUser/?API_KEY=${API_KEY}`;
  const UpdateProfileApi = `https://${HOST}.execute-api.ap-south-1.amazonaws.com/mlmUser`;
  const GetMlMTempByID = `https://${HOST}.execute-api.ap-south-1.amazonaws.com/tempByCompany`;
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <UiProContext.Provider
        value={{
          color: "#00bf63",
          bgcolor: "#F4F6F9",
          setAuth,

          auth,
          showModal,
          setShowModal,
          authLoad,
          setAuthLoad,
          openResizer,
          setOpenResizer,
          isOpen,
          onOpen,
          onClose,
          openResizerId,
          setOpenResizerId,
          frame,
          setFrame,
          badgeHor,
          setBadgeHor,
          badgeGen1,
          setBadgeGen1,
          badgeGen2,
          setBadgeGen2,
          nameBack,
          setNameBack,
          prback,
          setPrback,
          prbadge,
          setPrbadge,
          prgem,
          setPrgem,
          gem,
          setGem,
          authLoad,
          setAuthLoad,
          bdge,
          IncomeName,
          fontSel,
          setFontSel,
          themecolor,
          CreateProfileApi,
          GetMlMTempByID,
          HOST,
          API_KEY,
          bannerSet,
          setBannerSet,
          actionSheetVisible,
          setActionSheetVisible,
          showTop,
          setShowTop,
          logosocial,
          setLogosocial,
          showUpdate,
          setShowUpdate,
          UpdateProfileApi,
          bnCall,
          setBnCall,
          selProf,
          setSelProf,
          bname,
          setBname,
          imagesBn,
          setImagesBn,
          fetchBName,
          logoshow,
          setLogoshow,
          rmopen,
          setRmOpen,
          imgRm,
          setImgRm,
          tpremove,
          setTpremove,
          imgTprem,
          setImgTprem,
          shremove,
          setShremove,
          imgShrem,
          setImgShrem,
          size,
          setSize,
          rotate,
          setRotate,
          isFlipped,
          setIsFlipped,
          ed,
          setEd,
          edit,
          setEdit,
          edBadge,
          setEdBadge,
          sizeBdg,
          setSizeBdg,
          dim,
          setDim,
          clFil,
          setClFil,
          isChecked,
          setIsChecked,
          imageUri,
          setImageUri,
          bnsFil,
          setBnsFil,
          bNFil,
          setBNFil,
        }}
      >
        {children}
      </UiProContext.Provider>
    </>
  );
}

const UiDataProvider = () => {
  return useContext(UiProContext);
};

export { UiContaxt, UiDataProvider, UiProContext };
