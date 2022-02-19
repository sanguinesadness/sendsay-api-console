import TextArea from "components/ui/TextArea";
import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { ConsoleStateContext } from "stores/console";
import "./styles/style.css";

interface InputAreaProps {
  width: number;
  minWidth: number;
}

const InputArea: FC<InputAreaProps> = ({ width, minWidth }) => {
  const consoleState = useContext(ConsoleStateContext);

  const onQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    consoleState.setRequest(event.target.value);
  };

  return (
    <TextArea
      className="body__textarea body__textarea--input"
      label="Запрос:"
      error={consoleState.requestError}
      value={consoleState.request}
      onChange={onQueryChange}
      width={width}
      minWidth={minWidth}
    />
  );
};

export default observer(InputArea);
