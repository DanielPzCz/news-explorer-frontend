import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

export default function NewsCardList(props) {
  const {
    articles,
    loggedIn,
    isSavedPage,
    savedArticles,
    onSave,
    onDelete,
    onShowMore,
    hasMore,
  } = props;

  function isArticleSaved(article) {
    return (
      loggedIn &&
      savedArticles.some((savedArticle) => savedArticle.link === article.link)
    );
  }

  return (
    <div className="cards">
      <ul className="cards__list">
        {articles.map((article) => (
          <NewsCard
            key={article._id || article.link}
            article={article}
            loggedIn={loggedIn}
            isSaved={isArticleSaved(article)}
            isSavedPage={isSavedPage}
            onSave={onSave}
            onDelete={onDelete}
          />
        ))}
      </ul>
      {!isSavedPage && hasMore && (
        <button className="cards__more" type="button" onClick={onShowMore}>
          Mostrar más
        </button>
      )}
    </div>
  );
}
