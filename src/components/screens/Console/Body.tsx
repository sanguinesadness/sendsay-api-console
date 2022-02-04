import React, { useEffect, useRef, useState } from "react";
import TextArea from "components/ui/TextArea";
import { ReactComponent as DragIcon } from "assets/icons/drag.svg";
import "./styles/style.css";

const Body = () => {
  const bodyRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState<string>("");
  const [inputAreaWidth, setInputAreaWidth] = useState<number>(0);
  const [outputAreaWidth, setOutputAreaWidth] = useState<number>(0);
  const [mouseCaptured, setMouseCaptured] = useState<boolean>(false);

  const onMouseCaptureLost = () => setMouseCaptured(false);
  const onMouseCaptureGet = () => setMouseCaptured(true);

  const onQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const width = bodyRef.current?.clientWidth;
    if (!width) return;

    setInputAreaWidth(width / 2);
    setOutputAreaWidth(width / 2);
  }, [bodyRef.current?.clientWidth]);

  const onBodyMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mouseCaptured) {
      setInputAreaWidth((prev) => prev + event.movementX);
      setOutputAreaWidth((prev) => prev - event.movementX);
    }
  };

  return (
    <div
      ref={bodyRef}
      className="console-screen__body body"
      onMouseUp={onMouseCaptureLost}
      onMouseLeave={onMouseCaptureLost}
      onMouseMove={onBodyMouseMove}>
      <TextArea
        className="body__textarea body__textarea--input"
        label="Запрос:"
        value={query}
        onChange={onQueryChange}
        width={inputAreaWidth}
        minWidth={100}
      />
      <DragIcon className="body__drag" onMouseDown={onMouseCaptureGet} />
      <TextArea
        className="body__textarea body__textarea--output"
        label="Ответ:"
        value=""
        width={outputAreaWidth}
        readOnly
        minWidth={100}
      />
    </div>
  );
};

export default Body;
