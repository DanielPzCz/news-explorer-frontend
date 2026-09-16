import "./SavedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

export default function SavedNews(props) {
  const { savedArticles, onDelete } = props;

  return (
    <main className="saved-news">
      <SavedNewsHeader articles={savedArticles} />
      <section className="saved-news__cards">
        <NewsCardList
          articles={savedArticles}
          savedArticles={savedArticles}
          isSavedPage={true}
          loggedIn={true}
          onDelete={onDelete}
        />
      </section>
    </main>
  );
}
