import React, { createContext, useEffect, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

const FetchedDataContext = createContext();

const DataOFServices = [
  {
    id: 1,
    Service: "Maize Tresher",
    options: ["Maize"],
  },
  {
    id: 2,
    Service: "Soyabeen Tresher",
    options: ["Soyabeen"],
  },
  {
    id: 3,
    Service: "JCB/Excavators EarthMovers",
    options: ["JCB/Excavators"],
  },
];

const FetchedData = ({ children }) => {
  const [mlmTemp, setMlmTemp] = useState([]);
  const [auth, setAuth] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [hit, setHit] = useState(0);

  useEffect(() => {
    const loadUserData = async () => {
      const userDataString = await SecureStore.getItemAsync("userData");
      if (userDataString) {
        try {
          const userDataSaved = JSON.parse(userDataString);
          setDataUser(userDataSaved);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    };

    loadUserData();
  }, [auth]);

  return (
    <FetchedDataContext.Provider
      value={{
        mlmTemp,
        setAuth,
        auth,
        dataUser,
        setDataUser,
        DataOFServices,
        hit,
        setHit,
      }}
    >
      {children}
    </FetchedDataContext.Provider>
  );
};

const DataService = () => {
  return useContext(FetchedDataContext);
};

export { FetchedData, DataService };
