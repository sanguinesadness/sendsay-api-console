import { combineReducers } from "redux";
import { historyTrackReducer } from "./historyTrackReducer";
import { burgerMenuReducer } from "./burgerMenu";

export const rootReducer = combineReducers({
  historyTrack: historyTrackReducer,
  burgerMenu: burgerMenuReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
