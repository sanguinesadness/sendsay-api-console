import React, { useContext, useEffect, useRef, useState } from "react";
import { ReactComponent as DragIcon } from "assets/icons/drag.svg";
import OutputArea from "./OutputArea";
import InputArea from "./InputArea";
import { WindowStateContext } from "stores/window";
import { observer } from "mobx-react-lite";
import "./styles/style.css";

const Body = () => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const windowState = useContext(WindowStateContext);

  const less950px = windowState.width < 950;
  const less550px = windowState.width < 550;
  const minAreaWidth = less950px ? 200 : 400;

  const [inputAreaWidth, setInputAreaWidth] = useState<number>(0);
  const [outputAreaWidth, setOutputAreaWidth] = useState<number>(0);
  const [mouseCaptured, setMouseCaptured] = useState<boolean>(false);

  const onMouseCaptureLost = () => setMouseCaptured(false);
  const onMouseCaptureGet = () => setMouseCaptured(true);

  useEffect(() => {
    if (less550px) return;

    const width = bodyRef.current?.clientWidth;
    if (!width) return;

    setInputAreaWidth(width / 2);
    setOutputAreaWidth(width / 2);
  }, [bodyRef.current?.clientWidth, windowState.width]);

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
      <InputArea width={inputAreaWidth} minWidth={minAreaWidth} />
      {!less950px && (
        <DragIcon className="body__drag" onMouseDown={onMouseCaptureGet} />
      )}
      <OutputArea width={outputAreaWidth} minWidth={minAreaWidth} />
    </div>
  );
};

export default observer(Body);
