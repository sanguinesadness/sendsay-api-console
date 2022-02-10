import { Dispatch } from "react";
import {
  BurgerMenuAction,
  BurgerMenuActionTypes,
} from "store/types/burger-menu";

export const openBurgerMenu = () => {
  return (dispatch: Dispatch<BurgerMenuAction>) => {
    dispatch({ type: BurgerMenuActionTypes.OPEN_MENU });
  };
};

export const closeBurgerMenu = () => {
  return (dispatch: Dispatch<BurgerMenuAction>) => {
    dispatch({ type: BurgerMenuActionTypes.CLOSE_MENU });
  };
};

export const toggleBurgerMenu = () => {
  return (dispatch: Dispatch<BurgerMenuAction>) => {
    dispatch({ type: BurgerMenuActionTypes.TOGGLE_MENU });
  };
};
