import classNames from "classnames";
import React, { FC, useEffect, useRef, useState } from "react";
import Button from "../../../../ui/Button";
import { ReactComponent as CloseIcon } from "../../../../../assets/icons/close.svg";
import TrackItem from "./TrackItem";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import {
  clearHistoryTrack,
  restoreHistoryTrack,
} from "store/actions/history-track";

interface HistoryTrackProps {
  className?: string;
}

const HistoryTrack: FC<HistoryTrackProps> = ({ className }) => {
  const { items } = useTypedSelector((root) => root.historyTrack);
  const dispatch = useDispatch();

  const [leftFadeVisible, setLeftFadeVisible] = useState<boolean>(false);
  const [rightFadeVisible, setRightFadeVisible] = useState<boolean>(true);

  const [scrollOffsetX, setScrollOffsetX] = useState<number>(0);
  const [scrollOffsetY, setScrollOffsetY] = useState<number>(0);

  const actionsRef = useRef<HTMLDivElement>(null);

  const handleActionsScroll = (
    event: React.UIEvent<HTMLDivElement, UIEvent>,
  ) => {
    const scrollRight =
      event.currentTarget.scrollWidth -
      event.currentTarget.scrollLeft -
      event.currentTarget.clientWidth;
    const scrollLeft = event.currentTarget.scrollLeft;

    setScrollOffsetX(scrollLeft);

    if (scrollLeft > 0) setLeftFadeVisible(true);
    else setLeftFadeVisible(false);

    if (scrollRight > 0) setRightFadeVisible(true);
    else setRightFadeVisible(false);
  };

  const handleClearClick = () => {
    dispatch(clearHistoryTrack());
  };

  useEffect(() => {
    dispatch(restoreHistoryTrack());

    const handleScroll = () => {
      setScrollOffsetY(document.scrollingElement?.scrollTop || 0);
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={classNames("history-track", className)}>
      <div
        className="history-track__actions actions"
        onScroll={handleActionsScroll}
        ref={actionsRef}>
        {items.map((item) => (
          <TrackItem
            key={item.id}
            item={item}
            scrollOffsetLeft={scrollOffsetX}
            scrollOffsetTop={scrollOffsetY}
            wrapperOffsetLeft={actionsRef.current?.offsetLeft || 0}
            wrapperOffsetTop={actionsRef.current?.offsetTop || 0}
          />
        ))}
        <div
          className={classNames("actions__fade", "actions__fade--left", {
            "actions__fade--visible": leftFadeVisible,
          })}>
          <div />
        </div>
        <div
          className={classNames("actions__fade", "actions__fade--right", {
            "actions__fade--visible": rightFadeVisible,
          })}>
          <div />
        </div>
      </div>
      <Button
        className="history-track__clear-button"
        icon={CloseIcon}
        onClick={handleClearClick}
        type="no-bg"
      />
    </div>
  );
};

export default HistoryTrack;
