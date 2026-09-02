import "./Main.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";
import About from "../About/About.jsx";

export default function Main(props) {
  const {
    onSearch,
    initialKeyword,
    isSearching,
    searchError,
    hasSearched,
    articles,
    visibleCount,
    onShowMore,
    loggedIn,
    savedArticles,
    onSave,
  } = props;

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;
  const showResults = hasSearched || isSearching;

  return (
    <main className="main">
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">¿Qué está pasando en el mundo?</h1>
          <p className="hero__subtitle">
            Encuentra las últimas noticias sobre cualquier tema y guárdalas en
            tu cuenta personal.
          </p>
          <SearchForm onSearch={onSearch} initialKeyword={initialKeyword} />
        </div>
      </section>
      {showResults && (
        <section className="results" aria-live="polite">
          {isSearching && <Preloader />}
          {!isSearching && searchError && (
            <p className="results__error">{searchError}</p>
          )}
          {!isSearching && !searchError && articles.length === 0 && (
            <NothingFound />
          )}
          {!isSearching && !searchError && articles.length > 0 && (
            <>
              <h2 className="results__title">Resultados de la búsqueda</h2>
              <NewsCardList
                articles={visibleArticles}
                loggedIn={loggedIn}
                savedArticles={savedArticles}
                isSavedPage={false}
                onSave={onSave}
                onShowMore={onShowMore}
                hasMore={hasMore}
              />
            </>
          )}
        </section>
      )}
      <About />
    </main>
  );
}
