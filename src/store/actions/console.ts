import { prettyJSON } from "common/json-prettier";
import { Dispatch } from "react";
import { store } from "store";
import { ConsoleAction, ConsoleActionTypes } from "store/types/console";
import sendsayApi from "api/sendsay";

export const setQuery = (query: string) => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({ type: ConsoleActionTypes.SET_QUERY, payload: query });
  };
};

export const setResult = (result: string, error: boolean) => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({
      type: ConsoleActionTypes.SET_RESULT,
      payload: { result, error },
    });
  };
};

export const setQueryError = (error: boolean) => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({ type: ConsoleActionTypes.SET_QUERY_ERROR, payload: error });
  };
};

export const makeRequest = () => {
  return async (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({ type: ConsoleActionTypes.MAKE_REQUEST });

    const query = store.getState().console.query;

    // try parse input query as JSON
    let queryJSON;
    try {
      queryJSON = JSON.parse(query);
    } catch {
      dispatch({ type: ConsoleActionTypes.SET_QUERY_ERROR, payload: true });
      return;
    }

    // make request
    sendsayApi
      .makeRequest(queryJSON)
      .then((resp) => {
        dispatch({
          type: ConsoleActionTypes.SET_RESULT,
          payload: {
            result: JSON.stringify(resp),
            error: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: ConsoleActionTypes.SET_RESULT,
          payload: {
            result: JSON.stringify(err),
            error: true,
          },
        });
      });
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

export const prettyResult = () => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    const result = store.getState().console.result;
    const prettyResult = prettyJSON(result);

    if (prettyResult) {
      dispatch({
        type: ConsoleActionTypes.PRETTY_RESULT,
        payload: prettyResult,
      });
    }
  };
};
