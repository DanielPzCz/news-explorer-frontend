import { useState } from "react";
import { Link, useLocation } from "react-router";
import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";
import menuWhite from "../../images/menu-white.svg";
import menuBlack from "../../images/menu-black.svg";
import closeWhite from "../../images/close-white.svg";

export default function Header(props) {
  const { loggedIn, userName, onLoginClick, onSignOut } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isDarkTheme = location.pathname === "/";
  const menuIcon = isDarkTheme ? menuWhite : menuBlack;

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header
      className={`header${isDarkTheme ? " header_theme_dark" : ""}${
        isMenuOpen ? " header_menu_opened" : ""
      }`}
    >
      <div className="header__container">
        <Link className="header__logo" to="/" onClick={handleCloseMenu}>
          NewsExplorer
        </Link>
        <button
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="header__menu-button"
          type="button"
          onClick={handleMenuToggle}
        >
          <img
            alt=""
            className="header__menu-icon"
            src={isMenuOpen ? closeWhite : menuIcon}
          />
        </button>
        <Navigation
          loggedIn={loggedIn}
          userName={userName}
          isDarkTheme={isDarkTheme}
          isMenuOpen={isMenuOpen}
          onLoginClick={onLoginClick}
          onSignOut={onSignOut}
          onCloseMenu={handleCloseMenu}
        />
      </div>
      {isMenuOpen && (
        <div className="header__overlay" onClick={handleCloseMenu}></div>
      )}
    </header>
  );
}
