import {
  BurgerMenuAction,
  BurgerMenuActionTypes,
  BurgerMenuState,
} from "store/types/burger-menu";

const initialState: BurgerMenuState = {
  opened: false,
};

export const burgerMenuReducer = (
  state = initialState,
  action: BurgerMenuAction,
): BurgerMenuState => {
  switch (action.type) {
    case BurgerMenuActionTypes.OPEN_MENU:
      return { ...state, opened: true };
    case BurgerMenuActionTypes.CLOSE_MENU:
      return { ...state, opened: false };
    case BurgerMenuActionTypes.TOGGLE_MENU:
      return { ...state, opened: !state.opened };
    default:
      return state;
  }
};
