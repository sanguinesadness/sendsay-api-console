import React, { FC, useContext, useRef, useState } from "react";
import "./styles/style.css";
import { ReactComponent as DragIcon } from "assets/icons/drag.svg";
import { ReactComponent as CheckIcon } from "assets/icons/check.svg";
import classNames from "classnames";
import Dropdown from "components/ui/Dropdown";
import { DropdownOption } from "types/dropdown";
import { v4 } from "uuid";
import { HistoryTrackItem } from "store/types/history-track";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "hooks/useTypedSelector";
import { prettyJSON } from "common/json-prettier";
import { deleteHistoryTrackItem } from "store/actions/history-track";
import { ConsoleStateContext } from "stores/console";

export enum CopyStates {
  // normal state
  IDLE = "IDLE",
  // state after user clicked "Скопировать"
  COPIED = "COPIED",
  // state after some time of floating - flying away
  AWAY = "AWAY",
}

interface TrackItemProps {
  item: HistoryTrackItem;
  scrollOffsetLeft: number;
  scrollOffsetTop: number;
  wrapperOffsetLeft: number;
  wrapperOffsetTop: number;
}

const TrackItem: FC<TrackItemProps> = ({
  item,
  scrollOffsetLeft,
  scrollOffsetTop,
  wrapperOffsetLeft,
  wrapperOffsetTop,
}) => {
  const dispatch = useDispatch();
  const historyTrackState = useTypedSelector((root) => root.historyTrack);
  const consoleState = useContext(ConsoleStateContext);

  const [copyState, setCopyState] = useState<CopyStates>(CopyStates.IDLE);

  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);
  const toggleDropdown = () => setDropdownOpened((prev) => !prev);

  const itemRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLDivElement>(null);

  const itemWidth = itemRef.current?.offsetWidth || 0;
  const itemHeight = itemRef.current?.offsetHeight || 0;
  const offsetLeft =
    (itemRef.current?.offsetLeft || 0) - scrollOffsetLeft + wrapperOffsetLeft;
  const offsetTop =
    (itemRef.current?.offsetTop || 0) - scrollOffsetTop + wrapperOffsetTop;

  const switchCopyStates = () => {
    setCopyState(CopyStates.COPIED);
    setTimeout(() => {
      setCopyState(CopyStates.AWAY);
      setTimeout(() => setCopyState(CopyStates.IDLE), 500);
    }, 2000);
  };

  const getItemQueryStr = (): string | null => {
    const trackItem = historyTrackState.items.find((i) => i.id === item.id);
    if (!trackItem) return null;

    return JSON.stringify(trackItem.requestBody);
  };

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const dropdownButton = dropdownButtonRef.current;

    // if user clicked on Dropdown button
    if (
      dropdownButton &&
      dropdownButton.contains(event.target as HTMLElement)
    ) {
      return;
    }

    const queryStr = getItemQueryStr();
    if (!queryStr) return;

    consoleState.setRequest(queryStr);
    consoleState.prettyRequest();
  };

  const handleExecuteClick = () => {
    const queryStr = getItemQueryStr();
    if (!queryStr) return;

    consoleState.setRequest(queryStr);
    consoleState.prettyRequest();
    consoleState.makeRequest(queryStr);
  };

  const handleCopyClick = () => {
    const queryStr = getItemQueryStr();
    if (!queryStr) return;

    const prettyQuery = prettyJSON(queryStr);
    if (prettyQuery) navigator.clipboard.writeText(prettyQuery);
    else navigator.clipboard.writeText(queryStr);

    switchCopyStates();
  };

  const handleDeleteClick = () => {
    dispatch(deleteHistoryTrackItem(item.id));
  };

  const dropdownOptions: DropdownOption[] = [
    {
      id: v4(),
      text: "Выполнить",
      color: "blue",
      onClick: handleExecuteClick,
    },
    {
      id: v4(),
      text: "Скопировать",
      color: "blue",
      onClick: handleCopyClick,
    },
    null,
    {
      id: v4(),
      text: "Удалить",
      color: "red",
      onClick: handleDeleteClick,
    },
  ];

  return (
    <React.Fragment>
      <div
        className={classNames(
          "actions__action action",
          { "actions__action--error": item.error },
          {
            "actions__action--success": !item.error,
          },
        )}
        ref={itemRef}
        onClick={handleItemClick}>
        <span className="action__status" />
        <span className="action__info info">
          <span className="info__name">{item.requestBody.action}</span>
          <span
            className={classNames(
              "info__copy-state",
              { "info__copy-state--idle": copyState === CopyStates.IDLE },
              { "info__copy-state--copied": copyState === CopyStates.COPIED },
              { "info__copy-state--away": copyState === CopyStates.AWAY },
            )}>
            {itemWidth < 150 ? <CheckIcon /> : "Скопировано"}
          </span>
        </span>
        <div
          className="action__dropdown-button dropdown-button"
          onClick={toggleDropdown}
          ref={dropdownButtonRef}>
          <DragIcon className="dropdown-button__icon" />
        </div>
      </div>
      <Dropdown
        opened={dropdownOpened}
        width={itemWidth}
        height={itemHeight}
        offsetLeft={offsetLeft}
        offsetTop={offsetTop + 5}
        options={dropdownOptions}
      />
    </React.Fragment>
  );
};

export default TrackItem;
