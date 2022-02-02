import { AuthDto } from "../../api/sendsay/types/auth.dto";
import { SendsayError } from "../../api/sendsay/types/response";

export interface AuthState {
  data?: AuthDto;
  loading: boolean;
  error?: SendsayError;
  loggedIn?: boolean;
}

export enum AuthActionTypes {
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
  LOGOUT = "LOGOUT",
  CHECK_AUTH = "CHECK_AUTH",
  CHECK_AUTH_SUCCESS = "CHECK_AUTH_SUCCESS",
  CHECK_AUTH_ERROR = "CHECK_AUTH_ERROR",
}

export interface LoginAction {
  type: AuthActionTypes.LOGIN;
}

export interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: AuthDto;
}

export interface LoginErrorAction {
  type: AuthActionTypes.LOGIN_ERROR;
  payload: SendsayError;
}

export interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export interface CheckAuthAction {
  type: AuthActionTypes.CHECK_AUTH;
}

export interface CheckAuthSuccessAction {
  type: AuthActionTypes.CHECK_AUTH_SUCCESS;
  payload: AuthDto;
}

export interface CheckAuthErrorAction {
  type: AuthActionTypes.CHECK_AUTH_ERROR;
}

export type AuthAction =
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction
  | CheckAuthAction
  | CheckAuthSuccessAction
  | CheckAuthErrorAction;
