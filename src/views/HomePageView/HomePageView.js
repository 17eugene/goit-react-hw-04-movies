import { useState, useEffect } from "react";
import { MoviesList } from "../../components/MoviesList/MoviesList";
import { useRouteMatch } from "react-router";

import * as fetchAPI from "../../services/fetchApi";

function HomePageView() {
  const [topMovies, setTopMovies] = useState([]);
  const [error, setError] = useState(null);

  const { url } = useRouteMatch();

  useEffect(() => {
    fetchAPI
      .getDayTopMovies()
      .then((data) => setTopMovies(data.results))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  return <MoviesList pageTitle="TOP 20 today" movies={topMovies} path={url} />;
}

export default HomePageView;
