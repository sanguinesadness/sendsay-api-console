import React from "react";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./styles/style.css";

const Console = () => {
  const fullScreenHandle = useFullScreenHandle();

  return (
    <FullScreen handle={fullScreenHandle}>
      <div className="console-screen">
        <Header fullScreenHandle={fullScreenHandle} />
        <Body />
        <Footer />
      </div>
    </FullScreen>
  );
};

export default Console;
