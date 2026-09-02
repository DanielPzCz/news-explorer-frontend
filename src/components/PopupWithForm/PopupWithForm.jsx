import { useEffect } from "react";
import "./PopupWithForm.css";

export default function PopupWithForm(props) {
  const { name, title, buttonText, isValid, onClose, onSubmit, children, footer } =
    props;

  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="popup" onMouseDown={handleOverlayClick}>
      <div className="popup__container">
        <button
          aria-label="Cerrar ventana emergente"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        {onSubmit ? (
          <form
            className="popup__form"
            id={`${name}-form`}
            name={name}
            noValidate
            onSubmit={onSubmit}
          >
            {children}
            <button
              className="popup__submit"
              type="submit"
              disabled={isValid === false}
            >
              {buttonText}
            </button>
          </form>
        ) : (
          children
        )}
        {footer && <p className="popup__footer">{footer}</p>}
      </div>
    </div>
  );
}
