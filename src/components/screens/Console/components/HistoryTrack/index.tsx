import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { ReactComponent as CloseIcon } from "assets/icons/close.svg";
import { HistoryTrackStateContext } from "stores/history-track";
import Button from "components/ui/Button/index";
import TrackItem from "./TrackItem";
import classNames from "classnames";
import "./styles/style.css";
import { observer } from "mobx-react-lite";

interface HistoryTrackProps {
  className?: string;
}

const HistoryTrack: FC<HistoryTrackProps> = ({ className }) => {
  const historyTrackState = useContext(HistoryTrackStateContext);

  const [leftFadeVisible, setLeftFadeVisible] = useState<boolean>(false);
  const [rightFadeVisible, setRightFadeVisible] = useState<boolean>(false);

  const [scrollOffsetX, setScrollOffsetX] = useState<number>(0);
  const [scrollOffsetY, setScrollOffsetY] = useState<number>(0);

  const actionsRef = useRef<HTMLDivElement>(null);

  const updateSideFades = (element: HTMLElement) => {
    const scrollRight =
      element.scrollWidth - element.scrollLeft - element.clientWidth;
    const scrollLeft = element.scrollLeft;

    setScrollOffsetX(scrollLeft);

    if (scrollLeft > 0) setLeftFadeVisible(true);
    else setLeftFadeVisible(false);

    if (scrollRight > 0) setRightFadeVisible(true);
    else setRightFadeVisible(false);
  };

  const handleActionsScroll = (
    event: React.UIEvent<HTMLDivElement, UIEvent>,
  ) => {
    updateSideFades(event.currentTarget);
  };

  const handleClearClick = () => {
    historyTrackState.clear();
  };

  useEffect(() => {
    historyTrackState.restore();

    const handleScroll = () => {
      setScrollOffsetY(document.scrollingElement?.scrollTop || 0);
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!actionsRef.current) return;
    updateSideFades(actionsRef.current);
  }, [historyTrackState.items.length]);

  return (
    <div className={classNames("history-track", className)}>
      <div
        className="history-track__actions actions"
        onScroll={handleActionsScroll}
        ref={actionsRef}>
        {historyTrackState.items.length > 0 ? (
          historyTrackState.items.map((item) => (
            <TrackItem
              key={item.id}
              item={item}
              scrollOffsetLeft={scrollOffsetX}
              scrollOffsetTop={scrollOffsetY}
              wrapperOffsetLeft={actionsRef.current?.offsetLeft || 0}
              wrapperOffsetTop={actionsRef.current?.offsetTop || 0}
            />
          ))
        ) : (
          <span className="actions__empty-label">История запросов пуста</span>
        )}
        <div
          className={classNames("actions__fade", "actions__fade--left", {
            "actions__fade--visible": leftFadeVisible,
          })}
          style={{ top: -scrollOffsetY }}>
          <div />
        </div>
        <div
          className={classNames("actions__fade", "actions__fade--right", {
            "actions__fade--visible": rightFadeVisible,
          })}
          style={{ top: -scrollOffsetY }}>
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

export default observer(HistoryTrack);
