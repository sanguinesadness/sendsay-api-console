import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { consoleReducer } from "./consoleReducer";
import { windowReducer } from "./windowReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  console: consoleReducer,
  window: windowReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
