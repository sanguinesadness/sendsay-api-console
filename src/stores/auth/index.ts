import { AuthDto } from "api/sendsay/types/auth.dto";
import { SendsayError } from "api/sendsay/types/response";
import { makeAutoObservable } from "mobx";
import sendsayApi from "api/sendsay";
import React from "react";

class AuthState {
  private _data?: AuthDto = undefined;
  private _loading = false;
  private _error?: SendsayError = undefined;
  private _loggedIn?: boolean = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  private setData(value: AuthDto | undefined) {
    this._data = value;
  }

  private setLoading(value: boolean) {
    this._loading = value;
  }

  private setError(value: SendsayError | undefined) {
    this._error = value;
  }

  private setLoggedIn(value: boolean | undefined) {
    this._loggedIn = value;
  }

  public get data() {
    return this._data;
  }
  public get loading() {
    return this._loading;
  }
  public get error() {
    return this._error;
  }
  public get loggedIn() {
    return this._loggedIn;
  }

  private setDefaultValues() {
    this.setData(undefined);
    this.setLoading(false);
    this.setError(undefined);
    this.setLoggedIn(undefined);
  }

  public async login(dto: AuthDto) {
    this.setDefaultValues();
    this.setLoading(true);

    return sendsayApi
      .login(dto)
      .then(() => {
        this.setData(dto);
        this.setLoggedIn(true);
        this.setError(undefined);
      })
      .catch((err: SendsayError) => {
        this.setData(undefined);
        this.setError(err);
        this.setLoggedIn(false);
      })
      .finally(() => {
        this.setLoading(false);
      });
  }

  public logout() {
    sendsayApi.logout();
    this.setDefaultValues();
  }

  public async checkAuth() {
    this.setDefaultValues();
    this.setLoading(true);

    const loggedIn = await sendsayApi.loggedIn();

    if (loggedIn) {
      const data = sendsayApi.getAuthData();
      this.setData(data);
      this.setLoggedIn(true);
    } else {
      this.setData(undefined);
      this.setLoggedIn(false);
    }

    this.setLoading(false);
  }
}

export const AuthStateContext = React.createContext<AuthState>(new AuthState());
