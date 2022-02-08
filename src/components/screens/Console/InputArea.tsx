import TextArea from "components/ui/TextArea";
import { useTypedSelector } from "hooks/useTypedSelector";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { setRequest } from "store/actions/console";
import "./styles/style.css";

interface InputAreaProps {
  width: number;
}

const InputArea: FC<InputAreaProps> = ({ width }) => {
  const dispatch = useDispatch();
  const consoleState = useTypedSelector((root) => root.console);

  const onQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setRequest(event.target.value));
  };

  return (
    <TextArea
      className="body__textarea body__textarea--input"
      label="Запрос:"
      error={consoleState.requestError}
      value={consoleState.request}
      onChange={onQueryChange}
      width={width}
      minWidth={400}
    />
  );
};

export default InputArea;
