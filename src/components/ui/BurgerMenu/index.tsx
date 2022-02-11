import classNames from "classnames";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import { ReactComponent as CloseIcon } from "assets/icons/close.svg";
import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";
import { useTypedSelector } from "hooks/useTypedSelector";
import React, { FC } from "react";
import "./styles/style.css";
import { useDispatch } from "react-redux";
import Button from "../Button";
import { closeBurgerMenu } from "store/actions/burger-menu";
import { logout } from "store/actions/auth";
import { useNavigate } from "react-router-dom";

const BurgerMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { opened } = useTypedSelector((root) => root.burgerMenu);

  const closeMenu = () => dispatch(closeBurgerMenu());

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    closeMenu();
  };

  return (
    <div
      className={classNames("burger-menu", {
        "burger-menu--opened": opened,
        "burger-menu--closed": !opened,
      })}>
      <div className="burger-menu__logo logo">
        <LogoIcon className="logo__inner" />
      </div>
      <div className="burger-menu__options options">
        <div className="options__option option" onClick={handleLogout}>
          <LogoutIcon className="option__icon" />
          <span className="option__text">Выйти</span>
        </div>
      </div>
      <Button
        className="burger-menu__close-button"
        icon={CloseIcon}
        onClick={closeMenu}
        type="no-bg"
      />
    </div>
  );
};

export default BurgerMenu;
