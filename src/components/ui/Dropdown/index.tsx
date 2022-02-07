import classNames from "classnames";
import { useOutsideClicker } from "hooks/useOutsideClicker";
import React, { FC, useEffect, useRef, useState } from "react";
import { DropdownOption } from "store/types/dropdown";
import "./styles/style.css";

export interface DropdownProps {
  open: boolean;
  options: DropdownOption[];
  width: number;
  height: number;
  offsetTop: number;
  offsetLeft: number;
  windowHeight: number;
}

const Dropdown: FC<DropdownProps> = ({
  open,
  options,
  width,
  height,
  offsetTop,
  offsetLeft,
  windowHeight,
}) => {
  const [openInner, setOpenInner] = useState<boolean>(open);
  const [offsetTopInner, setOffsetTopInner] = useState<number>(offsetTop);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOffsetTopInner(offsetTop);
  }, [offsetTop]);

  useEffect(() => {
    setOpenInner(open);
  }, [open]);

  useOutsideClicker(() => {
    setOpenInner(false);
  }, [dropdownRef]);

  useEffect(() => {
    if (!openInner || !dropdownRef.current) return;

    const heightWidthOffset = dropdownRef.current.clientHeight + offsetTop;
    const difference =
      document.documentElement.clientHeight - heightWidthOffset - height;

    if (difference < 0) setOffsetTopInner(offsetTop + difference);
    else setOffsetTopInner(offsetTop);
  }, [windowHeight]);

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