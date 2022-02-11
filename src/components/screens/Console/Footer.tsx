import React, { useEffect } from "react";
import { GITHUB_LINK, GITHUB_NAME } from "constants/github";
import { ReactComponent as AlignIcon } from "assets/icons/align.svg";
import { ReactComponent as SendIcon } from "assets/icons/send.svg";
import Button from "components/ui/Button";
import "./styles/style.css";
import { useDispatch } from "react-redux";
import { makeRequest, prettyRequest } from "store/actions/console";
import { useTypedSelector } from "hooks/useTypedSelector";
import { addHistoryTrackItem } from "store/actions/history-track";

const Footer = () => {
  const dispatch = useDispatch();

  const consoleState = useTypedSelector((root) => root.console);
  const windowState = useTypedSelector((root) => root.window);

  const less550px = windowState.width < 550;

  const handlePretty = () => dispatch(prettyRequest());

  const handleRequest = () => {
    dispatch(prettyRequest());
    dispatch(makeRequest(consoleState.request));
  };

  // add item to HistoryTrack
  useEffect(() => {
    if (consoleState.lastItem)
      dispatch(addHistoryTrackItem(consoleState.lastItem));
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

export default Footer;
