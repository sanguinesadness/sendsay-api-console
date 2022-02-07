import {
  WindowAction,
  WindowActionTypes,
  WindowState,
} from "store/types/window";

const initialState: WindowState = {
  height: document.documentElement.clientHeight,
  width: document.documentElement.clientWidth,
};

export const windowReducer = (
  state = initialState,
  action: WindowAction,
): WindowState => {
  switch (action.type) {
    case WindowActionTypes.UPDATE_HEIGHT:
      return { ...state, height: document.documentElement.clientHeight };
    case WindowActionTypes.UPDATE_WIDTH:
      return { ...state, width: document.documentElement.clientWidth };
    default:
      return state;
  }
};
