import React from "react";
import { GITHUB_LINK, GITHUB_NAME } from "constants/github";
import { ReactComponent as AlignIcon } from "assets/icons/align.svg";
import Button from "components/ui/Button";
import "./styles/style.css";

const Footer = () => {
  return (
    <div className="console-screen__footer footer">
      <Button className="footer__send-button" text="Отправить" type="default" />
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
        text="Форматировать"
        icon={AlignIcon}
        type="no-bg"
      />
    </div>
  );
};

export default Footer;
