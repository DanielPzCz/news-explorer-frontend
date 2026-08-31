import "./SavedNewsHeader.css";

// Devuelve las palabras clave ordenadas de mayor a menor popularidad.
function getSortedKeywords(articles) {
  const counter = {};

  articles.forEach((article) => {
    const keyword = article.keyword;
    counter[keyword] = (counter[keyword] || 0) + 1;
  });

  return Object.keys(counter).sort((a, b) => counter[b] - counter[a]);
}

function formatKeywords(keywords) {
  if (keywords.length === 0) {
    return "";
  }

  if (keywords.length <= 3) {
    return keywords.join(", ");
  }

  return `${keywords[0]}, ${keywords[1]}, y ${keywords.length - 2} más`;
}

export default function SavedNewsHeader(props) {
  const { userName, articles } = props;

  const keywords = getSortedKeywords(articles);

  return (
    <section className="saved-header">
      <p className="saved-header__caption">Artículos guardados</p>
      <h1 className="saved-header__title">
        {userName}, tienes {articles.length}{" "}
        {articles.length === 1 ? "artículo guardado" : "artículos guardados"}
      </h1>
      {keywords.length > 0 && (
        <p className="saved-header__keywords">
          Por palabras clave:{" "}
          <span className="saved-header__keywords-list">
            {formatKeywords(keywords)}
          </span>
        </p>
      )}
    </section>
  );
}
