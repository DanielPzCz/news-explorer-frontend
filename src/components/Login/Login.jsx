import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import useFormValidation from "../../hooks/useFormValidation.js";

export default function Login(props) {
  const { onLogin, onClose, onSwitchToRegister, serverError } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, isValid, handleInput } = useFormValidation();

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(email, password);
  }

  return (
    <PopupWithForm
      name="login"
      title="Inicia sesión"
      buttonText="Inicia sesión"
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
      onInput={handleInput}
      serverError={serverError}
      footer={
        <>
          o{" "}
          <button
            className="popup__footer-link"
            type="button"
            onClick={onSwitchToRegister}
          >
            Regístrate
          </button>
        </>
      }
    >
      <label className="popup__label" htmlFor="login-email">
        Correo electrónico
      </label>
      <input
        className="popup__input"
        id="login-email"
        name="email"
        type="email"
        placeholder="Introduce tu correo electrónico"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <span
        className={`popup__error${errors.email ? " popup__error_active" : ""}`}
      >
        {errors.email}
      </span>
      <label className="popup__label" htmlFor="login-password">
        Contraseña
      </label>
      <input
        className="popup__input"
        id="login-password"
        name="password"
        type="password"
        placeholder="Introduce tu contraseña"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <span
        className={`popup__error${
          errors.password ? " popup__error_active" : ""
        }`}
      >
        {errors.password}
      </span>
    </PopupWithForm>
  );
}
