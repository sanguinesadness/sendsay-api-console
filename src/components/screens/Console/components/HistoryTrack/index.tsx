import classNames from "classnames";
import React, { FC, useState } from "react";
import TrackItem from "./TrackItem";

const actions = [
  "track.get",
  "issue.send",
  "pong",
  "track.get",
  "stat.uni",
  "track.get",
  "sys.settings.get",
  "track.get",
  "track.get",
  "pong",
  "issue.send",
  "sys.settings.get",
  "issue.send",
  "issue.send",
  "sys.settings.get",
];

interface HistoryTrackProps {
  className?: string;
}

const HistoryTrack: FC<HistoryTrackProps> = ({ className }) => {
  const [leftFadeVisible, setLeftFadeVisible] = useState<boolean>(false);
  const [rightFadeVisible, setRightFadeVisible] = useState<boolean>(false);

  const onTrackScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollRight =
      event.currentTarget.scrollWidth -
      event.currentTarget.scrollLeft -
      event.currentTarget.clientWidth;
    const scrollLeft = event.currentTarget.scrollLeft;

    if (scrollLeft > 0) setLeftFadeVisible(true);
    else setLeftFadeVisible(false);

    if (scrollRight > 0) setRightFadeVisible(true);
    else setRightFadeVisible(false);
  };

  return (
    <div
      className={classNames("history-track", className)}
      onScroll={onTrackScroll}>
      {actions.map((action) => (
        <TrackItem key={action} action={action} success={false} />
      ))}
      <div
        className={classNames(
          "history-track__fade",
          "history-track__fade--left",
          { "history-track__fade--visible": leftFadeVisible },
        )}>
        <div />
      </div>
      <div
        className={classNames(
          "history-track__fade",
          "history-track__fade--right",
          { "history-track__fade--visible": rightFadeVisible },
        )}>
        <div />
      </div>
    </div>
  );
};

export default HistoryTrack;
