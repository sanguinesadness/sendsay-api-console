import TextArea from "components/ui/TextArea";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { ConsoleStateContext } from "stores/console";
import "./styles/style.css";

interface OutputAreaProps {
  width: number;
  minWidth: number;
}

const OutputArea: FC<OutputAreaProps> = ({ width, minWidth }) => {
  const consoleState = useContext(ConsoleStateContext);

  useEffect(() => {
    consoleState.prettyResponse();
  }, [consoleState.response]);

  return (
    <TextArea
      className="body__textarea body__textarea--output"
      label="Ответ:"
      error={consoleState.responseError}
      value={consoleState.response}
      width={width}
      readOnly
      minWidth={minWidth}
    />
  );
};

export default observer(OutputArea);
