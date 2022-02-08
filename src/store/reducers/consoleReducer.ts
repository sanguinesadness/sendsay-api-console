import {
  ConsoleAction,
  ConsoleActionTypes,
  ConsoleState,
} from "store/types/console";

import { v4 } from "uuid";

const initialState: ConsoleState = {
  request: "",
  response: "",
  loading: false,
  requestError: false,
  responseError: false,
};

export const consoleReducer = (
  state = initialState,
  action: ConsoleAction,
): ConsoleState => {
  switch (action.type) {
    case ConsoleActionTypes.SET_LAST_ITEM:
      return {
        ...state,
        lastItem: {
          id: v4(),
          requestBody: action.payload.requestBody,
          error: action.payload.error,
        },
      };
    case ConsoleActionTypes.SET_REQUEST:
      return {
        ...state,
        request: action.payload,
        loading: false,
        requestError: false,
      };
    case ConsoleActionTypes.SET_RESPONSE:
      return {
        ...state,
        response: action.payload.result,
        loading: false,
        responseError: action.payload.error,
      };
    case ConsoleActionTypes.SET_REQUEST_ERROR:
      return { ...state, requestError: action.payload, loading: false };
    case ConsoleActionTypes.MAKE_REQUEST:
      return { ...state, loading: true, response: "", responseError: false };
    case ConsoleActionTypes.PRETTY_REQUEST:
      return { ...state, request: action.payload };
    case ConsoleActionTypes.PRETTY_RESPONSE:
      return { ...state, response: action.payload };
    default:
      return state;
  }
};
