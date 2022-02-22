import { SendsayRequest } from "api/sendsay/types/request";

export interface HistoryTrackItem {
  id: string;
  requestBody: SendsayRequest;
  error: boolean;
}