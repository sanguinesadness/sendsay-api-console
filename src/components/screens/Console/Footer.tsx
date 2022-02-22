import React, { useContext, useEffect } from "react";
import { GITHUB_LINK, GITHUB_NAME } from "constants/github";
import { ReactComponent as AlignIcon } from "assets/icons/align.svg";
import { ReactComponent as SendIcon } from "assets/icons/send.svg";
import Button from "components/ui/Button";
import { WindowStateContext } from "stores/window";
import { observer } from "mobx-react-lite";
import { ConsoleStateContext } from "stores/console";
import { HistoryTrackStateContext } from "stores/history-track";
import "./styles/style.css";

const Footer = () => {
  const consoleState = useContext(ConsoleStateContext);
  const windowState = useContext(WindowStateContext);
  const historyTrackState = useContext(HistoryTrackStateContext);

  const less550px = windowState.width < 550;

  const handlePretty = () => consoleState.prettyRequest();

  const handleRequest = () => {
    consoleState.prettyRequest();
    consoleState.makeRequest(consoleState.request);
  };

  // add item to HistoryTrack
  useEffect(() => {
    if (consoleState.lastItem) historyTrackState.addItem(consoleState.lastItem);
  }, [consoleState.lastItem]);

  return (
    <div className="console-screen__footer footer">
      <Button
        className="footer__send-button"
        text={less550px ? "" : "Отправить"}
        icon={less550px ? SendIcon : undefined}
        loading={consoleState.loading}
        type="default"
        onClick={handleRequest}
      />
      <div className="footer__link link">
        <a
          className="link__inner"
          href={GITHUB_LINK}
          target="_blank"
          rel="noopener noreferrer">
          @{GITHUB_NAME}
        </a>
      </div>
      <Button
        className="footer__align-button"
        onClick={handlePretty}
        text="Форматировать"
        icon={AlignIcon}
        type="no-bg"
      />
    </div>
  );
};

export default observer(Footer);
