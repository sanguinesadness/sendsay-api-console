import {
  HistoryTrackAction,
  HistoryTrackActionTypes,
  HistoryTrackState,
} from "store/types/history-track";

const initialState: HistoryTrackState = {
  items: [],
};

export const historyTrackReducer = (
  state = initialState,
  action: HistoryTrackAction,
): HistoryTrackState => {
  switch (action.type) {
    case HistoryTrackActionTypes.ADD_HISTORY_ITEM: {
      const filteredItems = state.items.filter(
        (i) => i.requestBody.action !== action.payload.requestBody.action,
      );

      return { items: [action.payload, ...filteredItems] };
    }

    case HistoryTrackActionTypes.DELETE_HISTORY_ITEM:
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case HistoryTrackActionTypes.CLEAR_HISTORY:
      return { items: [] };
    case HistoryTrackActionTypes.RESTORE_HISTORY:
      return { items: action.payload };
    default:
      return state;
  }
};
