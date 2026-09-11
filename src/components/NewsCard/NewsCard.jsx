import "./NewsCard.css";
import formatDate from "../../utils/formatDate.js";
import placeholderImage from "../../images/placeholder.svg";

export default function NewsCard(props) {
  const { article, loggedIn, isSaved, isSavedPage, onSave, onDelete } = props;

  function handleSaveClick() {
    if (!loggedIn) {
      return;
    }
    onSave(article);
  }

  function handleDeleteClick() {
    onDelete(article);
  }

  return (
    <li className="news-card">
      <div className="news-card__image-container">
        <img
          alt={article.title}
          className="news-card__image"
          src={article.image || placeholderImage}
          onError={(event) => {
            event.target.src = placeholderImage;
          }}
        />
        {isSavedPage ? (
          <>
            <span className="news-card__keyword">{article.keyword}</span>
            <div className="news-card__control">
              <span className="news-card__tooltip">Eliminar de guardados</span>
              <button
                aria-label="Eliminar de guardados"
                className="news-card__button news-card__button_type_delete"
                type="button"
                onClick={handleDeleteClick}
              ></button>
            </div>
          </>
        ) : (
          <div className="news-card__control">
            {!loggedIn && (
              <span className="news-card__tooltip">
                Inicia sesión para guardar artículos
              </span>
            )}
            <button
              aria-label={
                isSaved ? "Quitar de guardados" : "Guardar artículo"
              }
              className={`news-card__button news-card__button_type_save${
                isSaved ? " news-card__button_active" : ""
              }`}
              type="button"
              onClick={handleSaveClick}
            ></button>
          </div>
        )}
      </div>
      <div className="news-card__content">
        <p className="news-card__date">{formatDate(article.date)}</p>
        <a
          className="news-card__link"
          href={article.link}
          target="_blank"
          rel="noreferrer"
        >
          <h3 className="news-card__title">{article.title}</h3>
        </a>
        <p className="news-card__text">{article.text}</p>
        <p className="news-card__source">{article.source}</p>
      </div>
    </li>
  );
}
