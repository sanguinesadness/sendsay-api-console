import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { consoleReducer } from "./consoleReducer";
import { windowReducer } from "./windowReducer";
import { historyTrackReducer } from "./historyTrackReducer";
import { burgerMenuReducer } from "./burgerMenu";

export const rootReducer = combineReducers({
  auth: authReducer,
  console: consoleReducer,
  window: windowReducer,
  historyTrack: historyTrackReducer,
  burgerMenu: burgerMenuReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
