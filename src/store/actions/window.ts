import { Dispatch } from "react";
import { WindowAction, WindowActionTypes } from "store/types/window";

export const updateWindowSize = () => {
  return (dispatch: Dispatch<WindowAction>) => {
    dispatch({ type: WindowActionTypes.UPDATE_HEIGHT });
    dispatch({ type: WindowActionTypes.UPDATE_WIDTH });
  };
};
