import TextArea from "components/ui/TextArea";
import { useTypedSelector } from "hooks/useTypedSelector";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "store/actions/console";

interface InputAreaProps {
  width: number;
}

const InputArea: FC<InputAreaProps> = ({ width }) => {
  const dispatch = useDispatch();
  const consoleState = useTypedSelector((root) => root.console);

  const onQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setQuery(event.target.value));
  };

  return (
    <TextArea
      className="body__textarea body__textarea--input"
      label="Запрос:"
      error={consoleState.queryError}
      value={consoleState.query}
      onChange={onQueryChange}
      width={width}
      minWidth={100}
    />
  );
};

export default InputArea;