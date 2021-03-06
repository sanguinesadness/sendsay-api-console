import classNames from "classnames";
import React, { FC, HTMLInputTypeAttribute } from "react";
import "./styles/style.css";

interface InputProps {
  value: string;
  label?: string;
  extraLabel?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  name?: string;
  className?: string;
  error?: boolean;
}

const Input: FC<InputProps> = ({
  value,
  label,
  extraLabel,
  placeholder,
  onChange,
  onKeyPress,
  type,
  name,
  className,
  error,
}) => {
  return (
    <div className={classNames("input", className, { "input--error": error })}>
      <div className="input__labels labels">
        {label && <span className="labels__main-label">{label}</span>}
        {extraLabel && (
          <span className="labels__extra-label">{extraLabel}</span>
        )}
      </div>

      <input
        className="input__inner"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
        name={name}
      />
    </div>
  );
};

export default Input;
