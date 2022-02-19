import React, { FC, useContext } from "react";
import { ReactComponent as CloseIcon } from "assets/icons/close.svg";
import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";
import { BurgerMenuStateContext } from "stores/burger-menu";
import { BurgerMenuOption } from "types/burger-menu";
import classNames from "classnames";
import Button from "../Button";
import "./styles/style.css";
import { observer } from "mobx-react-lite";

export interface BurgerMenuProps {
  options: BurgerMenuOption[];
}

const BurgerMenu: FC<BurgerMenuProps> = ({ options }) => {
  const burgerMenuState = useContext(BurgerMenuStateContext);

  const closeMenu = () => burgerMenuState.close();

  return (
    <div
      className={classNames("burger-menu", {
        "burger-menu--opened": burgerMenuState.opened,
        "burger-menu--closed": !burgerMenuState.opened,
      })}>
      <div className="burger-menu__logo logo">
        <LogoIcon className="logo__inner" />
      </div>
      <div className="burger-menu__options options">
        {options.map((option) => (
          <div
            key={option.id}
            className="options__option option"
            onClick={option.onClick}>
            <option.icon className="option__icon" />
            <span className="option__text">{option.text}</span>
          </div>
        ))}
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

export default observer(BurgerMenu);
