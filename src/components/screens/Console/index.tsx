import React from "react";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { ReactComponent as LoadingIcon } from "assets/icons/loading.svg";
import "./styles/style.css";
import { useTypedSelector } from "hooks/useTypedSelector";

const Console = () => {
  const authState = useTypedSelector((root) => root.auth);
  const fullScreenHandle = useFullScreenHandle();

  if (authState.loading) {
    return (
      <div className="page-loading">
        <LoadingIcon className="page-loading__icon" />
      </div>
    );
  }

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
