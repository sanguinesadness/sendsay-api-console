import { makeAutoObservable } from "mobx";
import React from "react";

class WindowState {
  private _height: number = document.documentElement.clientHeight;
  private _width: number = document.documentElement.clientWidth;

  constructor() {
    makeAutoObservable(this);
  }

  private setHeight(value: number) {
    this._height = value;
  }

  private setWidth(value: number) {
    this._width = value;
  }

  public get height() {
    return this._height;
  }

  public get width() {
    return this._width;
  }

  public updateSizes() {
    this.setHeight(document.documentElement.clientHeight);
    this.setWidth(document.documentElement.clientWidth);
  }
}

export const WindowStateContext = React.createContext<WindowState>(
  new WindowState(),
);
