import { prettyJSON } from "common/string-prettier";
import { Dispatch } from "react";
import { store } from "store";
import { ConsoleAction, ConsoleActionTypes } from "store/types/console";

export const setQuery = (query: string) => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({ type: ConsoleActionTypes.SET_QUERY, payload: query });
  };
};

export const setResult = (result: string) => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({ type: ConsoleActionTypes.SET_RESULT, payload: result });
  };
};

export const setQueryError = (error: boolean) => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({ type: ConsoleActionTypes.SET_QUERY_ERROR, payload: error });
  };
};

export const setResultError = (error: boolean) => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({ type: ConsoleActionTypes.SET_RESULT_ERROR, payload: error });
  };
};

export const makeRequest = () => {
  return async (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({ type: ConsoleActionTypes.MAKE_REQUEST });
    // make request
  };
};

export const prettyQuery = () => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    const query = store.getState().console.query;
    const prettyQuery = prettyJSON(query);

    if (prettyQuery) {
      dispatch({ type: ConsoleActionTypes.PRETTY_QUERY, payload: prettyQuery });
    } else {
      dispatch({ type: ConsoleActionTypes.SET_QUERY_ERROR, payload: true });
    }
  };
};
