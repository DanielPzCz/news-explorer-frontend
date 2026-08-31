import { NavLink } from "react-router";
import "./Navigation.css";
import logoutWhite from "../../images/logout-white.svg";
import logoutBlack from "../../images/logout-black.svg";

export default function Navigation(props) {
  const {
    loggedIn,
    userName,
    isDarkTheme,
    isMenuOpen,
    onLoginClick,
    onSignOut,
    onCloseMenu,
  } = props;

  const logoutIcon = isDarkTheme ? logoutWhite : logoutBlack;

  function getLinkClass({ isActive }) {
    return `navigation__link${isActive ? " navigation__link_active" : ""}`;
  }

  function handleLoginClick() {
    onCloseMenu();
    onLoginClick();
  }

  function handleSignOutClick() {
    onCloseMenu();
    onSignOut();
  }

  return (
    <nav
      className={`navigation${isMenuOpen ? " navigation_opened" : ""}`}
      aria-label="Navegación principal"
    >
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink className={getLinkClass} to="/" end onClick={onCloseMenu}>
            Inicio
          </NavLink>
        </li>
        {loggedIn && (
          <li className="navigation__item">
            <NavLink
              className={getLinkClass}
              to="/saved-news"
              onClick={onCloseMenu}
            >
              Artículos guardados
            </NavLink>
          </li>
        )}
        <li className="navigation__item">
          {loggedIn ? (
            <button
              className="navigation__button"
              type="button"
              onClick={handleSignOutClick}
            >
              <span className="navigation__user">{userName}</span>
              <img
                alt="Cerrar sesión"
                className="navigation__logout-icon"
                src={logoutIcon}
              />
            </button>
          ) : (
            <button
              className="navigation__button"
              type="button"
              onClick={handleLoginClick}
            >
              Inicia sesión
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
