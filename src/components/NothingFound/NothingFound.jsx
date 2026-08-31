import "./NothingFound.css";
import notFoundIcon from "../../images/not-found.svg";

export default function NothingFound() {
  return (
    <div className="nothing-found">
      <img alt="Lupa" className="nothing-found__icon" src={notFoundIcon} />
      <h3 className="nothing-found__title">No se ha encontrado nada</h3>
      <p className="nothing-found__text">
        Lo sentimos, pero no hay nada que coincida con estos términos de
        búsqueda.
      </p>
    </div>
  );
}
