import { HistoryTrackItem } from "./history-track";

export interface ConsoleState {
  lastItem?: HistoryTrackItem;
  request: string;
  response: string;
  loading: boolean;
  requestError?: boolean;
  responseError?: boolean;
}

export enum ConsoleActionTypes {
  SET_LAST_ITEM = "SET_LAST_ITEM",
  SET_REQUEST = "SET_REQUEST",
  SET_REQUEST_ERROR = "SET_REQUEST_ERROR",
  SET_RESPONSE = "SET_RESPONSE",
  MAKE_REQUEST = "MAKE_REQUEST",
  PRETTY_REQUEST = "PRETTY_REQUEST",
  PRETTY_RESPONSE = "PRETTY_RESULT",
}

export interface SetLastItemAction {
  type: ConsoleActionTypes.SET_LAST_ITEM;
  payload: Pick<HistoryTrackItem, "requestBody" | "error">;
}

export interface SetRequestAction {
  type: ConsoleActionTypes.SET_REQUEST;
  payload: string;
}

export interface SetRequestErrorAction {
  type: ConsoleActionTypes.SET_REQUEST_ERROR;
  payload: boolean;
}

export interface SetResponseAction {
  type: ConsoleActionTypes.SET_RESPONSE;
  payload: { result: string; error: boolean };
}

export interface MakeRequestAction {
  type: ConsoleActionTypes.MAKE_REQUEST;
}

export interface PrettyRequestAction {
  type: ConsoleActionTypes.PRETTY_REQUEST;
  payload: string;
}

export interface PrettyResponseAction {
  type: ConsoleActionTypes.PRETTY_RESPONSE;
  payload: string;
}

export type ConsoleAction =
  | SetLastItemAction
  | SetRequestAction
  | SetRequestErrorAction
  | SetResponseAction
  | MakeRequestAction
  | PrettyResponseAction
  | PrettyRequestAction;
