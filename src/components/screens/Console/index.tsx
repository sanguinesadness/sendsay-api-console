import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { logout } from "../../../store/actions/auth";
import Button from "../../ui/Button";

const Console = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useTypedSelector((root) => root.auth);

  const goToLogin = () => navigate("/login");

  const doLogout = async () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!authState.loggedIn) {
    return (
      <div>
        <span>Не авторизован</span>
        <Button text="Войти" type="default" onClick={goToLogin} />
      </div>
    );
  }

  return (
    <div>
      <div>{authState.data?.login}</div>
      <div>{authState.data?.sublogin}</div>
      <div>{authState.data?.password}</div>
      <Button text="Выйти" onClick={doLogout} />
    </div>
  );
};

export default Console;
