import classNames from "classnames";
import { useOutsideClicker } from "hooks/useOutsideClicker";
import { useTypedSelector } from "hooks/useTypedSelector";
import React, { FC, useEffect, useRef, useState } from "react";
import { DropdownOption } from "types/dropdown";
import "./styles/style.css";

export interface DropdownProps {
  opened: boolean;
  options: DropdownOption[];
  width: number;
  height: number;
  offsetTop: number;
  offsetLeft: number;
}

const Dropdown: FC<DropdownProps> = ({
  opened,
  options,
  width,
  height,
  offsetTop,
  offsetLeft,
}) => {
  const [openedInner, setOpenedInner] = useState<boolean>(opened);
  const [offsetTopInner, setOffsetTopInner] = useState<number>(offsetTop);

  const windowState = useTypedSelector((root) => root.window);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOffsetTopInner(offsetTop);
  }, [offsetTop]);

  useEffect(() => {
    setOpenedInner(opened);
  }, [opened]);

  useEffect(() => {
    if (!openedInner || !dropdownRef.current) return;

    const heightWithOffset = dropdownRef.current.clientHeight + offsetTop;
    const difference = windowState.height - heightWithOffset - height;

    if (difference < 0) setOffsetTopInner(offsetTop + difference);
    else setOffsetTopInner(offsetTop);
  }, [windowState.height, openedInner]);

  useOutsideClicker(() => {
    setOpenedInner(false);
  }, [dropdownRef]);

  const handleOptionClick = (option: DropdownOption) => {
    setOpenedInner(false);
    option?.onClick.call(null);
  };

  return (
    <div
      className={classNames("dropdown", { "dropdown--opened": openedInner })}
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
