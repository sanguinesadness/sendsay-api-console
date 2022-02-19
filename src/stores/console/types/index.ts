import { HistoryTrackItem } from "store/types/history-track";

export interface ResponsePayload {
  result: string;
  error?: boolean;
}

export type LastItemPayload = Pick<HistoryTrackItem, "requestBody" | "error">;
