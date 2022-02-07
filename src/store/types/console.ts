export interface ConsoleState {
  query: string;
  result: string;
  loading: boolean;
  queryError?: boolean;
  resultError?: boolean;
}

export enum ConsoleActionTypes {
  SET_QUERY = "SET_QUERY",
  SET_QUERY_ERROR = "SET_QUERY_ERROR",
  SET_RESULT = "SET_RESULT",
  MAKE_REQUEST = "MAKE_REQUEST",
  PRETTY_QUERY = "PRETTY_QUERY",
  PRETTY_RESULT = "PRETTY_RESULT",
}

export interface SetQueryAction {
  type: ConsoleActionTypes.SET_QUERY;
  payload: string;
}

export interface SetQueryErrorAction {
  type: ConsoleActionTypes.SET_QUERY_ERROR;
  payload: boolean;
}

export interface SetResultAction {
  type: ConsoleActionTypes.SET_RESULT;
  payload: { result: string; error: boolean };
}

export interface MakeRequestAction {
  type: ConsoleActionTypes.MAKE_REQUEST;
}

export interface PrettyQueryAction {
  type: ConsoleActionTypes.PRETTY_QUERY;
  payload: string;
}

export interface PrettyResultAction {
  type: ConsoleActionTypes.PRETTY_RESULT;
  payload: string;
}

export type ConsoleAction =
  | SetQueryAction
  | SetQueryErrorAction
  | SetResultAction
  | MakeRequestAction
  | PrettyResultAction
  | PrettyQueryAction;
