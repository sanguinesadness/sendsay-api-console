import classNames from "classnames";
import { ReactComponent as CloseIcon } from "assets/icons/close.svg";
import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";
import { useTypedSelector } from "hooks/useTypedSelector";
import React, { FC } from "react";
import "./styles/style.css";
import { useDispatch } from "react-redux";
import Button from "../Button";
import { closeBurgerMenu } from "store/actions/burger-menu";
import { BurgerMenuOption } from "types/burger-menu";

export interface BurgerMenuProps {
  options: BurgerMenuOption[];
}

const BurgerMenu: FC<BurgerMenuProps> = ({ options }) => {
  const dispatch = useDispatch();

  const { opened } = useTypedSelector((root) => root.burgerMenu);
  const closeMenu = () => dispatch(closeBurgerMenu());

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

export default BurgerMenu;
