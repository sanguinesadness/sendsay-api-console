import BurgerMenu from "components/ui/BurgerMenu";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { updateWindowSize } from "store/actions/window";
import Console from "./components/screens/Console";
import Login from "./components/screens/Login";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { checkAuth, logout } from "./store/actions/auth";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import { closeBurgerMenu } from "store/actions/burger-menu";
import { BurgerMenuOption } from "types/burger-menu";
import { v4 } from "uuid";
import "./styles/style.css";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useTypedSelector((root) => root.auth);
  const windowState = useTypedSelector((root) => root.window);

  const less550px = windowState.width < 550;

  const closeMenu = () => dispatch(closeBurgerMenu());

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    closeMenu();
  };

  const burgerMenuOptions: BurgerMenuOption[] = [
    {
      id: v4(),
      icon: LogoutIcon,
      text: "Выйти",
      onClick: handleLogout,
    },
  ];

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

  return (
    <div id="app">
      {less550px && <BurgerMenu options={burgerMenuOptions} />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/console" element={<Console />} />
      </Routes>
    </div>
  );
}

export default App;
