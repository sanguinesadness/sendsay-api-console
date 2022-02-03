import React, { FC } from "react";
import { ReactComponent as MehIcon } from "../../../assets/icons/meh.svg";
import "./styles/style.css";

interface ErrorLabelProps {
  title: string;
  message: string;
}

const ErrorLabel: FC<ErrorLabelProps> = ({ title, message }) => {
  return (
    <div className="error-label">
      <div className="error-label__icon icon">
        <MehIcon className="icon__inner" />
      </div>
      <div className="error-label__content content">
        <span className="content__title">{title}</span>
        <span className="content__message">{message}</span>
      </div>
    </div>
  );
};

export default ErrorLabel;
