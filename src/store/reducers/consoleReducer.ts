import {
  ConsoleAction,
  ConsoleActionTypes,
  ConsoleState,
} from "store/types/console";

const initialState: ConsoleState = {
  query: "",
  result: "",
  loading: false,
  queryError: false,
  resultError: false,
};

export const consoleReducer = (
  state = initialState,
  action: ConsoleAction,
): ConsoleState => {
  switch (action.type) {
    case ConsoleActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
        loading: false,
        queryError: false,
      };
    case ConsoleActionTypes.SET_RESULT:
      return {
        ...state,
        result: action.payload.result,
        loading: false,
        resultError: action.payload.error,
      };
    case ConsoleActionTypes.SET_QUERY_ERROR:
      return { ...state, queryError: action.payload, loading: false };
    case ConsoleActionTypes.MAKE_REQUEST:
      return { ...state, loading: true, result: "", resultError: false };
    case ConsoleActionTypes.PRETTY_QUERY:
      return { ...state, query: action.payload };
    case ConsoleActionTypes.PRETTY_RESULT:
      return { ...state, result: action.payload };
    default:
      return state;
  }
};
