import React, { FC } from "react";
import "./styles/style.css";
import { ReactComponent as DragIcon } from "../../../../../assets/icons/drag.svg";
import classNames from "classnames";

interface TrackItemProps {
  action: string;
  success: boolean;
}

const TrackItem: FC<TrackItemProps> = ({ action, success }) => {
  return (
    <div
      className={classNames(
        "history-track__item item",
        { "history-track__item--error": !success },
        {
          "history-track__item--success": success,
        },
      )}>
      <span className="item__status" />
      <span className="item__action">{action}</span>
      <div className="item__dropdown dropdown">
        <DragIcon className="dropdown__icon" />
      </div>
    </div>
  );
};

export default TrackItem;
