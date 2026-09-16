import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";

export default function InfoTooltip(props) {
  const { onClose, onSwitchToLogin } = props;

  return (
    <PopupWithForm
      name="success"
      title="¡El registro se ha completado con éxito!"
      onClose={onClose}
      footer={
        <button
          className="popup__footer-link"
          type="button"
          onClick={onSwitchToLogin}
        >
          Iniciar sesión
        </button>
      }
    />
  );
}
