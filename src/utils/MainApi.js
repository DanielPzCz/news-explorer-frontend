import { MAIN_API_BASE_URL } from "./config.js";

class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getHeaders() {
    const token = localStorage.getItem("jwt") ?? "";

    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error ${response.status}`);
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    }).then(this._checkResponse);
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getSavedArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  saveArticle(article) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      }),
    }).then(this._checkResponse);
  }

  deleteArticle(articleId) {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi({ baseUrl: MAIN_API_BASE_URL });

export default mainApi;
