import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { updateWindowSize } from "store/actions/window";
import Console from "./components/screens/Console";
import Login from "./components/screens/Login";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { checkAuth } from "./store/actions/auth";
import { ReactComponent as LoadingIcon } from "assets/icons/loading.svg";
import "./styles/style.css";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useTypedSelector((root) => root.auth);

  useEffect(() => {
    dispatch(checkAuth());

    const handleResize = () => dispatch(updateWindowSize());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (authState.loading || authState.loggedIn === undefined) return;

    if (authState.loggedIn) navigate("/console");
    else navigate("/login");
  }, [authState.loggedIn]);

  if (authState.loading) {
    return (
      <div className="page-loading">
        <LoadingIcon className="page-loading__icon" />
      </div>
    );
  }

  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/console" element={<Console />} />
      </Routes>
    </div>
  );
}

export default App;
