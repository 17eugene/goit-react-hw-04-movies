import { useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router";

import * as fetchAPI from "../../services/fetchApi";
import { MoviesList } from "../../components/MoviesList/MoviesList";

import styles from "./SearchPageView.module.css";
import { useEffect } from "react/cjs/react.development";

function SearchPageView() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (!searchQuery) return;

    fetchAPI
      .searchMovieByKeyWord(searchQuery)
      .then((data) => setMovies(data.results))
      .catch((error) => console.log(error));
  }, [searchQuery]);

  const inputValueChange = (e) => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      alert("Incorrect query");
      return;
    }

    fetchAPI
      .searchMovieByKeyWord(query)
      .then((data) => setMovies(data.results))
      .catch((error) => console.log(error));

    history.push({
      ...location,
      search: `query=${query}`,
    });

    setQuery("");
  };

  return (
    <div>
      <form onSubmit={onFormSubmit} className={styles.form}>
        <input
          className={styles.inputArea}
          type="text"
          placeholder="Search for..."
          autoComplete="off"
          autoFocus
          onChange={inputValueChange}
          value={query}
        ></input>
        <button className={styles.searchBtn} type="submit">
          Search
        </button>
      </form>
      <MoviesList movies={movies} path={url + "/"} />
    </div>
  );
}

export default SearchPageView;
