import classNames from "classnames";
import React, { FC } from "react";
import "./styles/style.css";

export interface TextAreaProps {
  value: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  name?: string;
  className?: string;
  readOnly?: boolean;
  width?: number;
  minWidth?: number;
}

const TextArea: FC<TextAreaProps> = ({
  value,
  onChange,
  label,
  placeholder,
  onKeyPress,
  name,
  className,
  readOnly,
  error,
  width,
  minWidth,
}) => {
  return (
    <div
      className={classNames("textarea", className, {
        "textarea--error": error,
      })}
      style={{
        width: width ? width : "",
        minWidth: minWidth ? minWidth : "",
      }}>
      {label && <span className="textarea__label">{label}</span>}
      <textarea
        name={name}
        className="textarea__inner"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        readOnly={readOnly}
      />
    </div>
  );
};

export default TextArea;
