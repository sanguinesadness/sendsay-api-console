import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { BurgerMenuStateContext } from "stores/burger-menu";
import "./styles/style.css";

const BurgerButton = () => {
  const burgerMenuState = useContext(BurgerMenuStateContext);

  const toggleMenu = () => burgerMenuState.toggle();

  return (
    <div
      className={classNames("burger-button", {
        "burger-button--active": burgerMenuState.opened,
      })}
      onClick={toggleMenu}>
      <div className="burger-button__inner inner">
        <div className="inner__line line line--top" />
        <div className="inner__line line line--middle" />
        <div className="inner__line line line--bottom" />
      </div>
    </div>
  );
};

export default observer(BurgerButton);
