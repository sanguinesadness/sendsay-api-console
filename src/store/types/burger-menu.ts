export interface BurgerMenuState {
  opened: boolean;
}

export enum BurgerMenuActionTypes {
  OPEN_MENU = "OPEN_MENU",
  CLOSE_MENU = "CLOSE_MENU",
  TOGGLE_MENU = "TOGGLE_MENU",
}

export interface OpenMenuAction {
  type: BurgerMenuActionTypes.OPEN_MENU;
}

export interface CloseMenuAction {
  type: BurgerMenuActionTypes.CLOSE_MENU;
}

export interface ToggleMenuAction {
  type: BurgerMenuActionTypes.TOGGLE_MENU;
}

export type BurgerMenuAction =
  | OpenMenuAction
  | CloseMenuAction
  | ToggleMenuAction;
