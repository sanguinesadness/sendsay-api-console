import TextArea from "components/ui/TextArea";
import { useTypedSelector } from "hooks/useTypedSelector";
import React from "react";
import { useEffect } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { prettyResult } from "store/actions/console";
import "./styles/style.css";

interface OutputAreaProps {
  width: number;
}

const OutputArea: FC<OutputAreaProps> = ({ width }) => {
  const dispatch = useDispatch();
  const { result, resultError } = useTypedSelector((root) => root.console);

  useEffect(() => {
    dispatch(prettyResult());
  }, [result]);

  return (
    <TextArea
      className="body__textarea body__textarea--output"
      label="Ответ:"
      error={resultError}
      value={result}
      width={width}
      readOnly
      minWidth={100}
    />
  );
};

export default OutputArea;
