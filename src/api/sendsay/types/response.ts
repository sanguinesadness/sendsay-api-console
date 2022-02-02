export interface SendsayError {
  id: string;
  explain: string;
  request: any;
}

export interface SendsaySuccess {
  code: number;
}