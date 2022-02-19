import React, { useContext } from "react";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { ReactComponent as LoadingIcon } from "assets/icons/loading.svg";
import { AuthStateContext } from "stores/auth";
import { observer } from "mobx-react-lite";
import "./styles/style.css";

const Console = () => {
  const authState = useContext(AuthStateContext);
  const fullScreenHandle = useFullScreenHandle();

  if (authState.loading) {
    return (
      <div className="screen-loading">
        <LoadingIcon className="screen-loading__icon" />
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

export default observer(Console);
