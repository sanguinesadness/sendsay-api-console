import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import { ReactComponent as MaximizeIcon } from "assets/icons/maximize.svg";
import { ReactComponent as MinimizeIcon } from "assets/icons/minimize.svg";
import { useTypedSelector } from "hooks/useTypedSelector";
import Button from "components/ui/Button";
import "./styles/style.css";
import HistoryTrack from "./components/HistoryTrack";
import { logout } from "store/actions/auth";
import { useNavigate } from "react-router-dom";
import { FullScreenHandle } from "react-full-screen";

interface HeaderProps {
  fullScreenHandle: FullScreenHandle;
}

const Header: FC<HeaderProps> = ({ fullScreenHandle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useTypedSelector((root) => root.auth);

  const handleLogout = () => {
    dispatch(logout());
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
          <Button
            className="account_logout-button"
            onClick={handleLogout}
            icon={LogoutIcon}
            type="no-bg"
            text="Выйти"
            iconPlace="right"
          />
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

export default Header;
