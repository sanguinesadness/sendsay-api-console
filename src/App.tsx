import { BrowserRouter, Route, Routes } from "react-router-dom";
import Button from "./components/ui/Button";
import "./styles/style.css";
import { ReactComponent as AlignIcon } from "./assets/icons/align.svg";
import Input from "./components/ui/Input";
import { useState } from "react";

function App() {
  const [value, setValue] = useState<string>("");

  return (
    <BrowserRouter>
      <div id="app" style={{ margin: "20px" }}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="Логин"
          extraLabel="Опционально"
        />
        <br />
        <Button text="Форматировать" icon={AlignIcon} type="no-bg" />
        <Routes>
          <Route path="/login" />
          <Route path="/console" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
