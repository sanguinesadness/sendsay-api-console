import React, { useState } from "react";
import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";
import { GITHUB_LINK, GITHUB_NAME } from "constants/github";
import Button from "components/ui/Button";
import Input from "components/ui/Input";
import "./styles/style.css";
import { useDispatch } from "react-redux";
import { login as loginAction } from "store/actions/auth";
import { useTypedSelector } from "hooks/useTypedSelector";
import ErrorLabel from "components/ui/ErrorLabel";

interface InputState {
  value: string;
  error?: boolean;
}

const initialState = { value: "", error: false };

const Login = () => {
  const [login, setLogin] = useState<InputState>(initialState);
  const [sublogin, setSublogin] = useState<InputState>(initialState);
  const [password, setPassword] = useState<InputState>(initialState);

  const dispatch = useDispatch();
  const { loading, error } = useTypedSelector((root) => root.auth);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;

    switch (name) {
      case "login":
        setLogin({ value, error: !value.length });
        break;
      case "sublogin":
        setSublogin({ value });
        break;
      case "password":
        setPassword({ value, error: !value.length });
        break;
    }
  };

  const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") doLogin();
  };

  const allFieldsValid = !!login.value.length && !!password.value.length;

  const doLogin = async () => {
    if (!allFieldsValid) return;

    dispatch(
      loginAction({
        login: login.value,
        sublogin: sublogin.value,
        password: password.value,
      }),
    );
  };

  return (
    <div className="login-screen">
      <div className="login-screen__content content">
        <div className="content__header header">
          <LogoIcon className="header__logo" />
        </div>
        <div className="content__form form">
          <div className="form__title title">
            <h3 className="title__inner">API-консолька</h3>
          </div>
          {error && (
            <ErrorLabel
              title="Вход не вышел"
              message={`{id: "${error.id}", explain: "${error.explain}"}`}
            />
          )}
          <div className="form__fields fields">
            <Input
              className="fields__field"
              name="login"
              label="Логин"
              value={login.value}
              type="text"
              onChange={onInputChange}
              onKeyPress={onEnterPress}
              error={login.error}
            />
            <Input
              className="fields__field"
              name="sublogin"
              label="Сублогин"
              extraLabel="Опционально"
              value={sublogin.value}
              type="text"
              onChange={onInputChange}
              onKeyPress={onEnterPress}
            />
            <Input
              className="fields__field"
              name="password"
              label="Пароль"
              value={password.value}
              type="password"
              onChange={onInputChange}
              onKeyPress={onEnterPress}
              error={password.error}
            />
          </div>
          <div className="form_buttons buttons">
            <Button
              className="buttons__button"
              text="Войти"
              type="default"
              onClick={doLogin}
              loading={loading}
              disabled={!allFieldsValid}
            />
          </div>
        </div>
        <div className="content__footer footer">
          <a
            className="footer__link"
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer">
            @{GITHUB_NAME}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
