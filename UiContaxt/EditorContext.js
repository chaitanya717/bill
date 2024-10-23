import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
const EditorContext = createContext();
function EditorContaxtGlobal({ children }) {
  const [sizeBdg, setSizeBdg] = useState(100);
  const [size, setSize] = useState(100);
  const [sizeft, setSizeft] = useState(100);
  const [isFlippedft, setIsFlippedft] = useState(1);
  const [ed, setEd] = useState(false);
  const [edft, setEdft] = useState(false);
  const [edBadge, setEdBadge] = useState(false);
  const [rotateft, setRotateft] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [selfr, setSelfr] = useState("hghg");
  const [rest, setRest] = useState(1);
  const [restb, setRestb] = useState(1);

  return (
    <>
      <EditorContext.Provider
        value={{
          size,
          setSize,
          sizeBdg,
          setSizeBdg,
          edBadge,
          setEdBadge,
          ed,
          setEd,
          rotate,
          setRotate,
          selfr,
          setSelfr,
          edft,
          setEdft,
          sizeft,
          setSizeft,
          rotateft,
          setRotateft,
          isFlippedft,
          setIsFlippedft,
          rest,
          setRest,
          restb,
          setRestb,
        }}
      >
        {children}
      </EditorContext.Provider>
    </>
  );
}

const EditorDataProvider = () => {
  return useContext(EditorContext);
};

export { EditorContaxtGlobal, EditorDataProvider, EditorContext };
