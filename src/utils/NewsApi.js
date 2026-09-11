import {
  NEWS_API_KEY,
  NEWS_API_BASE_URL,
  NEWS_API_PAGE_SIZE,
  NEWS_API_DAYS_BACK,
} from "./config.js";

function getFormattedDate(daysAgo = 0) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().slice(0, 10);
}

class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error ${response.status}`);
  }

  getNews(keyword) {
    const params = new URLSearchParams({
      q: keyword,
      apiKey: this._apiKey,
      from: getFormattedDate(NEWS_API_DAYS_BACK),
      to: getFormattedDate(),
      pageSize: NEWS_API_PAGE_SIZE,
    });

    return fetch(`${this._baseUrl}/everything?${params}`).then(
      this._checkResponse,
    );
  }
}

const newsApi = new NewsApi({
  baseUrl: NEWS_API_BASE_URL,
  apiKey: NEWS_API_KEY,
});

export default newsApi;
