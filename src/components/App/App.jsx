import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import "./App.css";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";

import newsApi from "../../utils/NewsApi.js";
import {
  MOCK_SAVED_ARTICLES,
  CARDS_PER_PAGE,
  SEARCH_ERROR_MESSAGE,
} from "../../utils/constants.js";

function getStoredArticles() {
  try {
    return JSON.parse(localStorage.getItem("articles")) || [];
  } catch {
    return [];
  }
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [activePopup, setActivePopup] = useState(null);

  const [articles, setArticles] = useState(getStoredArticles);
  const [hasSearched, setHasSearched] = useState(articles.length > 0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
  const [savedArticles, setSavedArticles] = useState(MOCK_SAVED_ARTICLES);

  const navigate = useNavigate();

  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem("articles", JSON.stringify(articles));
    }
  }, [articles]);

  function handleOpenLogin() {
    setActivePopup("login");
  }

  function handleOpenRegister() {
    setActivePopup("register");
  }

  function handleClosePopup() {
    setActivePopup(null);
  }

  function handleSearch(keyword) {
    setIsSearching(true);
    setHasSearched(true);
    setSearchError("");
    setVisibleCount(CARDS_PER_PAGE);

    newsApi
      .getNews(keyword)
      .then((data) => {
        const formattedArticles = (data.articles || []).map(
          (article, index) => ({
            _id: `${keyword}-${index}`,
            keyword: keyword,
            title: article.title || "",
            text: article.description || "",
            date: article.publishedAt || "",
            source: article.source ? article.source.name : "",
            link: article.url,
            image: article.urlToImage || "",
          }),
        );

        setArticles(formattedArticles);
        localStorage.setItem("keyword", keyword);

        if (formattedArticles.length === 0) {
          localStorage.removeItem("articles");
        }
      })
      .catch((error) => {
        console.error("Error al buscar noticias:", error);
        setArticles([]);
        setSearchError(SEARCH_ERROR_MESSAGE);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }

  function handleShowMore() {
    setVisibleCount(visibleCount + CARDS_PER_PAGE);
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    setLoggedIn(true);
    setUserName("Daniel");
    handleClosePopup();
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();
    handleClosePopup();
  }

  function handleSignOut() {
    setLoggedIn(false);
    setUserName("");
    navigate("/");
  }

  function handleSaveArticle(article) {
    const isSaved = savedArticles.some(
      (savedArticle) => savedArticle.link === article.link,
    );

    if (isSaved) {
      setSavedArticles(
        savedArticles.filter(
          (savedArticle) => savedArticle.link !== article.link,
        ),
      );
    } else {
      setSavedArticles([article, ...savedArticles]);
    }
  }

  function handleDeleteArticle(article) {
    setSavedArticles(
      savedArticles.filter((savedArticle) => savedArticle._id !== article._id),
    );
  }

  return (
    <div className="page">
      <Header
        loggedIn={loggedIn}
        userName={userName}
        onLoginClick={handleOpenLogin}
        onSignOut={handleSignOut}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              onSearch={handleSearch}
              isSearching={isSearching}
              searchError={searchError}
              hasSearched={hasSearched}
              articles={articles}
              visibleCount={visibleCount}
              onShowMore={handleShowMore}
              loggedIn={loggedIn}
              savedArticles={savedArticles}
              onSave={handleSaveArticle}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNews
              userName={userName || "Daniel"}
              savedArticles={savedArticles}
              onDelete={handleDeleteArticle}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />

      {activePopup === "login" && (
        <PopupWithForm
          name="login"
          title="Inicia sesión"
          buttonText="Inicia sesión"
          onClose={handleClosePopup}
          onSubmit={handleLoginSubmit}
          footer={
            <>
              o{" "}
              <button
                className="popup__footer-link"
                type="button"
                onClick={handleOpenRegister}
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
          />
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
          />
        </PopupWithForm>
      )}

      {activePopup === "register" && (
        <PopupWithForm
          name="register"
          title="Regístrate"
          buttonText="Regístrate"
          onClose={handleClosePopup}
          onSubmit={handleRegisterSubmit}
          footer={
            <>
              o{" "}
              <button
                className="popup__footer-link"
                type="button"
                onClick={handleOpenLogin}
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
          />
          <label className="popup__label" htmlFor="register-password">
            Contraseña
          </label>
          <input
            className="popup__input"
            id="register-password"
            name="password"
            type="password"
            placeholder="Introduce una contraseña"
            required
          />
          <label className="popup__label" htmlFor="register-name">
            Nombre de usuario
          </label>
          <input
            className="popup__input"
            id="register-name"
            name="name"
            type="text"
            placeholder="Introduce tu nombre de usuario"
            required
          />
        </PopupWithForm>
      )}
    </div>
  );
}

export default App;
