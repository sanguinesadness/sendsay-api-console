import { SendsayRequest } from "api/sendsay/types/request";

export interface HistoryTrackItem {
  id: string;
  requestBody: SendsayRequest;
  error: boolean;
}

export interface HistoryTrackState {
  items: HistoryTrackItem[];
}

export enum HistoryTrackActionTypes {
  ADD_HISTORY_ITEM = "ADD_HISTORY_ITEM",
  DELETE_HISTORY_ITEM = "DELETE_HISTORY_ITEM",
  CLEAR_HISTORY = "CLEAR_HISTORY",
  RESTORE_HISTORY = "RESTORE_HISTORY",
}

export interface AddHistoryItemAction {
  type: HistoryTrackActionTypes.ADD_HISTORY_ITEM;
  payload: HistoryTrackItem;
}

export interface DeleteHistoryItemAction {
  type: HistoryTrackActionTypes.DELETE_HISTORY_ITEM;
  payload: string;
}

export interface ClearHistory {
  type: HistoryTrackActionTypes.CLEAR_HISTORY;
}

export interface RestoreHistory {
  type: HistoryTrackActionTypes.RESTORE_HISTORY;
  payload: HistoryTrackItem[];
}

export type HistoryTrackAction =
  | AddHistoryItemAction
  | DeleteHistoryItemAction
  | RestoreHistory
  | ClearHistory;
