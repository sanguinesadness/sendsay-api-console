import BurgerMenu from "components/ui/BurgerMenu";
import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Console from "./components/screens/Console";
import Login from "./components/screens/Login";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import { BurgerMenuOption } from "types/burger-menu";
import { AuthStateContext } from "stores/auth/index";
import { observer } from "mobx-react-lite";
import { WindowStateContext } from "stores/window";
import { BurgerMenuStateContext } from "stores/burger-menu";
import { v4 } from "uuid";
import "./styles/style.css";

function App() {
  const navigate = useNavigate();

  const authState = useContext(AuthStateContext);
  const windowState = useContext(WindowStateContext);
  const burgerMenuState = useContext(BurgerMenuStateContext);

  const less550px = windowState.width < 550;

  const closeMenu = () => burgerMenuState.close();

  const handleLogout = () => {
    authState.logout();
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
    authState.checkAuth();

    const handleResize = () => windowState.updateSizes();
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

export default observer(App);
