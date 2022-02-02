import { AuthAction, AuthActionTypes, AuthState } from "../types/auth";

const initialState: AuthState = {
  data: undefined,
  loading: false,
  error: undefined,
  loggedIn: undefined,
};

export const authReducer = (
  state = initialState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        data: undefined,
        error: undefined,
        loading: true,
        loggedIn: undefined,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        data: action.payload,
        error: undefined,
        loading: false,
        loggedIn: true,
      };
    case AuthActionTypes.LOGIN_ERROR:
      return {
        data: undefined,
        error: action.payload,
        loading: false,
        loggedIn: false,
      };
    case AuthActionTypes.CHECK_AUTH:
      return {
        data: undefined,
        error: undefined,
        loading: true,
        loggedIn: undefined,
      };
    case AuthActionTypes.CHECK_AUTH_SUCCESS:
      return {
        data: action.payload,
        error: undefined,
        loading: false,
        loggedIn: true,
      };
    case AuthActionTypes.CHECK_AUTH_ERROR:
      return {
        data: undefined,
        error: undefined,
        loading: false,
        loggedIn: false,
      };
    default:
      return state;
  }
};
