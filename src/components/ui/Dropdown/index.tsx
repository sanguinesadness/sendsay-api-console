import classNames from "classnames";
import { useOutsideClicker } from "hooks/useOutsideClicker";
import { useTypedSelector } from "hooks/useTypedSelector";
import React, { FC, useEffect, useRef, useState } from "react";
import { DropdownOption } from "types/dropdown";
import "./styles/style.css";

export interface DropdownProps {
  open: boolean;
  options: DropdownOption[];
  width: number;
  height: number;
  offsetTop: number;
  offsetLeft: number;
}

const Dropdown: FC<DropdownProps> = ({
  open,
  options,
  width,
  height,
  offsetTop,
  offsetLeft,
}) => {
  const [openInner, setOpenInner] = useState<boolean>(open);
  const [offsetTopInner, setOffsetTopInner] = useState<number>(offsetTop);

  const windowState = useTypedSelector((root) => root.window);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOffsetTopInner(offsetTop);
  }, [offsetTop]);

  useEffect(() => {
    setOpenInner(open);
  }, [open]);

  useEffect(() => {
    if (!openInner || !dropdownRef.current) return;

    const heightWithOffset = dropdownRef.current.clientHeight + offsetTop;
    const difference = windowState.height - heightWithOffset - height;

    if (difference < 0) setOffsetTopInner(offsetTop + difference);
    else setOffsetTopInner(offsetTop);
  }, [windowState.height, openInner]);

  useOutsideClicker(() => {
    setOpenInner(false);
  }, [dropdownRef]);

  const handleOptionClick = (option: DropdownOption) => {
    setOpenInner(false);
    option?.onClick.call(null);
  };

  return (
    <div
      className={classNames("dropdown", { "dropdown--opened": openInner })}
      ref={dropdownRef}
      style={{
        minWidth: width,
        top: offsetTopInner + height,
        left: offsetLeft,
      }}>
      {options.map((option, i) =>
        option === null ? (
          <span key={i} className="dropdown__separator" />
        ) : (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option)}
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
