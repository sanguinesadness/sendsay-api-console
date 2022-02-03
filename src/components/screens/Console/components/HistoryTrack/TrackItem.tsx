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
        "actions__action action",
        { "actions__action--error": !success },
        {
          "actions__action--success": success,
        },
      )}>
      <span className="action__status" />
      <span className="action__action-name">{action}</span>
      <div className="action__dropdown dropdown">
        <DragIcon className="dropdown__icon" />
      </div>
    </div>
  );
};

export default TrackItem;
