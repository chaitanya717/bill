import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useMemo,
} from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const FetchedDataContext = createContext();

const FetchedData = ({ children }) => {
  const [mlmTemp, setMlmTemp] = useState([]);
  


  return (
    <FetchedDataContext.Provider
      value={{
        mlmTemp,
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
