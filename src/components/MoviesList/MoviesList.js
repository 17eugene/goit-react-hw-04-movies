import { Link, useLocation } from "react-router-dom";

import styles from "./MoviesList.module.css";

function MoviesList({ pageTitle, movies, path }) {
  const location = useLocation();

  return (
    <div>
      <h2 className={styles.title}>{pageTitle}</h2>
      <ul className={styles.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.item}>
            <Link
              className={styles.link}
              to={{
                pathname: `${path}${movie.id}`,
                state: {
                  from: location,
                  query: location.search,
                },
              }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { MoviesList };
