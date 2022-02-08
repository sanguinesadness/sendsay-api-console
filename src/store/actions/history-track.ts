import { Dispatch } from "react";
import { store } from "store";
import {
  HistoryTrackAction,
  HistoryTrackActionTypes,
  HistoryTrackItem,
} from "store/types/history-track";

export const addHistoryTrackItem = (item: HistoryTrackItem) => {
  return (dispatch: Dispatch<HistoryTrackAction>) => {
    dispatch({ type: HistoryTrackActionTypes.ADD_HISTORY_ITEM, payload: item });

    const items = store.getState().historyTrack.items;
    localStorage.removeItem("history-track");
    localStorage.setItem("history-track", JSON.stringify(items));
  };
};

export const deleteHistoryTrackItem = (itemId: string) => {
  return (dispatch: Dispatch<HistoryTrackAction>) => {
    dispatch({
      type: HistoryTrackActionTypes.DELETE_HISTORY_ITEM,
      payload: itemId,
    });
  };
};

export const clearHistoryTrack = () => {
  return (dispatch: Dispatch<HistoryTrackAction>) => {
    dispatch({ type: HistoryTrackActionTypes.CLEAR_HISTORY });
  };
};

export const restoreHistoryTrack = () => {
  return (dispatch: Dispatch<HistoryTrackAction>) => {
    const itemsStr = localStorage.getItem("history-track");
    if (!itemsStr) return;

    let items: HistoryTrackItem[];

    try {
      items = JSON.parse(itemsStr) as HistoryTrackItem[];
    } catch {
      return;
    }

    dispatch({ type: HistoryTrackActionTypes.RESTORE_HISTORY, payload: items });
  };
};
