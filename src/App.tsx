import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Console from "./components/screens/Console";
import Login from "./components/screens/Login";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { checkAuth } from "./store/actions/auth";
import "./styles/style.css";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useTypedSelector((root) => root.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    if (authState.loading || authState.loggedIn === undefined) return;

    if (authState.loggedIn) navigate("/console");
    else navigate("/login");
  }, [authState.loggedIn]);

  return (
    <div id="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/console" element={<Console />} />
      </Routes>
    </div>
  );
}

export default App;
