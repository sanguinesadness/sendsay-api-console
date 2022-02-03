import React from "react";
import TextArea from "../../ui/TextArea";
import { ReactComponent as DragIcon } from "../../../assets/icons/drag.svg";
import "./styles/style.css";

const Body = () => {
  return (
    <div className="console-screen__body body">
      <TextArea
        className="body__textarea body__textarea--input"
        label="Запрос:"
        value="{
“action”:“track.get”,
“id”:”12345”
}"
      />
      <DragIcon className="body__drag" />
      <TextArea
        className="body__textarea body__textarea--output"
        label="Ответ:"
        value="{
“action”:“track.get”,
“id”:”12345”
}"
        readOnly
      />
    </div>
  );
};

export default Body;
