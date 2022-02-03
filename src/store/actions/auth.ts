import { Dispatch } from "react";
import { AuthDto } from "../../api/sendsay/types/auth.dto";
import { AuthAction, AuthActionTypes } from "../types/auth";
import sendsayApi from "../../api/sendsay";
import { SendsayError } from "../../api/sendsay/types/response";

export const login = (dto: AuthDto) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.LOGIN });

    sendsayApi
      .login(dto)
      .then(() => {
        dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: dto });
      })
      .catch((err: SendsayError) => {
        dispatch({ type: AuthActionTypes.LOGIN_ERROR, payload: err });
      });
  };
};

export const checkAuth = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.CHECK_AUTH });

    const loggedIn = await sendsayApi.loggedIn();

    if (loggedIn) {
      const data = sendsayApi.getAuthData();
      dispatch({ type: AuthActionTypes.CHECK_AUTH_SUCCESS, payload: data });
    } else {
      dispatch({ type: AuthActionTypes.CHECK_AUTH_ERROR });
    }
  };
};

export const logout = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.LOGOUT });
    sendsayApi.logout();
  };
};
