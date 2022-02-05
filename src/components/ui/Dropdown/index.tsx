import classNames from "classnames";
import { useOutsideAlerter } from "hooks/useOutsideAlerter";
import React, { FC, useEffect, useRef, useState } from "react";
import { DropdownOption } from "store/types/dropdown";
import "./styles/style.css";

export interface DropdownProps {
  open: boolean;
  options: DropdownOption[];
  width: number;
  offsetTop: number;
  offsetLeft: number;
}

const Dropdown: FC<DropdownProps> = ({
  open,
  options,
  width,
  offsetTop,
  offsetLeft,
}) => {
  const [opened, setOpened] = useState<boolean>(open);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpened(open);
  }, [open]);

  useOutsideAlerter(() => {
    setOpened(false);
  }, [dropdownRef]);

  return (
    <div
      className={classNames("dropdown", { "dropdown--opened": opened })}
      ref={dropdownRef}
      style={{ minWidth: width, top: offsetTop, left: offsetLeft }}>
      {options.map((option, i) =>
        option === null ? (
          <span key={i} className="dropdown__separator" />
        ) : (
          <div
            key={option.id}
            className={classNames(
              "dropdown__option",
              "option",
              `option--${option.color || "blue"}`,
            )}>
            <span className="option__text">{option.text}</span>
          </div>
        ),
      )}
    </div>
  );
};

export default Dropdown;
