import React, { FC, useRef, useState } from "react";
import "./styles/style.css";
import { ReactComponent as DragIcon } from "../../../../../assets/icons/drag.svg";
import classNames from "classnames";
import Dropdown from "components/ui/Dropdown";
import { DropdownOption } from "store/types/dropdown";
import { v4 } from "uuid";

const dropdownOptions: DropdownOption[] = [
  {
    id: v4(),
    text: "Выполнить",
    color: "blue",
    onClick: () => {
      /* */
    },
  },
  {
    id: v4(),
    text: "Скопировать",
    color: "blue",
    onClick: () => {
      /* */
    },
  },
  null,
  {
    id: v4(),
    text: "Удалить",
    color: "red",
    onClick: () => {
      /* */
    },
  },
];

interface TrackItemProps {
  action: string;
  success: boolean;
  scrollOffsetLeft: number;
  scrollOffsetTop: number;
  wrapperOffsetLeft: number;
  wrapperOffsetTop: number;
  windowHeight: number;
}

const TrackItem: FC<TrackItemProps> = ({
  action,
  success,
  scrollOffsetLeft,
  scrollOffsetTop,
  wrapperOffsetLeft,
  wrapperOffsetTop,
  windowHeight
}) => {
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);
  const toggleDropdown = () => setDropdownOpened((prev) => !prev);

  const actionRef = useRef<HTMLDivElement>(null);

  const actionWidth = actionRef.current?.offsetWidth || 0;
  const actionHeight = actionRef.current?.offsetHeight || 0;
  const offsetLeft =
    (actionRef.current?.offsetLeft || 0) - scrollOffsetLeft + wrapperOffsetLeft;
  const offsetTop =
    (actionRef.current?.offsetTop || 0) - scrollOffsetTop + wrapperOffsetTop;

  return (
    <React.Fragment>
      <div
        className={classNames(
          "actions__action action",
          { "actions__action--error": !success },
          {
            "actions__action--success": success,
          },
        )}
        ref={actionRef}>
        <span className="action__status" />
        <span className="action__action-name">{action}</span>
        <div
          className="action__dropdown-button dropdown-button"
          onClick={toggleDropdown}>
          <DragIcon className="dropdown-button__icon" />
        </div>
      </div>
      <Dropdown
        open={dropdownOpened}
        width={actionWidth}
        height={actionHeight}
        offsetLeft={offsetLeft}
        offsetTop={offsetTop + 5}
        options={dropdownOptions}
        windowHeight={windowHeight}
      />
    </React.Fragment>
  );
};

export default TrackItem;
