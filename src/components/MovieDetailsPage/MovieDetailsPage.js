import { useEffect, useState } from "react";
import { useParams, Route, useRouteMatch } from "react-router";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import * as fetchAPI from "../../services/fetchApi";
import { CastView } from "../../views/CastView/CastView";
import { ReviewsView } from "../../views/ReviewsView/ReviewsView";

import styles from "./MovieDetailsPage.module.css";

const poster = "https://image.tmdb.org/t/p/original";

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    fetchAPI.getMovieDetails(movieId).then((data) => setMovie(data));
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from);
  };

  return (
    <>
      {movie && (
        <div className={styles.cardContainer}>
          <button className={styles.goBackBtn} type="button" onClick={onGoBack}>
            Go back
          </button>
          <h2 className={styles.cardTitle}>{movie.title}</h2>
          <img
            src={`${poster}` + movie.poster_path}
            alt={movie.title}
            width="250"
          />
          <p className={styles.optionSection}>
            <span className={styles.optionLabel}>Rating:</span>
            <span className={styles.optionValue}>{movie.vote_average}</span>
          </p>
          <p className={styles.optionSection}>
            <span className={styles.optionLabel}>Genre: </span>
            {movie.genres.map((genre) => (
              <span key={genre.id} className={styles.genres}>
                {genre.name}
              </span>
            ))}
          </p>
          <p className={styles.optionSection}>
            <span className={styles.optionLabel}>Release:</span>
            <span className={styles.optionValue}>{movie.release_date}</span>
          </p>
          <span className={styles.about}>About</span>
          <p className={styles.descr}>{movie.overview}</p>
          <NavLink
            className={styles.routeLink}
            activeClassName={styles.activeLink}
            to={{
              pathname: `${url}/cast`,
              state: {
                from: location.state.from,
              },
            }}
          >
            Cast
          </NavLink>
          <NavLink
            className={styles.routeLink}
            activeClassName={styles.activeLink}
            exact
            to={{
              pathname: `${url}/reviews`,
              state: {
                from: location.state.from,
              },
            }}
          >
            Reviews
          </NavLink>
        </div>
      )}
      <Route path={`${path}/cast`}>
        <CastView />
      </Route>

      <Route exact path={`${path}/reviews`}>
        <ReviewsView />
      </Route>
    </>
  );
}

export default MovieDetailsPage;
