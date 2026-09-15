import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import "./App.css";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import newsApi from "../../utils/NewsApi.js";
import mainApi from "../../utils/MainApi.js";
import {
  CARDS_PER_PAGE,
  SEARCH_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGES,
} from "../../utils/constants.js";

function getStoredArticles() {
  try {
    return JSON.parse(localStorage.getItem("articles")) || [];
  } catch {
    return [];
  }
}

function getStoredVisibleCount() {
  const stored = Number(localStorage.getItem("visibleCount"));
  return Number.isInteger(stored) && stored >= CARDS_PER_PAGE
    ? stored
    : CARDS_PER_PAGE;
}

function getStoredKeyword() {
  return localStorage.getItem("keyword") || "";
}

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(
    () => !localStorage.getItem("jwt"),
  );
  const [activePopup, setActivePopup] = useState(null);
  const [authError, setAuthError] = useState("");

  const [articles, setArticles] = useState(getStoredArticles);
  const [hasSearched, setHasSearched] = useState(articles.length > 0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [visibleCount, setVisibleCount] = useState(getStoredVisibleCount);
  const [savedArticles, setSavedArticles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    mainApi
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error al validar el token:", error);
        localStorage.removeItem("jwt");
      })
      .finally(() => {
        setIsTokenChecked(true);
      });
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    mainApi
      .getSavedArticles()
      .then((articlesData) => {
        setSavedArticles(articlesData);
      })
      .catch((error) => {
        console.error("Error al obtener los artículos guardados:", error);
      });
  }, [loggedIn]);

  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem("articles", JSON.stringify(articles));
    }
  }, [articles]);

  useEffect(() => {
    localStorage.setItem("visibleCount", String(visibleCount));
  }, [visibleCount]);

  function handleOpenLogin() {
    setAuthError("");
    setActivePopup("login");
  }

  function handleOpenRegister() {
    setAuthError("");
    setActivePopup("register");
  }

  function handleClosePopup() {
    setActivePopup(null);
    setAuthError("");
  }

  const handleUnauthorized = useCallback(() => {
    setActivePopup("login");
  }, []);

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
          localStorage.removeItem("visibleCount");
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

  function handleRegister(email, password, name) {
    setAuthError("");

    mainApi
      .register(email, password, name)
      .then(() => {
        setActivePopup("success");
      })
      .catch((error) => {
        console.error("Error al registrar al usuario:", error);
        setAuthError(
          error.status === 409
            ? AUTH_ERROR_MESSAGES.emailTaken
            : AUTH_ERROR_MESSAGES.server,
        );
      });
  }

  function handleLogin(email, password) {
    setAuthError("");

    mainApi
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return mainApi.getUserInfo();
      })
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        setAuthError(
          error.status === 401
            ? AUTH_ERROR_MESSAGES.wrongCredentials
            : AUTH_ERROR_MESSAGES.server,
        );
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({});
    setSavedArticles([]);
    navigate("/");
  }

  function handleSaveArticle(article) {
    const savedArticle = savedArticles.find(
      (item) => item.link === article.link,
    );

    if (savedArticle) {
      mainApi
        .deleteArticle(savedArticle._id)
        .then(() => {
          setSavedArticles((state) =>
            state.filter((item) => item._id !== savedArticle._id),
          );
        })
        .catch((error) => {
          console.error("Error al quitar el artículo de guardados:", error);
        });
      return;
    }

    mainApi
      .saveArticle(article)
      .then((newArticle) => {
        setSavedArticles((state) => [newArticle, ...state]);
      })
      .catch((error) => {
        console.error("Error al guardar el artículo:", error);
      });
  }

  function handleDeleteArticle(article) {
    mainApi
      .deleteArticle(article._id)
      .then(() => {
        setSavedArticles((state) =>
          state.filter((item) => item._id !== article._id),
        );
      })
      .catch((error) => {
        console.error("Error al eliminar el artículo:", error);
      });
  }

  if (!isTokenChecked) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          userName={currentUser.name}
          onLoginClick={handleOpenLogin}
          onSignOut={handleSignOut}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                onSearch={handleSearch}
                initialKeyword={getStoredKeyword()}
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
              <ProtectedRoute
                loggedIn={loggedIn}
                onUnauthorized={handleUnauthorized}
              >
                <SavedNews
                  userName={currentUser.name}
                  savedArticles={savedArticles}
                  onDelete={handleDeleteArticle}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />

        {activePopup === "login" && (
          <Login
            onLogin={handleLogin}
            onClose={handleClosePopup}
            onSwitchToRegister={handleOpenRegister}
            serverError={authError}
          />
        )}

        {activePopup === "register" && (
          <Register
            onRegister={handleRegister}
            onClose={handleClosePopup}
            onSwitchToLogin={handleOpenLogin}
            serverError={authError}
          />
        )}

        {activePopup === "success" && (
          <InfoTooltip
            onClose={handleClosePopup}
            onSwitchToLogin={handleOpenLogin}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
