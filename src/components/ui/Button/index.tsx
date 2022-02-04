import classNames from "classnames";
import React, { FC } from "react";
import { ReactComponent as LoadingIcon } from "assets/icons/loading.svg";
import { ButtonType, IconPlace } from "types/button";
import { SvgIconType } from "types/svg-icon";
import "./styles/style.css";

interface ButtonProps {
  type?: ButtonType;
  onClick?: () => void;
  text?: string;
  icon?: SvgIconType;
  iconPlace?: IconPlace;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  text,
  icon,
  iconPlace,
  onClick,
  disabled,
  loading,
  type,
  className,
}) => {
  const Icon = icon;

  const onButtonClick = () => {
    if (!loading && !disabled && onClick) onClick();
  };

  return (
    <button
      className={classNames(
        "button",
        className,
        { "button--disabled": disabled },
        { "button--loading": loading },
        { "button--nobg": type === "no-bg" },
        { "button--icon-right": iconPlace === "right" },
      )}
      onClick={onButtonClick}>
      {Icon && <Icon className="button__icon" />}
      {text && <span className="button__text">{text}</span>}
      {loading && <LoadingIcon className="button__loading-spinner" />}
    </button>
  );
};

export default Button;
