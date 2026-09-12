import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import "./App.css";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";

import newsApi from "../../utils/NewsApi.js";
import mainApi from "../../utils/MainApi.js";
import {
  MOCK_SAVED_ARTICLES,
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [activePopup, setActivePopup] = useState(null);
  const [authError, setAuthError] = useState("");

  const [articles, setArticles] = useState(getStoredArticles);
  const [hasSearched, setHasSearched] = useState(articles.length > 0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [visibleCount, setVisibleCount] = useState(getStoredVisibleCount);
  const [savedArticles, setSavedArticles] = useState(MOCK_SAVED_ARTICLES);

  const navigate = useNavigate();

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
        setAuthError(AUTH_ERROR_MESSAGES.register);
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
        setUserName(userData.name);
        setLoggedIn(true);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        setAuthError(AUTH_ERROR_MESSAGES.login);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
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
  );
}

export default App;
