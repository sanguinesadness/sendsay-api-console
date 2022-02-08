export interface SendsayError {
  id: string;
  explain: string;
  request: any;
}

export interface SendsaySuccess {
  "request.id": string;
  duration: number;
}
