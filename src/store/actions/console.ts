import { prettyJSON } from "common/json-prettier";
import { Dispatch } from "react";
import { store } from "store";
import { ConsoleAction, ConsoleActionTypes } from "store/types/console";
import sendsayApi from "api/sendsay";
import { SendsayRequest } from "api/sendsay/types/request";

export const setRequest = (query: string) => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({ type: ConsoleActionTypes.SET_REQUEST, payload: query });
  };
};

export const setResponse = (result: string, error: boolean) => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({
      type: ConsoleActionTypes.SET_RESPONSE,
      payload: { result, error },
    });
  };
};

export const setRequestError = (error: boolean) => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({ type: ConsoleActionTypes.SET_REQUEST_ERROR, payload: error });
  };
};

export const makeRequest = (queryStr: string) => {
  return async (dispatch: Dispatch<ConsoleAction>) => {
    dispatch({ type: ConsoleActionTypes.MAKE_REQUEST });

    // try parse input queryStr as SendsayRequest
    let request: SendsayRequest;
    try {
      request = JSON.parse(queryStr);
      if (!request.action) throw new Error();
    } catch {
      dispatch({ type: ConsoleActionTypes.SET_REQUEST_ERROR, payload: true });
      return;
    }

    // make request
    sendsayApi
      .makeRequest(request)
      .then((resp) => {
        // set successful Console result
        dispatch({
          type: ConsoleActionTypes.SET_RESPONSE,
          payload: {
            result: JSON.stringify(resp),
            error: false,
          },
        });

        // set last successful Console request
        dispatch({
          type: ConsoleActionTypes.SET_LAST_ITEM,
          payload: {
            requestBody: request,
            error: false,
          },
        });
      })
      .catch((err) => {
        // set wrong Console result
        dispatch({
          type: ConsoleActionTypes.SET_RESPONSE,
          payload: {
            result: JSON.stringify(err),
            error: true,
          },
        });

        // set last wrong Console request
        dispatch({
          type: ConsoleActionTypes.SET_LAST_ITEM,
          payload: {
            requestBody: request,
            error: true,
          },
        });
      });
  };
};

export const prettyRequest = () => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    const query = store.getState().console.request;
    const prettyQuery = prettyJSON(query);

    if (prettyQuery) {
      dispatch({
        type: ConsoleActionTypes.PRETTY_REQUEST,
        payload: prettyQuery,
      });
    } else {
      dispatch({ type: ConsoleActionTypes.SET_REQUEST_ERROR, payload: true });
    }
  };
};

export const prettyResponse = () => {
  return (dispatch: Dispatch<ConsoleAction>) => {
    const result = store.getState().console.response;
    const prettyResult = prettyJSON(result);

    if (prettyResult) {
      dispatch({
        type: ConsoleActionTypes.PRETTY_RESPONSE,
        payload: prettyResult,
      });
    }
  };
};
