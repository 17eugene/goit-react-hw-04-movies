import { useState, useEffect } from "react";
import { useParams } from "react-router";
import shortid from "shortid";

import * as fetchAPI from "../../services/fetchApi";
import defaultIMG from "../../image/default.jpg";
import smoothScroll from "../../utils/SmoothScroll/SmoothScroll";

import styles from "./CastView.module.css";

const poster = "https://image.tmdb.org/t/p/original";

function CastView() {
  const [cast, setCast] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    fetchAPI
      .getCastMovieInfo(movieId)
      .then((data) => setCast(data.cast))
      .then(() => smoothScroll());
  }, [movieId]);

  return (
    <>
      {cast && (
        <div>
          <ul className={styles.castList}>
            {cast.map((actor) => (
              <div className={styles.itemWrapper} key={shortid.generate()}>
                {actor.profile_path ? (
                  <img
                    src={`${poster}` + actor.profile_path}
                    alt={actor.name}
                    width="135"
                  />
                ) : (
                  <img
                    className={styles.defaultImg}
                    src={defaultIMG}
                    alt="Not found"
                    width="135"
                  />
                )}

                <li className={styles.castName}>{actor.name}</li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export { CastView };
