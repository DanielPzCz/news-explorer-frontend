import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import useFormValidation from "../../hooks/useFormValidation.js";

export default function Register(props) {
  const { onRegister, onClose, onSwitchToLogin, serverError } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { errors, isValid, handleInput } = useFormValidation();

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(email, password, name);
  }

  return (
    <PopupWithForm
      name="register"
      title="Regístrate"
      buttonText="Regístrate"
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
            onClick={onSwitchToLogin}
          >
            Inicia sesión
          </button>
        </>
      }
    >
      <label className="popup__label" htmlFor="register-email">
        Correo electrónico
      </label>
      <input
        className="popup__input"
        id="register-email"
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
      <label className="popup__label" htmlFor="register-password">
        Contraseña
      </label>
      <input
        className="popup__input"
        id="register-password"
        name="password"
        type="password"
        placeholder="Introduce una contraseña"
        minLength={8}
        pattern=".{8,}"
        data-error-message="La contraseña debe tener al menos 8 caracteres"
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
      <label className="popup__label" htmlFor="register-name">
        Nombre de usuario
      </label>
      <input
        className="popup__input"
        id="register-name"
        name="name"
        type="text"
        placeholder="Introduce tu nombre de usuario"
        minLength={2}
        maxLength={30}
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <span
        className={`popup__error${errors.name ? " popup__error_active" : ""}`}
      >
        {errors.name}
      </span>
    </PopupWithForm>
  );
}
