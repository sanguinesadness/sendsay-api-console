import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { consoleReducer } from "./consoleReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  console: consoleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
