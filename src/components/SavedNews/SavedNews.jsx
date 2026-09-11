import "./SavedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

export default function SavedNews(props) {
  const { userName, savedArticles, onDelete } = props;

  return (
    <main className="saved-news">
      <SavedNewsHeader userName={userName} articles={savedArticles} />
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
