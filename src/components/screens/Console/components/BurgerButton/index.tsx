import classNames from "classnames";
import BurgerMenu from "components/ui/BurgerMenu";
import { useTypedSelector } from "hooks/useTypedSelector";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleBurgerMenu } from "store/actions/burger-menu";
import "./styles/style.css";

const BurgerButton = () => {
  const dispatch = useDispatch();
  const toggleMenu = () => dispatch(toggleBurgerMenu());

  const { opened } = useTypedSelector((root) => root.burgerMenu);

  return (
    <div
      className={classNames("burger-button", {
        "burger-button--active": opened,
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

export default BurgerButton;
