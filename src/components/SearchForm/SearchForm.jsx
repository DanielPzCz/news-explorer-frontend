import { useState } from "react";
import "./SearchForm.css";

export default function SearchForm(props) {
  const { onSearch, initialKeyword } = props;

  const [keyword, setKeyword] = useState(initialKeyword || "");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    setKeyword(event.target.value);
    setErrorMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!keyword.trim()) {
      setErrorMessage("Por favor, introduce una palabra clave");
      return;
    }

    onSearch(keyword.trim());
  }

  return (
    <form className="search-form" noValidate onSubmit={handleSubmit}>
      <div className="search-form__field">
        <input
          className="search-form__input"
          type="text"
          name="keyword"
          placeholder="Introduce un tema"
          value={keyword}
          onChange={handleChange}
        />
        <button className="search-form__button" type="submit">
          Buscar
        </button>
      </div>
      <span
        className={`search-form__error${
          errorMessage ? " search-form__error_active" : ""
        }`}
      >
        {errorMessage}
      </span>
    </form>
  );
}
