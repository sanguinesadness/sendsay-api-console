import { makeAutoObservable } from "mobx";
import React from "react";

class BurgerMenuState {
  private _opened = false;

  constructor() {
    makeAutoObservable(this);
  }

  public get opened() {
    return this._opened;
  }

  public close() {
    this._opened = false;
  }

  public open() {
    this._opened = true;
  }

  public toggle() {
    this._opened = !this._opened;
  }
}

export const BurgerMenuStateContext = React.createContext(
  new BurgerMenuState(),
);
