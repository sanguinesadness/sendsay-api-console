export interface WindowState {
  height: number;
  width: number;
}

export enum WindowActionTypes {
  UPDATE_HEIGHT = "UPDATE_HEIGHT",
  UPDATE_WIDTH = "UPDATE_WIDTH",
}

export interface UpdateHeightAction {
  type: WindowActionTypes.UPDATE_HEIGHT;
}

export interface UpdateWidthAction {
  type: WindowActionTypes.UPDATE_WIDTH;
}

export type WindowAction = UpdateHeightAction | UpdateWidthAction;
