import React, { FC, useContext } from "react";
import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import { ReactComponent as MaximizeIcon } from "assets/icons/maximize.svg";
import { ReactComponent as MinimizeIcon } from "assets/icons/minimize.svg";
import Button from "components/ui/Button";
import HistoryTrack from "./components/HistoryTrack";
import { useNavigate } from "react-router-dom";
import { FullScreenHandle } from "react-full-screen";
import BurgerButton from "./components/BurgerButton";
import { AuthStateContext } from "stores/auth";
import { observer } from "mobx-react-lite";
import { WindowStateContext } from "stores/window";
import "./styles/style.css";

interface HeaderProps {
  fullScreenHandle: FullScreenHandle;
}

const Header: FC<HeaderProps> = ({ fullScreenHandle }) => {
  const navigate = useNavigate();

  const authState = useContext(AuthStateContext);
  const windowState = useContext(WindowStateContext);

  const less950px = windowState.width < 950;
  const less550px = windowState.width < 550;

  const handleLogout = () => {
    authState.logout();
    navigate("/login");
  };

  const toggleFullscreen = () => {
    if (fullScreenHandle.active) fullScreenHandle.exit();
    else fullScreenHandle.enter();
  };

  return (
    <div className="console-screen__header header">
      <div className="header__top top">
        <div className="top__screen-info screen-info">
          <LogoIcon className="screen-info__logo" />
          <h4 className="screen-info__title">API-консолька</h4>
        </div>
        <div className="top__account account">
          <div className="account__credentials credentials">
            {authState.data?.login && (
              <span className="credentials__credential">
                {authState.data.login}
              </span>
            )}
            {authState.data?.sublogin && (
              <span className="credentials__credential">
                {authState.data.sublogin}
              </span>
            )}
          </div>
          {less550px ? (
            <BurgerButton />
          ) : (
            <Button
              className="account__logout-button"
              onClick={handleLogout}
              icon={LogoutIcon}
              iconPlace="right"
              type="no-bg"
              text={less950px ? "" : "Выйти"}
            />
          )}
        </div>
        <Button
          className="top__maximize-button"
          onClick={toggleFullscreen}
          icon={fullScreenHandle.active ? MinimizeIcon : MaximizeIcon}
          type="no-bg"
        />
      </div>
      <div className="header__bottom bottom">
        <HistoryTrack className="bottom__history-track" />
      </div>
    </div>
  );
};

export default observer(Header);
