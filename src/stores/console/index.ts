import { SendsayRequest } from "api/sendsay/types/request";
import { action, makeAutoObservable, runInAction } from "mobx";
import { HistoryTrackItem } from "store/types/history-track";
import { LastItemPayload, ResponsePayload } from "./types";
import sendsayApi from "api/sendsay";
import { v4 } from "uuid";
import { prettyJSON } from "common/json-prettier";
import React from "react";

class ConsoleState {
  _lastItem?: HistoryTrackItem;
  _request = "";
  _response = "";
  _loading = false;
  _requestError?: boolean = false;
  _responseError?: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public get lastItem() {
    return this._lastItem;
  }

  public get request() {
    return this._request;
  }
  public get response() {
    return this._response;
  }
  public get loading() {
    return this._loading;
  }
  public get requestError() {
    return this._requestError;
  }
  public get responseError() {
    return this._responseError;
  }

  public setRequest(value: string) {
    this._request = value;
    this.setRequestError(false);
    this.setLoading(false);
  }

  public setResponse(data: ResponsePayload) {
    this._response = data.result;
    this.setResponseError(data.error);
    this.setLoading(false);
  }

  private setLoading(value: boolean) {
    this._loading = value;
  }

  public setLastItem(data: LastItemPayload) {
    this._lastItem = {
      id: v4(),
      requestBody: data.requestBody,
      error: data.error,
    };
  }

  private setRequestError(value?: boolean) {
    this._requestError = value;
  }

  private setResponseError(value?: boolean) {
    this._responseError = value;
  }

  public async makeRequest(queryStr: string) {
    this.setResponse({ result: "", error: false });
    this.setLoading(true);

    // try parse input queryStr as SendsayRequest
    let request: SendsayRequest;
    try {
      request = JSON.parse(queryStr);
      if (!request.action) throw new Error();
    } catch {
      this.setRequestError(true);
      return;
    }

    try {
      const resp = await sendsayApi.makeRequest(request);
      runInAction(() => {
        // set successful Console result
        this.setResponse({ result: JSON.stringify(resp), error: false });

        // set last successful Console request
        this.setLastItem({ requestBody: request, error: false });
      });
    } catch (err) {
      runInAction(() => {
        // set wrong Console result
        this.setResponse({
          result: JSON.stringify(err),
          error: true,
        });

        // set last wrong Console request
        this.setLastItem({ requestBody: request, error: true });
      });
    }

    this.setLoading(false);
  }

  public prettyRequest() {
    const prettyQuery = prettyJSON(this.request);

    if (prettyQuery) {
      this.setRequest(prettyQuery);
    } else {
      this.setRequestError(true);
    }
  }

  public prettyResponse() {
    const prettyResult = prettyJSON(this.response);

    if (prettyResult) {
      this.setResponse({ result: prettyResult, error: this.responseError });
    }
  }
}

export const ConsoleStateContext = React.createContext<ConsoleState>(
  new ConsoleState(),
);
