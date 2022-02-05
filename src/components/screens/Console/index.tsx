import React from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "hooks/useTypedSelector";
import Button from "components/ui/Button";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./styles/style.css";

const Console = () => {
  const fullScreenHandle = useFullScreenHandle();
  const navigate = useNavigate();
  const authState = useTypedSelector((root) => root.auth);

  const redirectToLogin = () => navigate("/login");

  if (!authState.loggedIn) {
    return (
      <div>
        <span>Не авторизован</span>
        <Button text="Войти" type="default" onClick={redirectToLogin} />
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
