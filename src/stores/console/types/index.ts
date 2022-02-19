import { HistoryTrackItem } from "stores/history-track/types/index";

export interface ResponsePayload {
  result: string;
  error?: boolean;
}

export type LastItemPayload = Pick<HistoryTrackItem, "requestBody" | "error">;
