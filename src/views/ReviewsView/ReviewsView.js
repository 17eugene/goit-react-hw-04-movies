import { useState, useEffect } from "react";
import { useParams } from "react-router";

import * as fetchAPI from "../../services/fetchApi";
import smoothScroll from "../../utils/SmoothScroll/SmoothScroll";

import styles from "./ReviewsView.module.css";

function ReviewsView() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    fetchAPI
      .getMovieReview(movieId)
      .then((data) => setReviews(data.results))
      .then(() => smoothScroll());
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>No reviews yet</p>;
  }

  return (
    <div className={styles.reviewContainer}>
      {reviews &&
        reviews.map((review) => (
          <li className={styles.reviewList} key={review.id}>
            <span className={styles.reviewAuthor}>{review.author}</span>
            <p className={styles.reviewText}>{review.content}</p>
          </li>
        ))}
    </div>
  );
}

export { ReviewsView };
