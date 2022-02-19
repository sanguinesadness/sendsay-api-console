import { MAX_TRACK_LENGTH } from "constants/history-track";
import { makeAutoObservable } from "mobx";
import { HistoryTrackItem } from "./types";
import React from "react";

class HistoryTrackState {
  private _items: HistoryTrackItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  private updateLocalStorage() {
    localStorage.removeItem("history-track");
    localStorage.setItem("history-track", JSON.stringify(this._items));
  }

  private setItems(items: HistoryTrackItem[]) {
    this._items = items;
  }

  public get items() {
    return this._items;
  }

  public deleteItem(id: string) {
    this.setItems(this._items.filter((item) => item.id !== id));
    this.updateLocalStorage();
  }

  public addItem(item: HistoryTrackItem) {
    const filteredItems = this._items.filter(
      (i) => i.requestBody.action !== item.requestBody.action,
    );

    while (filteredItems.length >= MAX_TRACK_LENGTH) {
      filteredItems.pop();
    }

    this.setItems([item, ...filteredItems]);
    this.updateLocalStorage();
  }

  public clear() {
    this.setItems([]);
    this.updateLocalStorage();
  }

  public restore() {
    const itemsStr = localStorage.getItem("history-track");
    if (!itemsStr) return;

    let items: HistoryTrackItem[];

    try {
      items = JSON.parse(itemsStr) as HistoryTrackItem[];
    } catch {
      return;
    }

    this.setItems(items);
  }
}

export const HistoryTrackStateContext = React.createContext(
  new HistoryTrackState(),
);
