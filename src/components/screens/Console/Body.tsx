import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as DragIcon } from "assets/icons/drag.svg";
import "./styles/style.css";
import InputArea from "./InputArea";
import OutputArea from "./OutputArea";

const Body = () => {
  const bodyRef = useRef<HTMLDivElement>(null);

  const [inputAreaWidth, setInputAreaWidth] = useState<number>(0);
  const [outputAreaWidth, setOutputAreaWidth] = useState<number>(0);
  const [mouseCaptured, setMouseCaptured] = useState<boolean>(false);

  const onMouseCaptureLost = () => setMouseCaptured(false);
  const onMouseCaptureGet = () => setMouseCaptured(true);

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
      <InputArea width={inputAreaWidth} />
      <DragIcon className="body__drag" onMouseDown={onMouseCaptureGet} />
      <OutputArea width={outputAreaWidth} />
    </div>
  );
};

export default Body;
