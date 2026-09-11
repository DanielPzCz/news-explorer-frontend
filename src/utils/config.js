export const NEWS_API_KEY = "4888d9bb836248908888190891752e83";

export const NEWS_API_BASE_URL = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2"
  : "https://newsapi.org/v2";

export const NEWS_API_PAGE_SIZE = 100;
export const NEWS_API_DAYS_BACK = 7;
