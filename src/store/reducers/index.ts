import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { consoleReducer } from "./consoleReducer";
import { windowReducer } from "./windowReducer";
import { historyTrackReducer } from "./historyTrackReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  console: consoleReducer,
  window: windowReducer,
  historyTrack: historyTrackReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
